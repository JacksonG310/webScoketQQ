<template>
  <div id="individual">
    <top-bar :padding="true" title="详细">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </top-bar>
    <div class="main">
      <cell title="头像" :isLink="true">
        <img :src="require(`../assets/images/list-item/${info.profile}`)" alt="profile">
      </cell>
      <cell
        v-for="(item, key, index) in keys"
        :key="index"
        :title="key" 
        :isLink="true">
        {{ info[item] }}
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
      info:{},
      profile:myself[0],
      keys: {
        "签名":"explain",
        "注册":"createdAt", 
        "昵称":"name", 
        "性别":"sex",
        "生日":"birth",
        "邮箱":"email",
        "密码":"password",
      },
      // keys:["签名","注册","昵称","性别","生日","邮箱","密码"]
    };
  },
  async created(){
    const id = this.$route.query.id;
    const {data:res} = await this.$http.get(`/userDetail?id=${id}`);
      if(res.code == 20000){
          this.info = res.data;
      }else{
          Toast.fail("获取用户信息失败");
      }
     
  }
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