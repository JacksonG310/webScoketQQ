import vue from "vue";
import vuex from "vuex";

vue.use(vuex);

const actions = {
    setApplyNum(context, value) {
        context.commit("SETAPPLYNUM", value);
    },
    // addAllMsgNum(context, value) {
    //     context.commit("SERALLMSGNUM", value);
    // },
    // reduceAllMsgNum(context, value) {
    //     context.commit("SERALLMSGNUM", value);
    // }
}
const mutations = {
    SETAPPLYNUM(state, value) {
        state.applyNum = value;
        console.log(state.applyNum);
    },
    // ADDALLMSGNUM(state, value) {
    //     state.allMsgNum += value;
    // },
    // REDUCEALLMSGNUM(state, value) {
    //     if (state.legnth <= 0) return;
    //     state.allMsgNum -= value;
    // }
}
const state = {
    applyNum: 0,
    // allMsgNum: 0,
}

const store = new vuex.Store({
    actions,
    mutations,
    state
})


export default store;