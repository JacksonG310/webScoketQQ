// import "./assets/css/Kanit-font.css"
import "./plugins/ElementUI"
import "element-ui/lib/theme-chalk/index.css"
import "vant/lib/index.css"
import "./plugins/VantUI"
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: "http://127.0.0.1:3000/"
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')