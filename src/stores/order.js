import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)

  function createOrder(orderData) {
    const order = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    orders.value.unshift(order)
    currentOrder.value = order
    return order
  }

  function updateOrderStatus(orderId, status) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
  }

  function getOrderById(orderId) {
    return orders.value.find(o => o.id === orderId)
  }

  function clearCurrentOrder() {
    currentOrder.value = null
  }

  return {
    orders,
    currentOrder,
    createOrder,
    updateOrderStatus,
    getOrderById,
    clearCurrentOrder
  }
})
