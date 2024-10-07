<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useWishlistsStore } from '@/stores/wishlistStore';
import { useWishStore } from '@/stores/wishStore';
import BaseHeading from '@/components/base/BaseHeading.vue';
import WishesList from '@/components/wishes/WishesList.vue';

const route = useRoute();
const wishlistsStore = useWishlistsStore();
const wishStore = useWishStore();

const currentWishlist = ref(null);

onMounted(async () => {
    if (route.params.id) {
        try {
            await wishlistsStore.getWishlist(route.params.id);
            currentWishlist.value = wishlistsStore.currentWishlist;
            wishStore.setWishes(currentWishlist.value.items);
        } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        }
    }
})
</script>

<template>
    <div class="container mx-auto py-10 px-4">
        <div v-if="currentWishlist" class="flex flex-col gap-3">
            <BaseHeading level="3"> {{ currentWishlist.title }} </BaseHeading>
            <p class="text-lg"> {{ currentWishlist.description }}</p>

            <WishesList :wishes="wishStore.wishes" :wishlist-id="currentWishlist.id" />
        </div>
        <p v-else class="text-center text-lg">Loading wishlist...</p>
    </div>
</template>