import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isBlogInfo: false,
  },
  
  mutations: {
    //
  },

  actions: {
    goBlogInfo(index){
      this.state.isBlogInfo = index
    },
  },

  modules: {
  }

})
