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
        @reachBottom="handleReachBottom"
        @reachTop="handleReachTop"
        :dataID="dataID"
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
      //聊天气泡的id
      dataID: "",
      // submit组件的高度
      submitHeight: 0,
      // 单个文件上传的最大大小
      singleSize: 5 * 1024 * 1024,
      // 每个分片大小
      chunkSize: 2 * 1024 * 1024,
      chunkList: [],
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
    async getMesaage() {
      const { data: res } = await this.$http.get(
        `/chat/getChatMessage?uid=${this.uid}&fid=${this.fid}`
      );
      if (res.code === 20000) {
        this.messageList = res.messages;
        this.$nextTick(() => {
          this.dataID =
            this.messageList[this.messageList.length - 1].id.toString();
        });
        res.messages.forEach((m) => {
          if (m.types == 1) {
            this.images.push(m.message);
          }
        });
      } else {
        Toast.fail("获取聊天记录失败");
      }
    },

    handleSend(typing) {
      const msg = {
        id: new Date().toString(),
        sendID: this.uid,
        receiveID: this.fid,
        types: 0,
        message: typing,
        createdAt: new Date(),
      };
      this.messageList.push(msg);
      this.sendMessage(msg);
      this.dataID = msg.id;
    },
    // 聊天窗到底
    handleReachBottom() {
      console.log("到底了");
    },
    // 聊天窗到顶
    handleReachTop() {
      console.log("到顶了");
    },
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
        { headers: { "Content-Type": "mutipart/form-data" } }
      );
      if (res.code === 20000) {
        const msg = {
          id: new Date().toString(),
          sendID: this.uid,
          receiveID: this.fid,
          types: type,
          message: res.dbPath,
          createdAt: new Date(),
        };
        this.sendMessage(msg);
        this.images.push(res.dbPath);
        this.messageList.push(msg);
        this.dataID = msg.id;
      }
    },
    // 大文件分片上传
    async bigFileUpload(file, type) {
      const result = await getHash(file);
      const { hash } = result;
      this.getChunk(file, hash);
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
    uploadChunk(){
      
    },
    handleReceive(msg) {
      this.messageList.push(msg);
    },
    sendMessage(msg) {
      this.$socket.emit("sendMessage", msg);
    },
    receiveMessage(msg) {
      this.$socket.on("receiveMessage", (msg) => {
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
    this.getMesaage();
    this.receiveMessage();
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
