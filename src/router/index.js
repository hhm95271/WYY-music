import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Isme from '@/views/Isme.vue'
import Login from '@/views/login.vue'
import Lyric from '@/views/users/lyric.vue'
import About from '@/views/About.vue'
import RankList from '@/components/rankList'

Vue.use(VueRouter)

const routes = [{
    path: '/User1',
    name: 'User1',
    component: resolve => require(['../views/users/user1.vue'], resolve)
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: resolve => require(['../views/public/recommend.vue'], resolve)
  },
  {
    path: '/MV',
    name: 'MV',
    component: resolve => require(['../views/public/mv.vue'], resolve)
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Lyric',
    name: 'Lyric',
    component: Lyric
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: `/Isme`,
    name: 'Isme',
    component: Isme
  },

  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/rankList',
    name: 'RankList',
    component: RankList,
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router