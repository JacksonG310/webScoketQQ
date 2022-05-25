<template>
    <div id="apply">
        <top-bar :padding="true" title="好友请求">
            <template slot="left">
                <van-icon name="arrow-left" size=".48remm"/>
            </template>
        </top-bar>
        <div class="main">
            <apply-card></apply-card>
            <apply-card></apply-card>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/Common/top-bar"
import ApplyCard from "../components/Apply/ApplyCard"
export default {
    components:{TopBar,ApplyCard},
}
</script>

<style scoped lang="less">
    .main{
        padding: 0 .32rem;
        padding-top: 1.76rem;
        height: 100vh;
    }
</style>