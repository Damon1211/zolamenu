import { createRouter, createWebHistory } from 'vue-router'
import MenuPage from '../views/MenuPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: MenuPage
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
