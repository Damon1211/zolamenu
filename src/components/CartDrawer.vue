<template>
  <div class="cart-drawer" @click.self="handleClose">
    <div class="drawer-content">
      <div class="drawer-header">
        <h2 class="drawer-title">购物车</h2>
        <button class="close-btn" @click="handleClose">×</button>
      </div>

      <div class="drawer-body">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">🛒</div>
          <p class="empty-text">购物车是空的</p>
          <button class="btn btn-primary" @click="handleClose">去点餐</button>
        </div>

        <div v-else class="cart-items">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-info">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-price">¥{{ item.price }}</p>
            </div>
            <div class="item-quantity">
              <button
                class="quantity-btn"
                @click="updateQuantity(item.id, item.quantity - 1)"
              >
                −
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button
                class="quantity-btn"
                @click="updateQuantity(item.id, item.quantity + 1)"
              >
                +
              </button>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.id)">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="drawer-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>商品数量</span>
            <span>{{ cartCount }} 件</span>
          </div>
          <div class="summary-row total">
            <span>合计</span>
            <span class="total-price">¥{{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
        <button class="btn btn-primary checkout-btn" @click="handleCheckout">
          去结算
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, closeCart } = cartStore

function handleClose() {
  closeCart()
}

function handleCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;
  z-index: 999;
}

.drawer-content {
  background: white;
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  margin-bottom: 24px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.item-price {
  font-size: 14px;
  color: #ff6b35;
  font-weight: 600;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.quantity-btn:hover {
  border-color: #ff6b35;
  color: #ff6b35;
}

.quantity {
  font-size: 14px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.remove-btn:hover {
  opacity: 1;
}

.drawer-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: white;
}

.cart-summary {
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.total-price {
  color: #ff6b35;
  font-size: 24px;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .drawer-content {
    max-width: 100%;
  }
}
</style>
