<template>
  <div class="dish-detail-modal" @click.self="handleClose">
    <div class="modal-content">
      <button class="close-btn" @click="handleClose">×</button>
      <div class="modal-body">
        <div class="dish-image">
          <img :src="dish.image" :alt="dish.name" />
        </div>
        <div class="dish-details">
          <h2 class="dish-name">{{ dish.name }}</h2>
          <div class="dish-tags">
            <span v-if="dish.tags.includes('hot')" class="badge badge-hot">热销</span>
            <span v-if="dish.tags.includes('new')" class="badge badge-new">新品</span>
            <span v-if="dish.tags.includes('recommend')" class="badge badge-recommend">推荐</span>
          </div>
          <p class="dish-description">{{ dish.description }}</p>
          <div class="dish-meta">
            <span class="dish-category">{{ dish.category }}</span>
            <span class="dish-sales">月售 {{ dish.sales }}</span>
            <span class="dish-rating">★ {{ dish.rating }}</span>
          </div>
          <div class="dish-price-section">
            <span class="dish-price">¥{{ dish.price }}</span>
          </div>
          <button class="btn btn-primary add-to-cart-btn" @click="handleAddToCart">
            加入购物车
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dish: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart'])

function handleClose() {
  emit('close')
}

function handleAddToCart() {
  emit('add-to-cart', props.dish)
  handleClose()
}
</script>

<style scoped>
.dish-detail-modal {
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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.dish-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dish-details {
  padding: 24px;
}

.dish-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
}

.dish-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.dish-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.dish-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #999;
}

.dish-rating {
  color: #ffa502;
}

.dish-price-section {
  margin-bottom: 20px;
}

.dish-price {
  font-size: 32px;
  font-weight: 700;
  color: #ff6b35;
}

.add-to-cart-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
}

@media (min-width: 768px) {
  .modal-body {
    flex-direction: row;
  }

  .dish-image {
    width: 50%;
    height: auto;
  }

  .dish-details {
    width: 50%;
  }
}
</style>
