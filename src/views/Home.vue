<template>
  <div id="home">
    <div class="top-bar">
      <div class="top-bar-left">
        <img class="profile" src="..\assets\images\index\profile-03.jpeg" alt="">
      </div>
      <div class="top-bar-center">
        <img class="logo" src="..\assets\images\index\QQ.png" alt="">
      </div>
      <div class="top-bar-right">
        <van-icon name="search" class="search" size="1.5rem" />
        <van-icon name="add-o" size="1.5rem" />
      </div>
    </div>
    <div class="main">

      <!-- <list-item></list-item> -->
      <div class="apply">
        <!-- <list-item></list-item> -->
      </div>
      <div class="friendList">
        <list-item v-for="friend in friends" :key="friend.id" :item="friend"></list-item>
      </div>
    </div>
    <div class="footer">
      <van-icon name="chat-o" badge="99+" />
      <van-icon name="friends-o" />
      <van-icon name="https://cdn.jsdelivr.net/npm/@vant/assets/icon-demo.png" />
    </div>
  </div>
</template>

<script>
import ListItem from "../components/HomeCom/List-Item.vue"
import friendsArr from "../assets/js/datas"

export default {
  name: 'Home',
  components: { ListItem },
  data() {
    return {
      friends: friendsArr,
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
#home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;

  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.75rem;
    background: @less-background-color;
    border-bottom: 1px solid @less-border-color;
    text-align: center;

    .top-bar-left {
      width: 4.5rem;
      height: 2.13rem;
      padding-left: @less-spacing-row-sm;
      text-align: left;

      .profile {
        height: 100%;
        border-radius: 0.5rem;

      }
    }

    .top-bar-center {
      width: 2.75rem;
      height: 100%;
      flex: 1;

      .logo {
        height: 100%;

      }
    }

    .top-bar-right {
      padding-right: @less-spacing-row-sm;

      .search {
        padding-right: @less-spacing-row-sm;
      }
    }

  }
}

.main {
  flex: 1;
  padding-top: 3.75rem;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2.75rem;
  border-top: 1px solid #ccc;

  .van-icon {
    font-size: 1.5rem;
  }
}
</style>