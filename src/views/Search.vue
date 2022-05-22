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
                        v-for="res in userResult" 
                        :key="res.id"
                        :name="res.name" 
                        type="user" 
                        :isFriend="res.isFriend">
                        <img :src="require(`../assets/images/list-item/${res.imgurl}`)" alt="profile">
                        </search-item>
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
import { friendsArr,isFriend } from '../assets/js/datas'
import SearchItem from "../components/Search/Search-item"
export default {
    components:{SearchItem},
    data() {
        return {
            friendsArr:friendsArr(),
            keyword:"",
            userResult:[],
            groupResult:[],
        }
    },
    methods: {
        onSearch(){
            
            if(this.keyword == '' || this.friendsArr.length == 0) {
                this.userResult = [];
                return;
            };
            this.friendsArr = friendsArr();
            let replaceReg = eval(`/${this.keyword}/g`);
            let replaceString = `<span style='color:#54AFFF;'>${this.keyword}</span>`;
            //从好友表中匹配结果
           this.userResult = this.friendsArr.filter((friend)=>{
                friend.isFriend = this.judgeFriend(friend);
                if(friend.name.search(this.keyword) != -1) friend.name = friend.name.replace(replaceReg, replaceString);
                return friend.name.search(this.keyword) != -1;
            })
        },
        judgeFriend(user){
            const friendTable = isFriend();
            let flag = false;
            friendTable.forEach(item => {
                if(user.id == item.friendID) flag = true;
            });
            return flag;
        },
        onCancle(){
            Toast.fail('取消搜素')
            this.$router.back();
        }
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