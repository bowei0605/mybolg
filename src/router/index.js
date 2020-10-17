import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login'
import UserCenter from '../views/user/UserCenter'
import EditBlog from '../views/user/EditBlog'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta:{
    //   title: '波伟|个人博客'
    // }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    // meta:{
    //   title: '登录 | 注册页面'
    // }
  },
  {
    path: '/UserCenter',
    name: 'UserCenter',
    component: UserCenter,
    // meta:{
    //   title: '个人中心'
    // }
  },
  {
    path: '/EditBlog',
    name: 'EditBlog',
    component: EditBlog,
    // meta:{
    //   title: '写博客'
    // }
  },
  {
    path: '/BlogInfo',
    name: 'BlogInfo',
    component: function () {
      return import('../views/BlogInfo.vue')
    }
  },
  {
    path: '/EditUserInfo',
    name: 'EditUserInfo',
    component: function () {
      return import('../views/user/EditUserInfo.vue')
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.title){
//     document.title = to.meta.title
//   }
//   next()
// })

export default router
