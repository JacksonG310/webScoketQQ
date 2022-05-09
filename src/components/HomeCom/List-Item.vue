<template>
    <van-swipe-cell id="list-item">
        <van-row>
            <van-col :span="4">
                <div class="item-left">
                    <van-badge :content="100" max="99">
                        <img class="profile" :src="require(`../../assets/images/list-item/${item.imgurl}`)" alt="">
                    </van-badge>
                </div>
            </van-col>
            <van-col :span="20">
                <div class="item-right">
                    <div class="title"><span class="name">{{ item.name }}</span>
                        <span class="time">{{ formatTime(item.time) }}</span>
                    </div>
                    <div class="info">
                        {{ item.news }}
                    </div>
                </div>

            </van-col>
        </van-row>
        <template #right>
            <van-button square type="danger" text="删除" />
        </template>
    </van-swipe-cell>


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
    background: #FFF;
    padding-top: .5rem;

    &:active {
        background-color: @less-background-color-grey;
    }

    .van-row {
        width: 100%
    }

    .item-left {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;

        .profile {
            width: 100%;
            border-radius: 0.75rem;
        }
    }

    .item-right {
        flex: 1;

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
            font-size: 0.88rem;
            color: rgba(39, 40, 50, 0.60);
            letter-spacing: -0.48px;
            font-weight: 400;
        }


    }

    .name,
    .info {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>