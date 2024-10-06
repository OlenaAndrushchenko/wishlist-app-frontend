<script setup>
import { useWishlistsStore } from '@/stores/wishlistStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const wishlistsStore = useWishlistsStore();
const router = useRouter();

const {wishlists} = storeToRefs(wishlistsStore);

onMounted(() => {
    wishlistsStore.getWishlists();
});
</script>

<template>
    <div>
        <h2>My Wishlists</h2>
        <ul v-if="wishlists.length">
            <li v-for="wishlist in wishlists" :key="wishlist.id">
                <!-- <router-link :to="`/wishlists/${wishlist.id}`">{{ wishlist.title }}</router-link> -->
                 <p>{{ wishlist.title }}</p>
            </li>
        </ul>
        <p v-else>No wishlists found.</p>
    </div>
</template>