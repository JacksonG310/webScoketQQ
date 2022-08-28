<template>
  <div id="apply">
    <top-bar :padding="true" title="好友请求">
      <template slot="left">
        <van-icon name="arrow-left" size=".48remm" @click="$router.back()" />
      </template>
    </top-bar>
    <div class="main">
      <apply-card
        v-for="(data, index) in applyData"
        :key="index"
        :data="data"
        @handleRefuse="handleRefuse"
        @handleAgree="handleAgree"
      >
      </apply-card>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/Common/top-bar";
import ApplyCard from "../components/Apply/ApplyCard";
import { Toast } from "vant";
export default {
  components: { TopBar, ApplyCard },
  data() {
    return {
      userID: "",
      applyData: [],
    };
  },
  methods: {
    // 获取好友申请数据
    async getApplyData() {
      const { data: res } = await this.$http.get(
        `/apply/getApplyData?uid=${this.userID}`
      );
      if (res.code !== 20000) {
        Toast.fail("获取好友申请数据失败");
      } else {
        this.applyData = res.applyData;
      }
    },
    async handleAgree(id) {
      let data = {
        uid: this.userID,
        fid: id,
        state: 2,
      };
      const { data: res } = await this.$http.post(
        `/apply/updateFriendState`,
        data
      );
      if (res.code === 20000) {
        Toast.success("已同意该好友申请");
        this.getApplyData();
        this.setApplyNum(res.count);
      } else {
        Toast.fail("操作失败");
      }
    },

    // 处理拒绝请求
    async handleRefuse(id) {
      let data = {
        uid: this.userID,
        fid: id,
      };
      const { data: res } = await this.$http.post(
        `/apply/refuseOrDelete`,
        data
      );
      if (res.code === 20000) {
        Toast.success("已拒绝该好友申请");
        this.getApplyData();
      } else {
        Toast.fail("操作失败");
      }
    },
    // ...mapActions({setApplyNum:"setApplyNum"})
  },
  computed: {},
  created() {
    this.userID = this.$route.query.user;
    this.getApplyData();
  },
};
</script>

<style scoped lang="less">
.main {
  padding: 0 0.32rem;
  padding-top: 1.76rem;
  height: 100vh;
}
</style>
