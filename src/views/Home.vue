<template>
  <div id="home">
    <top-bar :padding="true" title="信科QQ">
      <template slot="left">
        <img class="profile" :src="require(`../assets/images/list-item/${userProfile}`)" alt="profile">
      </template>
      <template slot="right">
        <van-icon name="search" @click="toSearch" size="0.52rem"/>
        <van-icon name="add-o" size="0.52rem"/>
      </template>
    </top-bar>
    <div class="main">
      <div class="apply-list">
      </div>
      <div class="friendList">
        <list-item v-for="item in friends" :key="item.id" :item="item"></list-item>
      </div>
      <div class="footer">
        <van-icon name="chat-o" badge="99+" size="0.52rem"/>
        <van-icon name="friends-o" size="0.52rem"/>
        <van-icon name="manager-o" size="0.52rem"/>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "../components/HomeCom/List-Item.vue"
import  { friendsArr }  from "../assets/js/datas"
import TopBar from "../components/Common/top-bar"

export default {
  name: 'Home',
  components: { ListItem,TopBar },
  data() {
    return {
      friends: friendsArr(),
      userID:"",
      userProfile:""
    }
  },
  created() {
    this.userID = this.$route.query.user;
    this.userProfile =  window.sessionStorage.getItem(`profile-${this.userID}`);
  },
  methods: {
    toSearch(){
      this.$router.push('/search')
    }
  },
}
</script>

<style lang="less" scoped>
#home {
  padding-top:0.3rem  /* 15/50 */;
  width: 100%;
  min-height: 100vh;
  #top-bar{
    border-bottom: 1px solid #ccc;
    .profile{
      width: 0.68rem  /* 34/50 */;
      height: 0.68rem  /* 34/50 */;
      border-radius: 0.16rem  /* 8/50 */;
    }
    .van-icon-search{
      margin-right: @less-spacing-row-20;
    }
  }
  .main {
    flex: 1;
    padding-top: @less-spacing-col-44;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.88rem  /* 44/50 */;
    border-top: 1px solid #ccc;
    background-color: #ffffff;
  }
}
</style>