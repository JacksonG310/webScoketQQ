<template>
  <div id="individual">
    <top-bar :padding="true" title="详细">
      <template slot="left">
        <van-icon name="arrow-left" />
      </template>
    </top-bar>
    <div class="main">
      <cell title="头像" :isLink="info.id == curUser" @click.native="toReset(info.profile)">
        <img :src="require(`../assets/images/list-item/${info.profile}`)"  alt="profile">
      </cell>
      <cell
        v-for="(item, key, index) in keys"
        :key="index"
        :title="key"
        @click.native="editItem(item.name,info[item.name],item.configurable)"
        :isLink="item.configurable && info.id == curUser">
        {{ info[item.name] }}
      </cell>
    <div class="signOut" v-if="info.id == curUser">退出登录</div>
    </div>
        <el-drawer
          :visible.sync="pickerDrawer"
          size="50%"
          :with-header="false"
          direction="btt">
            <van-picker
            class="pick"
            title="标题"
            show-toolbar
            @cancel="handleCancel"
            @confirm="handleConfirm"
            :columns="pickerData"/>
        </el-drawer>
        <el-drawer
          class="textDrawer"
          :visible.sync="textDrawer"
          size="60%"
          :with-header="false"
          direction="btt">
          <van-field
            v-model="sign"
            rows="2"
            autosize
            label="个性签名"
            type="textarea"
            maxlength="15"
            placeholder="请输入个性签名"
            show-word-limit
          />
          <van-button type="info" @click.native="updateSign"  block>
            确认修改
          </van-button>
        </el-drawer>
  </div>
</template>

<script>
import TopBar from "../components/Common/top-bar";
import Cell from "../components/Common/Cell";
import {birth} from "../assets/js/datas"
import { Toast } from "vant";
export default {
  components: { TopBar, Cell },
  data() {
    return {
      // id
      id:"",
      // 当前页面用户的信息
      info:{},
      // 当前登录的用户
      curUser:"",
      // 控制选择器的显示与隐藏
      pickerDrawer:false,
      // 控制个性签名输入框显示与隐藏
      textDrawer:false,
      // 性别选项
      sex:['男','女','未知'],
      // 生日选项
      birth:[],
      // 个性签名
      sign:"",
      // 选择器内渲染的数据
      pickerData:[],
      // 选择器的类型
      pinkerType:"",
      // 展示项信息
      keys: {
        "签名":{
          name:"explain",
          configurable:true,
        },
        "注册":{
          name:"createdAt",
          configurable:false,
        }, 
        "昵称":{
          name:"name",
          configurable:false,
        }, 
        "性别":{
          name:"sex",
          configurable:true
        },
        "生日":{
          name:"birth",
          configurable:true
        },
        "邮箱":{
          name:"email",
          configurable:false
        },
      },
      // keys:["签名","注册","昵称","性别","生日","邮箱","密码"],
    };
  },
  methods: {
    // 取消修改
    handleCancel(){
      this.pickerDrawer = false;
      Toast.fail("取消修改");
    },
    // 唤醒抽屉
    editItem(type,originalValue,configurable){
      if(this.info.id != this.curUser) return;
      if(!configurable) return;
      if(type == 'sex'){
        this.pickerDrawer = true;
        this.pickerData = this.sex;
        this.type = type;
      }else if(type == 'birth'){
        this.pickerDrawer = true;
        this.pickerData = this.birth;
        this.type = type;
      }else if(type == 'explain'){
        this.textDrawer = true;
        this.sign = originalValue;
      }
    },
    async handleConfirm(newValue,index){
      // 修改性别和生日
      if(this.type == 'sex'){
        if(newValue === this.info.sex) {
           this.pickerDrawer = false;
           return;
        };
        const {data:res} = await this.$http.put("/individual/updateSex",{sex:newValue,id:this.curUser});
        if(res.code === 20000){
          Toast.success("修改成功");
          this.getUserDetail();
          this.pickerDrawer = false;
        }else{
          Toast.fail("修改失败，请重试");
        }
      }else{
        const newBirth = `${index[0]+1}-${index[1]+1}`;
         const {data:res} = await this.$http.put("/individual/updateBirth",{birth:newBirth,id:this.curUser});
          if(res.code === 20000){
            Toast.success("修改成功");
            this.getUserDetail();
            this.pickerDrawer = false;
          }else{
            Toast.fail("修改失败，请重试");
          }
      }
    },
    // 更新签名
    async updateSign(){
      if(this.sign.trim() === this.info.explain) return;
      const {data:res} = await this.$http.put("/individual/updateSign",{sign:this.sign,id:this.curUser});
      if(res.code === 20000){
        Toast.success("修改成功");
        this.getUserDetail();
        this.textDrawer = false;
      }else{
        Toast.fail("修改失败，请重试")
      }
    },
    // 获取当前用户信息
    async getUserDetail(){
      const {data:res} = await this.$http.get(`/userDetail?id=${this.id}`);
        if(res.code == 20000){
            this.info = res.data;
        }else{
            Toast.fail("获取用户信息失败");
        }
    },
    //跳转重置页
    toReset(profile){
      this.$router.push({path:"/reset",query:{profile}})
    }
  },
  async created(){
    this.birth = birth();
    this.id = this.$route.query.id;
    this.curUser = localStorage.getItem("curUserID");
    this.getUserDetail();
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
    .signOut{
      margin-top: .4rem;
      height: .88rem;
      background-color: @less-color-error;
      margin: 0 @less-spacing-row-16;
      font-size: @less-text-size-20;
      color:#fff;
      text-align: center;
      line-height: .88rem;
    }
  }

}
</style>