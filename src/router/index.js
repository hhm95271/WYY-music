import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Isme from '@/views/Isme.vue'
import Player from '@/views/player.vue'
import Header from '@/views/public/header.vue'
import Footer from '@/views/public/footer.vue'
import Lyric from '@/views/users/lyric.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Lyric',
    name: 'Lyric',
    component: Lyric
  },
  {
    path: `/Isme`,
    name: 'Isme',
    component: Isme
  },
  {
    path: '/Player',
    name: 'Player',
    component: Player
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
