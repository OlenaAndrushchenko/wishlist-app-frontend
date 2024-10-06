import WishlistService from "@/core/api/spring/wishlist/WishlistService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishlistsStore = defineStore("wishlists", () => {
    const wishlists = ref([])
    const currentWishlist = ref(null)

    const createWishlist = async (wishlistData) => {
        try {
            const data = await new WishlistService().createWishlist(wishlistData);
            wishlists.value.push(data);
            return data;
        } catch (error) {
            console.error("Failed to create wishlist", error);
            throw error;
        }
    }

    const getWishlist = async (id) => {
        try {
            const data = await new WishlistService().readWishlist(id);
            currentWishlist.value = data;
            return data;
        } catch (error) {
            console.error("Failed to get wishlist", error);
            throw error;
        }
    }

    const updateWishlist = async (id, wishlistData) => {
        try {
            const data = await new WishlistService().updateWishlist(id, wishlistData);
            const index = wishlists.value.findIndex((wishlist) => wishlist.id === id);
            
            if (index !== -1) {
                wishlists.value[index] = data;
            }
            
            if (currentWishlist.value && currentWishlist.value.id === id) {
                currentWishlist.value = data;
            }
            
            return data;
        } catch (error) {
            console.error("Failed to update wishlist", error);
            throw error;
        }
    }

    const deleteWishlist = async (id) => {
        try {
            const data = await new WishlistService().deleteWishlist(id);
            wishlists.value = wishlists.value.filter((wishlist) => wishlist.id !== id);
            if (currentWishlist.value && currentWishlist.value.id === id) {
                currentWishlist.value = null;
            }
            return data;
        } catch (error) {
            console.error("Failed to delete wishlist", error);
            throw error;
        }
    }

    const getWishlists = async () => {
        try {
            const data = await new WishlistService().readWishlists();
            wishlists.value = data;
            return data;
        } catch (error) {
            console.error("Failed to get wishlists", error);
            throw error;
        }
    }

    return { wishlists, currentWishlist, createWishlist, getWishlist, updateWishlist, deleteWishlist, getWishlists }
})