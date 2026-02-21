<template>
  <div class="success-modal" @click.self="handleClose">
    <div class="modal-content">
      <div class="success-icon">✓</div>
      <h2 class="modal-title">订单提交成功！</h2>
      <p class="modal-subtitle">您的订单正在准备中</p>

      <div class="order-info">
        <div class="info-row">
          <span class="info-label">订单编号</span>
          <span class="info-value">{{ order.id }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">订单金额</span>
          <span class="info-value">¥{{ order.total.toFixed(2) }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">收货人</span>
          <span class="info-value">{{ order.customer.name }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">联系电话</span>
          <span class="info-value">{{ order.customer.phone }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">收货地址</span>
          <span class="info-value">{{ order.customer.address }}</span>
        </div>
      </div>

      <div class="order-items-preview">
        <h3 class="preview-title">订单商品</h3>
        <div class="items-list">
          <div v-for="item in order.items" :key="item.id" class="preview-item">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">× {{ item.quantity }}</span>
          </div>
        </div>
      </div>

      <button class="btn btn-primary confirm-btn" @click="handleClose">
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #2ed573;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  margin: 0 auto 20px;
}

.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}

.order-info {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.order-items-preview {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: left;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.item-name {
  color: #333;
}

.item-quantity {
  color: #999;
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
}
</style>
