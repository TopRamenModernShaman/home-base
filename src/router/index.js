import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import SeanSucks from '../views/SeanSucks.vue';
import mtg from '../views/mtg.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SeanSucks',
    name: 'SeanSucks',
    component: SeanSucks
  },
  {
    path: '/mtg',
    name: 'mtg',
    component: mtg
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
