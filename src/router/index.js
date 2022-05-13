import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Login from "../views/Login"
import SignUp from "../views/SignUp"
import Individual from "../views/Individual"
import Reset from "../views/Reset"
import FriendDetail from "../views/FriendDetail"
import Chat from "../views/Chat"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login',
        name: "Login",
        component: Login
    }, {
        path: "/signUp",
        name: "signUp",
        component: SignUp
    }, {
        path: "/individual",
        name: "individual",
        component: Individual
    }, {
        path: "/reset",
        name: "reset",
        component: Reset
    }, {
        path: "/friendDetail",
        name: "friendDetail",
        component: FriendDetail
    }, {
        path: "/chat",
        name: "chat",
        component: Chat
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router