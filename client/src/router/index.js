import { createRouter, createWebHistory } from 'vue-router'

// import Home from './component/Home.vue'
import Chat from '../component/chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //{ path: '/', component: Home },
    { path: '/', component: Chat },
    { path: '/chat', component: Chat },
  ],
})

export default router
