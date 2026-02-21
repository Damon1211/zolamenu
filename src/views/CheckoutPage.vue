<template>
  <div class="checkout-page">
    <header class="page-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1 class="page-title">订单结算</h1>
    </header>

    <div class="checkout-content">
      <div class="checkout-main">
        <section class="section">
          <h2 class="section-title">收货信息</h2>
          <div class="form-group">
            <label class="form-label">姓名</label>
            <input
              v-model="orderForm.name"
              type="text"
              class="form-input"
              placeholder="请输入您的姓名"
            />
          </div>
          <div class="form-group">
            <label class="form-label">手机号</label>
            <input
              v-model="orderForm.phone"
              type="tel"
              class="form-input"
              placeholder="请输入手机号"
            />
          </div>
          <div class="form-group">
            <label class="form-label">地址</label>
            <input
              v-model="orderForm.address"
              type="text"
              class="form-input"
              placeholder="请输入收货地址"
            />
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">订单详情</h2>
          <div class="order-items">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="order-item"
            >
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-spec">¥{{ item.price }} × {{ item.quantity }}</p>
              </div>
              <span class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">备注</h2>
          <textarea
            v-model="orderForm.remark"
            class="form-textarea"
            placeholder="如有特殊要求，请在此填写"
            rows="3"
          ></textarea>
        </section>
      </div>

      <div class="checkout-sidebar">
        <div class="summary-card">
          <h2 class="summary-title">订单摘要</h2>
          <div class="summary-row">
            <span>商品数量</span>
            <span>{{ cartCount }} 件</span>
          </div>
          <div class="summary-row">
            <span>商品小计</span>
            <span>¥{{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>配送费</span>
            <span>¥{{ deliveryFee.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>合计</span>
            <span class="total-price">¥{{ finalTotal.toFixed(2) }}</span>
          </div>
          <button
            class="btn btn-primary submit-btn"
            :disabled="!isFormValid || isSubmitting"
            @click="handleSubmit"
          >
            {{ isSubmitting ? '提交中...' : '提交订单' }}
          </button>
        </div>
      </div>
    </div>

    <SuccessModal
      v-if="showSuccessModal"
      :order="currentOrder"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'
import SuccessModal from '../components/SuccessModal.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const { cartItems, cartCount, cartTotal } = storeToRefs(cartStore)
const { clearCart } = cartStore
const { createOrder } = orderStore
const { currentOrder } = storeToRefs(orderStore)

const orderForm = ref({
  name: '',
  phone: '',
  address: '',
  remark: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const deliveryFee = computed(() => cartTotal.value > 0 ? 5 : 0)

const finalTotal = computed(() => cartTotal.value + deliveryFee.value)

const isFormValid = computed(() => {
  return orderForm.value.name &&
         orderForm.value.phone &&
         orderForm.value.address &&
         cartItems.value.length > 0
})

function goBack() {
  router.back()
}

async function handleSubmit() {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true

  const orderData = {
    items: [...cartItems.value],
    total: finalTotal.value,
    deliveryFee: deliveryFee.value,
    customer: {
      name: orderForm.value.name,
      phone: orderForm.value.phone,
      address: orderForm.value.address
    },
    remark: orderForm.value.remark
  }

  await new Promise(resolve => setTimeout(resolve, 1000))

  createOrder(orderData)
  clearCart()
  showSuccessModal.value = true
  isSubmitting.value = false
}

function handleModalClose() {
  showSuccessModal.value = false
  router.push('/')
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.checkout-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ff6b35;
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-item {
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

.item-spec {
  font-size: 13px;
  color: #999;
}

.item-total {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b35;
}

.checkout-sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.summary-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 2px solid #f0f0f0;
}

.total-price {
  color: #ff6b35;
  font-size: 24px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .checkout-sidebar {
    position: static;
  }
}
</style>
