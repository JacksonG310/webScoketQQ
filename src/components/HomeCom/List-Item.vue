<template>
    <div id="list-item">
      <div class="cell-left">
        <van-badge :content="100" max="99">
          <img class="friend-profile" :src="require('../../assets/images/list-item/' + item.imgurl)" alt="friend-profile">
        </van-badge>
      </div>
      <div class="cell-right">
          <div class="top">
            <span class="friend-name">{{item.name}}</span>
            <span class="last-time">{{formatTime}}</span>
          </div>
        <div class="bottom">
          <p class="last-news">{{item.news}}</p>
        </div>
      </div>
    </div>
</template>

<script>
import timeFormater from "../../assets/js/time-format"
export default {
  props: ["item"],
  mounted() {
  },
  methods: {

  },
  computed:{
    formatTime(){
      return timeFormater(this.item.time);
    }
  },
}
</script>

<style lang="less" scoped>
#list-item {
  height: 1.36rem  /* 68/50 */;
  display: flex;
  align-items: center;
  justify-content: center;
  .cell-left{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem  /* 80/50 */;
    height: 100%;
    .friend-profile{
        width: 0.96rem  /* 48/50 */;
        height: 0.96rem  /* 48/50 */;
        border-radius: 0.24rem  /* 12/50 */;
    }
  }
  .cell-right{
    width: 5.9rem  /* 295/50 */;
    height: 100%;
    padding-right: 0.32rem  /* 16/50 */;
    .top{
      .friend-name{
        float: left;
        width: 4rem  /* 200/50 */;
        font-size: @less-text-size-18;
      }
      .last-time{
        float: right;
        font-size: @less-text-size-12;
      }
      &::before,&::after{
        content: '';
        display: block;
        clear: both;
      }
    }

    .bottom{
      margin-top: 0.1rem  /* 5/50 */;
      .last-news{
        vertical-align: top;

        font-size: @less-text-size-14;
      }
    }

    .friend-name,.last-news{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>