<template>
  <div id="chat">
    <top-bar :padding="true" :title="receiverInfo.name">
      <template slot="left">
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
      <template slot="right">
        <img
          class="friend-profile"
          :src="receiverInfo.profile"
          alt="friend-profile"
          @click="$router.push(`/individual?id=${fid}`)"
        />
      </template>
    </top-bar>
    <div class="main">
      <scroll-view
        top="46px"
        :bottom="submitHeight + 'px'"
        @reachTop="handleReachTop"
        :summitHeight="submitHeight"
      >
        <Dialog
          v-for="msg in messageList"
          :key="msg.id"
          :direction="msg.sendID == uid ? 'right' : 'left'"
          :profile="
            msg.sendID == uid ? senderInfo.profile : receiverInfo.profile
          "
          :data-id="msg.id"
          :msg="msg"
          @showImg="showImg"
        >
          <template slot="profile">
            <img
              :src="require(`../assets/images/list-item/profile-01.jpeg`)"
              alt=""
            />
          </template>
        </Dialog>
      </scroll-view>
    </div>
    <Submit
      @getSubmitHeight="getSubmitHeight"
      @handleSend="handleSend"
      @handleSendFile="handleSendFile"
    ></Submit>
  </div>
</template>

<script>
import TopBar from "../components/Common/top-bar";
import Dialog from "../components/Chat/Dialog-balloon.vue";
import Submit from "../components/Chat/Submit.vue";
import ScrollView from "../components/Chat/Scroll-view.vue";
import { getHash } from "../assets/js/util/getHash";
import { Toast, ImagePreview } from "vant";
export default {
  components: {
    TopBar,
    Dialog,
    Submit,
    ScrollView,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      //页号
      pageIndex: 1,
      // 消息列表
      messageList: [],
      // 发送者信息
      senderInfo: "",
      // 接收者信息
      receiverInfo: "",
      // 好友ID
      fid: "",
      // 用户ID
      uid: "",
      // 图片消息
      images: [],
      // submit组件的高度
      submitHeight: 0,
      // 单个文件上传的最大大小
      singleSize: 5 * 1024 * 1024,
      // 每个分片大小
      chunkSize: 2 * 1024 * 1024,
      // 分片列表
      chunkList: [],
      // 文件上传进度
      precent: "",
    };
  },
  methods: {
    //   获取双方信息
    async getBothSizeInfo() {
      const { data: res } = await this.$http.get(
        `/chat/getBothInfo?uid=${this.uid}&fid=${this.fid}`
      );
      if (res.code === 20000) {
        const { senderInfo, receiverInfo } = res;
        this.senderInfo = senderInfo;
        this.receiverInfo = receiverInfo;
        this.$nextTick(() => {});
      } else {
        Toast.fail("获取用户信息失败");
      }
    },
    // 获取聊天记录
    async getMesaage(pageIndex) {
      const { data: res } = await this.$http.get(
        `/chat/getChatMessage?uid=${this.uid}&fid=${this.fid}&pageIndex=${pageIndex}`
      );

      if (res.code === 20000) {
        if (!res.messages.length > 0) {
          Toast.fail("暂无更多聊天记录");
          return;
        }
        this.messageList = res.messages.reverse().concat(this.messageList);
        res.messages.forEach((m) => {
          if (m.types == 1) {
            this.images.push(m.message);
          }
        });
      } else {
        Toast.fail("获取聊天记录失败");
      }
    },
    async changeStatus() {
      await this.$http.put("chat/changeStatus", {
        uid: this.uid,
        fid: this.fid,
      });
    },
    // 处理前台发送
    handleSend(typing) {
      const msg = {
        id: new Date().toString(),
        sendID: this.uid,
        receiveID: this.fid,
        types: 0,
        status: 0,
        message: typing,
        createdAt: +new Date(),
      };
      this.messageList.push(msg);
      this.sendMessage(msg);
    },

    // 聊天窗到顶
    handleReachTop() {
      this.getMesaage(++this.pageIndex);
    },
    // 向服务器上传文件
    handleSendFile(fileInfo) {
      const { file, type } = fileInfo;
      if (file.size > this.singleSize) {
        this.bigFileUpload(file, type);
      } else {
        this.singleUpload(file, type);
      }
    },
    // 直接上传
    async singleUpload(file, type) {
      const result = await getHash(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", result.filename);

      const { data: res } = await this.$http.post(
        "/chat/uploadFile",
        formData,
        {
          headers: { "Content-Type": "mutipart/form-data" },
          onUploadProgress(e) {
            let { loaded, total } = e;
            let precent = ((loaded / total) * 100).toFixed(2);
            Toast.loading({
              forbidClick: true,
              message: `文件上传中\n${precent}%`,
            });
          },
        }
      );
      if (res.code === 20000) {
        const msg = {
          id: new Date().toString(),
          sendID: this.uid,
          receiveID: this.fid,
          status: 0,
          types: type,
          message: res.dbPath,
          createdAt: new Date(),
        };
        Toast.success("文件发送成功");
        this.sendMessage(msg);
        this.images.push(res.dbPath);
        this.messageList.push(msg);
      }
    },
    // 大文件分片上传
    async bigFileUpload(file, type) {
      const result = await getHash(file);
      const { hash } = result;
      this.getChunk(file, hash);
      const chunkPromise = this.uploadChunk();
      this.mergeChunk(chunkPromise, hash, type);
    },

    // 切分文件
    getChunk(file, hash) {
      const count = Math.ceil(file.size / this.chunkSize);
      const surfix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
      for (let i = 0; i < count; i++) {
        const start = i * this.chunkSize;
        const end = (i + 1) * this.chunkSize;
        const chunk = file.slice(start, end);
        this.chunkList.push({
          file: chunk,
          filename: `${hash}_${i}.${surfix}`,
        });
      }
    },
    // 上传切片
    uploadChunk() {
      return this.chunkList.map((chunk) => {
        const formData = new FormData();
        formData.append("file", chunk.file);
        formData.append("filename", chunk.filename);
        return this.$http.post("/chat/uploadChunk", formData, {
          headers: { "Content-Type": "mutipart/form-data" },
        });
      });
    },
    // 合并切片
    mergeChunk(chunkPromise, hash, type) {
      Promise.all(chunkPromise).then(() => {
        this.$http
          .post("/chat/mergeChunk", {
            HASH: hash,
            count: Math.ceil(file.size / this.chunkSize),
          })
          .then((res) => {
            if (res.data.code === 20000) {
              const msg = {
                id: new Date().toString(),
                sendID: this.uid,
                receiveID: this.fid,
                types: type,
                message: res.data.dbPath,
                createdAt: new Date(),
              };
              Toast.success("文件发送成功");
              this.sendMessage(msg);
              this.messageList.push(msg);
            }
          });
      });
    },
    handleReceive(msg) {
      this.messageList.push(msg);
    },
    sendMessage(msg) {
      this.$socket.emit("sendMessage", msg);
    },
    isInRoom(uid) {
      this.$socket.emit("isInRoom", uid);
      this.notInRoom(uid);
    },
    notInRoom(uid) {
      this.$socket.on("notInRoom", (res) => {
        const { isInRoom, uid } = res;
        if (!isInRoom) {
          this.joinRoom(uid);
        }
      });
    },
    joinRoom(uid) {
      this.$socket.emit("join", uid);
    },

    receiveMessage() {
      this.$socket.on("receiveMessage", (msg) => {
        console.log(msg);
        this.handleReceive(msg);
      });
    },
    // 图片预览组件
    showImg(msg) {
      let curIndex = this.images.findIndex((item) => {
        return item == msg;
      });
      ImagePreview({
        images: this.images,
        closeable: true,
        showIndex: true,
        startPosition: curIndex,
        loop: false,
      });
    },
    // 获取submit组件的高度
    getSubmitHeight(height) {
      if (height >= 50) {
        this.submitHeight = height.toString();
      } else {
        this.submitHeight = "50";
      }
    },
  },
  created() {
    const { uid, fid } = this.$route.query;
    this.uid = uid;
    this.fid = fid;
    this.getBothSizeInfo();
    this.getMesaage(this.pageIndex);
    this.changeStatus();
    this.receiveMessage();
    this.isInRoom(this.uid);
  },
};
</script>

<style lang="less">
#chat {
  min-height: 100%;
  background-color: #f4f4f4;
  padding-bottom: 1.2rem;
  #top-bar {
    background-color: #f4f4f4 !important;
    border-bottom: 1px solid #ccc;
  }
  .main {
    position: relative;
    height: auto;
    min-height: 100vh;
    padding-top: 0.88rem;
    padding-bottom: 0.88rem;
  }
  .footer {
    width: 100%;
    min-height: 0.92rem;
  }
}
</style>
