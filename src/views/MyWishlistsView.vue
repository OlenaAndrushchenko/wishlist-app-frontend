<script setup>
import BaseHeading from '@/components/base/BaseHeading.vue';
import WishlistsList from '@/components/wishlists/WishlistsList.vue';

</script>

<template>
    <div class="container mx-auto py-10 flex flex-col gap-8 px-4">
        <BaseHeading level="2">My Wishlists</BaseHeading>
        <WishlistsList />
    </div>
</template>