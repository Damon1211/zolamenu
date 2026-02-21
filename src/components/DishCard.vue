<template>
  <div class="dish-card" @click="showDetail">
    <div class="dish-image">
      <img :src="dish.image" :alt="dish.name" loading="lazy" />
      <div class="dish-tags">
        <span v-if="dish.tags.includes('hot')" class="badge badge-hot">热销</span>
        <span v-if="dish.tags.includes('new')" class="badge badge-new">新品</span>
        <span v-if="dish.tags.includes('recommend')" class="badge badge-recommend">推荐</span>
      </div>
    </div>
    <div class="dish-info">
      <h3 class="dish-name">{{ dish.name }}</h3>
      <p class="dish-description">{{ dish.description }}</p>
      <div class="dish-meta">
        <span class="dish-sales">月售 {{ dish.sales }}</span>
        <span class="dish-rating">★ {{ dish.rating }}</span>
      </div>
      <div class="dish-footer">
        <span class="dish-price">¥{{ dish.price }}</span>
        <button class="btn btn-primary add-btn" @click.stop="handleAddToCart">
          加入购物车
        </button>
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

const emit = defineEmits(['add-to-cart', 'show-detail'])

function handleAddToCart() {
  emit('add-to-cart', props.dish)
}

function showDetail() {
  emit('show-detail', props.dish)
}
</script>

<style scoped>
.dish-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
}

.dish-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.dish-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.dish-card:hover .dish-image img {
  transform: scale(1.05);
}

.dish-tags {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
}

.dish-info {
  padding: 16px;
}

.dish-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.dish-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dish-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: #999;
}

.dish-rating {
  color: #ffa502;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b35;
}

.add-btn {
  padding: 8px 16px;
  font-size: 14px;
}
</style>
