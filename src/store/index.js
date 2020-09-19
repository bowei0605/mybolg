import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isBlogInfo: false,
    userName: ''
  },
  mutations: {
    getUserName(state, msg){
      state.userName = msg
    }
  },
  actions: {
    goBlogInfo(index){
      this.state.isBlogInfo = index
    },
  },
  modules: {
  }
})
