import vue from "vue";
import vuex from "vuex";

vue.use(vuex);

const actions = {
    addMessageNum(context, value) {
        context.commit(ADDMESSAGENUM, value)
    }
}
const mutations = {
    ADDMESSAGENUM(state, value) {
        state.applyNum = value;
        console.log(state.applyNum);
    },
}
const state = {

}

const store = new vuex.Store({
    actions,
    mutations,
    state
})


export default store;