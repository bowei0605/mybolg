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
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/UserCenter',
    name: 'UserCenter',
    component: UserCenter
  },
  {
    path: '/EditBlog',
    name: 'EditBlog',
    component: EditBlog
  },
  {
    path: '/BlogInfo',
    name: 'BlogInfo',
    component: function () {
      return import('../views/BlogInfo.vue')
    }
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
