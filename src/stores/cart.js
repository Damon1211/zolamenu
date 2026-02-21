import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const isCartOpen = ref(false)

  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  function addToCart(dish) {
    const existingItem = cartItems.value.find(item => item.id === dish.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        ...dish,
        quantity: 1
      })
    }
    isCartOpen.value = true
  }

  function removeFromCart(dishId) {
    const index = cartItems.value.findIndex(item => item.id === dishId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  function updateQuantity(dishId, quantity) {
    const item = cartItems.value.find(item => item.id === dishId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(dishId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function closeCart() {
    isCartOpen.value = false
  }

  return {
    cartItems,
    isCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart
  }
})
