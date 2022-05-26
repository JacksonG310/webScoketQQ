import "./assets/css/common.css"
import "./plugins/ElementUI"
import "element-ui/lib/theme-chalk/index.css"
import "vant/lib/index.css"
import "./plugins/VantUI"
import "./assets/js/font-resize"
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: "http://192.168.236.205:3000/"
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')