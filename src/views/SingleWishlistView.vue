<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useWishlistsStore } from '@/stores/wishlistStore';
import { useWishStore } from '@/stores/wishStore';

const route = useRoute();
const wishlistsStore = useWishlistsStore();
const wishStore = useWishStore();

const currentWishlist = ref(null);
const wishes = ref([]);

onMounted(async () => {
    if (route.params.id) {
        const fetchedWishlist = await wishlistsStore.getWishlist(route.params.id);
        currentWishlist.value = fetchedWishlist;
        wishes.value = wishStore.wishes;
    }
})
</script>

<template>
    <div class="container mx-auto py-10">
        <div v-if="currentWishlist">
            <h1 class="text-2xl font-bold mb-4">{{ currentWishlist.title }}</h1>
            <p>Description: {{ currentWishlist.description }}</p>
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Wishes</h2>
                <ul>
                    <li v-for="wish in wishes" :key="wish.id">
                        {{ wish.name }} - {{ wish.description }}
                    </li>
                </ul>
            </div>
        </div>
        <p v-else class="text-center text-lg">Loading wishlist...</p>
    </div>
</template>