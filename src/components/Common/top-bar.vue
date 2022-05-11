<template >
    <div id="top-bar" :class="{'addpadding':padding}">
        <span class="left-button" @click="clickLeft">
            <slot name="left"></slot>
        </span>
        <span class="title"></span>
        <span class="right-button" @click="clickRight">
            <slot name="right"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: ["title","padding"],
    methods: {
        clickLeft() {
            this.$emit("click-left");
        },
        clickRight() {
            this.$emit("click-right");
        }
    }
}
</script>

<style lang="less">
#top-bar {
  &.addpadding{
    padding: 0 @less-spacing-row-28;
  }
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    //width: 7.5rem;
    height: .88rem;
    background-color: #fff;

    .left-button,
    .right-button {
        font-size: @less-text-size-18;
    }

    .title {
      font-size: @less-text-size-20;
    }


}
</style>