<template>
  <div id="individual">
    <top-bar :padding="true" title="详细">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </top-bar>
    <div class="main">
      <cell title="头像" :isLink="true">
        <img :src="require(`../assets/images/index/${profile}`)" alt="profile">
      </cell>
      <cell
        v-for="(item, key, index) in info"
        :key="index"
        :title="keys[index]" 
        :isLink="true">
        {{ item }}
      </cell>
    </div>
   
  </div>
</template>

<script>
import myself from "../assets/js/myselft";
import TopBar from "../components/Common/top-bar";
import Cell from "../components/Common/Cell";
export default {
  components: { TopBar, Cell },
  data() {
    return {
      info: myself[1],
      profile:myself[0],
      keys: ["签名", "注册", "昵称", "性别", "生日", "电话", "邮箱","密码"],
    };
  },
};
</script>

<style lang="less">
#individual {
  min-height: 100vh;
  margin-top: 1.3rem;
  #top-bar {
    border-bottom: 1px solid #ccc;
  }
  .main {
    margin-top: 0.42rem;
  }
}
</style>