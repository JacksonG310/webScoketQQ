<template >
    <div id="top-bar">
        <span class="left-button">
            <slot name="left-button"></slot>
        </span>
        <span class="title">{{ title }}</span>
        <span class="right-button">
            <slot name="right-button"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: ["title"]
}
</script>

<style lang="less">
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.75rem !important;
    padding: 2rem 1rem;
    background-color: pink;

    // .left-button {
    //     display: inline-block;
    //     width: 1.05rem;
    //     height: 1.05rem;

    //     img {
    //         width: 100%;
    //     }
    // }

    // .right-button {
    //     width: 2.25rem;
    //     height: 1.56rem;
    //     font-family: Kanit;
    //     font-size: 1.12rem;
    //     color: #333333;
    //     font-weight: 500;
    // }
}
</style>