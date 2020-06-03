import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Isme from '@/views/Isme.vue'
import Login from '@/views/login.vue'
import Header from '@/views/public/header.vue'
import Footer from '@/views/public/footer.vue'
import Lyric from '@/views/users/lyric.vue'
import About from '@/views/About.vue'
import RankList from '@/components/rankList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/default',
    name: '/',
    redirect: { name: 'Login' }
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
    children: [
      {
        path: '/header',
        name: 'Header',
        component: Header,
      },
      {
        path: '/footer',
        name: 'Footer',
        component: Footer,
      },

    ]
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
    // children: []
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
