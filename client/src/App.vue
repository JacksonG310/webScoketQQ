<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>

<style lang="less">
* {
  font-family: Kanit;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#App {
  z-index: -999;
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
