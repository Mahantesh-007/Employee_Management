import { createRouter, createWebHistory } from 'vue-router'
import DisplayEmloyee from '../views/DisplayEmployee.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DisplayEmloyee
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
      path:'/edit-employee/:id',
      name:'editEmployee',
      component: () => import('../views/EditEmployee.vue')
    },
    {
      path:'/view-employee/:id',
      name:'viewEmployee',
      component: () => import('../views/DisplayUser.vue')
    }
  ]
})

export default router


