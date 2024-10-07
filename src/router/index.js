import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: () => import('@/views/MyWishlistsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/wishlists/:id',
      name: 'wishlist',
      component: () => import('@/views/SingleWishlistView.vue'),
      meta: { requiresAuth: true },
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next({ path: '/', query: { redirect: to.fullPath } });
  } else {
    next();
  }
})

export default router
