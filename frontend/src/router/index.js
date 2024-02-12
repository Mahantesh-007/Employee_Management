import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/add-employee',
      name: 'addEmployee',
      component: () => import('../views/AddEmployee.vue')
    },
    {
      path: '/view-employee',
      name: 'viewEmployee',
      component: () => import('../views/DisplayEmployee.vue')
    },
    {
      path:'/edit-employee/:id',
      name:'editEmployee',
      component: () => import('../views/EditEmployee.vue')
    }
  ]
})

export default router


