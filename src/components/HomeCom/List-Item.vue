<template>
    <div id="list-item">
        <van-swipe-cell>
            <!-- <van-card class="chart-card"> -->
            <div class="item-left">
                <van-badge :content="100" max="99">
                    <img class="profile" :src="require(`../../assets/images/list-item/${item.imgurl}`)" alt="">
                </van-badge>
            </div>
            <!-- </van-card> -->
            <template #right>
                <van-button square type="danger" text="删除" />
            </template>

        </van-swipe-cell>
        <!-- <van-swipe-cell>
            <van-card class="chart-card">
                <div class="item-left">
                    <van-badge :content="100" max="99">
                        <img class="profile" :src="require(`../../assets/images/list-item/${item.imgurl}`)" alt="">
                    </van-badge>
                </div>
                <van-cell :border="false" :title="item.name" :value="item.time" />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-card>
        </van-swipe-cell> -->


        <!-- <div class="item-left"> -->

        <!-- <van-badge :content="100" max="99">
                    <img class="profile" :src="require(`../../assets/images/list-item/${item.imgurl}`)" alt="">
                </van-badge>
            </div>
            <van-cell :border="false" :title="item.name" :value="item.time" />

            <template #right>
                <van-button square type="danger" text="删除" />
            </template>
            <div class="info">
                {{ item.news }}
            </div> -->

        <!-- <span class="name">{{ item.name }}</span>
                <span class="time">{{ formatTime(item.time) }}</span> -->

    </div>
</template>

<script>
import timeFormater from "../../assets/js/time-format"
export default {
    props: ["item"],
    methods: {
        formatTime(date) {
            return timeFormater(date);
        }
    },
}
</script>

<style lang="less" scoped>
#list-item {
    width: 23.44rem;
    height: 4rem;
    padding: 0 1rem;
    background: #FFF;

    &:active {
        background-color: @less-background-color-grey;
    }

    // .chart-card {
    //     width: 100%;
    //     margin: 0;
    //     background-color: #fff;
    // }

    .delete-button {
        height: 100%;
    }

    .item-left {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        // background-color: yellow;

        .profile {
            width: 100%;
            border-radius: 0.75rem;
        }
    }

    .item-right {
        flex: 1;
        padding-left: 1rem;
        font-family: PingFangSC-Regular;

        .title {
            height: 1.56rem;

            .name {
                float: left;
                width: 8rem;
                height: 1.56rem;
                font-size: 1.13rem;
                color: #272832;
                letter-spacing: -0.62px;
                font-weight: 400;
            }

            .time {
                float: right;
                height: 1.06rem;
                font-size: 0.75rem;
                color: rgba(39, 40, 50, 0.40);
                letter-spacing: -0.41px;
                font-weight: 400;
            }
        }

        .info {
            width: 16.94rem;
            height: 1.25rem;
            font-family: PingFangSC-Regular;
            font-size: 0.88rem;
            color: rgba(39, 40, 50, 0.60);
            letter-spacing: -0.48px;
            font-weight: 400;
        }

    }

    .name,
    .info,
    .tip {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>