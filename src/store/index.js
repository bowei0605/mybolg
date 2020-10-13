import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isBlogInfo: {
      blogContent:'',
      blogTitle: ''
    },
  },
  
  mutations: {
    //
    goBlogInfo(state,blogContent,blogTitle){
      state.isBlogInfo.blogContent = blogContent
      state.isBlogInfo.blogTitle = blogTitle
    },
  },

  actions: {

  },

  modules: {
  }

})
