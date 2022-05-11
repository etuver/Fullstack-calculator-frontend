import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ '@/views/HomeView.vue'
      )
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ '@/views/RegisterView.vue'
      )
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ '@/views/LoginView.vue'
      )
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
