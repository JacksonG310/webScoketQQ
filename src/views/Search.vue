<template>
    <div id="search">
        <div class="top-bar">
               <!-- 加上form可在IOS键盘中显示搜索按钮 -->
            <!-- <form action="/"> -->
                <van-search
                  v-model="keyword"
                  show-action
                  placeholder="搜素用户/群"
                  @input="onSearch">
                  <template #action>
                      <div @click="onCancle">取消</div>
                  </template>
                </van-search>
            <!-- </form> -->
        </div>
        <div class="main">
            <div class="user-list" v-if="userResult.length > 0">
                <div class="title">用户</div>
                <div class="user-item">
                    <search-item 
                        @click.native="moreDetail(res.id,res.isFriend)"
                        v-for="res in userResult" 
                        :key="res.id" 
                        :res="res"></search-item>
                </div>
            </div>
            <div class="group-list">
                <div class="title"  v-if="groupResult.length > 0">群组</div>
                <div class="group-item">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { friendsArr } from '../assets/js/datas'
import {debounce} from "../assets/js/util/debounce"
import SearchItem from "../components/Search/Search-item"
export default {
    components:{SearchItem},
    data() {
        return {
            userID:"",
            friendsArr:friendsArr(),
            keyword:"",
            userResult:[],
            groupResult:[],
        }
    },
    created() {
        this.userID = this.$route.query.user;
    },
    methods: {
        // onSearch(){
        //     console.log(this.keyword);
        //     // if(this.keyword == '' || this.friendsArr.length == 0) {
        //     //     this.userResult = [];
        //     //     return;
        //     // };
        //     // this.friendsArr = friendsArr();
        //     // let replaceReg = eval(`/${this.keyword}/g`);
        //     // let replaceString = `<span style='color:#54AFFF;'>${this.keyword}</span>`;
        //     //  //从好友表中匹配结果
        //     // this.userResult = this.friendsArr.filter((friend)=>{
        //     //      friend.isFriend = this.judgeFriend(friend);
        //     //      if(friend.name.search(this.keyword) != -1) friend.name = friend.name.replace(replaceReg, replaceString);
        //     //      return friend.name.search(this.keyword) != -1;
        //     // })
        // },
        // 输入防抖
        onSearch:debounce(async function(){
            if(this.keyword == '' || this.friendsArr.length == 0) {
                this.userResult = [];
                return;
            };
            // this.friendsArr = friendsArr();
            //获取搜索结果
            const {data : res} = await this.$http.get(`search/user?keyword=${this.keyword}`);
            if(res.code === 20000){
                this.userResult = res.data;
                let replaceReg = eval(`/${this.keyword}/g`);
                let replaceString = `<span style='color:#54AFFF;'>${this.keyword}</span>`;
                 //从好友表中匹配结果
                this.userResult.forEach((res)=>{
                this.judgeFriend(res)
                if(res.name.search(this.keyword) != -1) res.name = res.name.replace(replaceReg, replaceString);
                if(res.email.search(this.keyword) != -1) res.email = res.email.replace(replaceReg, replaceString);
            })
            }else{
                Toast.fail('查找出现错误,请稍后再试~~')
            }
        },500),
        async judgeFriend(result){
            const {data:res} = await this.$http.get(`/search/isFriend?uid=${this.userID}&fid=${result.id}`);
            if(res.code != 50000){
                this.$set(result,"isFriend",res.data);
            }
            console.log(res);
        },
        moreDetail(id,isFriend){
          this.$router.push({path:"/friendDetail",query:{friendID:id,isFriend:isFriend ? 1 : 0}});  
        },
        onCancle(){
            Toast.fail('取消搜素')
            this.$router.back();
        },
    },
}
</script>

<style scoped lang="less">
    #search{
        min-height: 100vh;
        .main{
            padding:0 @less-spacing-row-16;
            .user-list,.group-list{
                .title{
                    font-size: @less-text-size-22;
                    font-weight: 600;
                    color: #272832;
                }
            }
        }
    }
</style>