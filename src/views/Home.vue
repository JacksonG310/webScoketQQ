<template>
  <div id="home">
    <top-bar :padding="true" title="信科QQ">
      <template slot="left">
        <img class="profile" :src="userProfile" alt="profile" />
      </template>
      <template slot="right">
        <van-icon name="search" @click="toSearch" size="0.52rem" />
        <!-- <van-icon name="add-o" size="0.52rem" /> -->
      </template>
    </top-bar>

    <div class="main">
      <van-pull-refresh
        class="refresh"
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="apply-list">
          <apply-item @click.native="toCheckApply"></apply-item>
        </div>
        <div class="friendList">
          <list-item
            v-for="item in friendList"
            :key="item.friendID"
            :item="item"
            @click.native="toChat(item.FriendID)"
          ></list-item>
        </div>
      </van-pull-refresh>
      <div class="footer">
        <van-icon name="chat-o" badge="99+" size="0.52rem" />
        <van-icon name="friends-o" size="0.52rem" />
        <van-icon
          name="manager-o"
          size="0.52rem"
          @click.native="toIndividual"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "../components/HomeCom/List-Item.vue";
import ApplyItem from "../components/HomeCom/Apply-item.vue";
import TopBar from "../components/Common/top-bar";
import { Toast } from "vant";

export default {
  name: "Home",
  components: { ListItem, TopBar, ApplyItem },
  data() {
    return {
      // friendList: friendsArr(),
      friendList: [],
      userID: "",
      userProfile: "",
      // 好友申请数
      applyNum: 0,
      count: 0,
      isLoading: true,
    };
  },
  methods: {
    // 获取好友列表
    async getFriendList() {
      const { data: res } = await this.$http.get(
        `home/getFriendList?uid=${this.userID}`
      );
      if (res.code === 20000) {
        this.friendList = res.friendList;
      } else {
        Toast.fail("获取好友列表失败");
      }
    },
    // 获取用户的最新信息与未读消息数

    // 注册socket
    joinSocket(uid) {
      this.$socket.emit("login", uid);
    },
    socketTest() {
      this.$socket.on("msg", (id) => {
        console.log("收到消息", id);
      });
    },
    // 刷新
    onRefresh() {
      this.isLoading = false;
      this.getFriendList();
    },
    onReceive() {
      this.$socket.on("receiveMessage", function () {});
    },
    toSearch() {
      this.$router.push({ path: "search", query: { user: this.userID } });
    },
    toCheckApply() {
      this.$router.push({ path: "apply", query: { user: this.userID } });
    },
    toIndividual() {
      this.$router.push({ path: "individual", query: { id: this.userID } });
    },
    toChat(fid) {
      this.$router.push({
        path: "chat",
        query: { uid: this.userID, fid: fid },
      });
    },
  },
  created() {
    this.userID = this.$route.query.user;
    this.userProfile = window.localStorage.getItem(`profile-${this.userID}`);
    this.getFriendList();
    this.joinSocket(this.userID);
    this.socketTest();
  },
};
</script>

<style lang="less" scoped>
#home {
  padding-top: 0.3rem /* 15/50 */;
  width: 100%;
  min-height: 100vh;

  #top-bar {
    border-bottom: 1px solid #ccc;

    .profile {
      width: 0.68rem /* 34/50 */;
      height: 0.68rem /* 34/50 */;
      border-radius: 0.16rem /* 8/50 */;
    }

    .van-icon-search {
      margin-right: @less-spacing-row-20;
    }
  }

  .main {
    flex: 1;
    padding-top: @less-spacing-col-44;
    .refresh {
      padding-top: 0.2rem;
      height: 100vh;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.88rem /* 44/50 */;
    border-top: 1px solid #ccc;
    background-color: #ffffff;
  }
}
</style>
