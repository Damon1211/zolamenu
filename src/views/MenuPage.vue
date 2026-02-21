<template>
  <div class="menu-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">园区餐厅</h1>
        <p class="page-subtitle">美味佳肴，即刻送达</p>
      </div>
      <div class="header-actions">
        <button class="cart-btn" @click="handleCartClick">
          <span class="cart-icon">🛒</span>
          <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </button>
      </div>
    </header>

    <div class="category-tabs">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="['tab-btn', { active: selectedCategory === category.id }]"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="menu-grid">
      <DishCard
        v-for="dish in filteredDishes"
        :key="dish.id"
        :dish="dish"
        @add-to-cart="addToCart"
        @show-detail="showDishDetail"
      />
    </div>

    <CartDrawer v-show="isCartOpen" @close="closeCart" />

    <DishDetailModal
      v-if="selectedDish"
      :dish="selectedDish"
      @close="closeDishDetail"
      @add-to-cart="addToCart"
    />

    <div class="debug-info">
      <p>购物车状态: {{ isCartOpen ? '打开' : '关闭' }}</p>
      <p>购物车数量: {{ cartCount }}</p>
      <button @click="toggleCart">切换购物车</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { menuData, categories } from '../data/menu'
import DishCard from '../components/DishCard.vue'
import CartDrawer from '../components/CartDrawer.vue'
import DishDetailModal from '../components/DishDetailModal.vue'

const cartStore = useCartStore()

const selectedCategory = ref('all')
const selectedDish = ref(null)

const { cartCount, isCartOpen } = storeToRefs(cartStore)
const { addToCart, closeCart, toggleCart } = cartStore

const filteredDishes = computed(() => {
  if (selectedCategory.value === 'all') return menuData

  const categoryMap = {
    hot: '热菜',
    seafood: '海鲜',
    vegetable: '素菜',
    soup: '汤品',
    staple: '主食'
  }
  return menuData.filter(dish => dish.category === categoryMap[selectedCategory.value])
})

function selectCategory(categoryId) {
  selectedCategory.value = categoryId
}

function showDishDetail(dish) {
  selectedDish.value = dish
}

function closeDishDetail() {
  selectedDish.value = null
}

function handleCartClick() {
  console.log('购物车按钮被点击')
  console.log('当前购物车状态:', isCartOpen.value)
  toggleCart()
  console.log('切换后购物车状态:', isCartOpen.value)
}
</script>

<style scoped>
.menu-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
  padding: 40px 20px;
  position: relative;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.header-actions {
  position: absolute;
  top: 20px;
  right: 20px;
}

.cart-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.cart-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.category-tabs {
  background: white;
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
  white-space: nowrap;
}

.tab-btn {
  padding: 10px 24px;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.3s;
  margin-right: 8px;
}

.tab-btn:hover {
  background: #f0f0f0;
}

.tab-btn.active {
  background: #ff6b35;
  color: white;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    padding: 15px;
  }

  .header-actions {
    top: 15px;
    right: 15px;
  }
}
</style>
