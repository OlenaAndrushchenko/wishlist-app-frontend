import WishService from "@/core/api/spring/wish/WishService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishStore = defineStore("wish", () => {
    const wishes = ref([]);
    const currentWish = ref(null);

    const setWishes = (wishArrayFromWishlist) => {
        wishes.value = wishArrayFromWishlist || []
    } 

    const createWish = async (wishData) => {
        try {
            const data = await new WishService().createWish(wishData);
            wishes.value.push(data);
            return data;
        } catch (error) {
            console.error("Failed to create wish", error);
            throw error;
        }
    }

    const getWish = async (id) => {
        try {
            const data = await new WishService().readWish(id);
            currentWish.value = data;
            return data;
        } catch (error) {
            console.error("Failed to get wish", error);
            throw error;
        }
    }

    const updateWish = async (id, wishData) => {
        try {
            const data = await new WishService().updateWish(id, wishData);
            const index = wishes.value.findIndex((wish) => wish.id === id);
            if (index !== -1) {
                wishes.value[index] = data;
            }
            if (currentWish.value && currentWish.value.id === id) {
                currentWish.value = data;
            }
            return data;
        } catch (error) {
            console.error("Failed to update wish", error);
            throw error;
        }
    }

    const deleteWish = async (id) => {
        try {
            const data = await new WishService().deleteWish(id);
            wishes.value = wishes.value.filter((wish) => wish.id !== id);
            if (currentWish.value && currentWish.value.id === id) {
                currentWish.value = null;
            }
            return data;
        } catch (error) {
            console.error("Failed to delete wish", error);
            throw error;
        }
    }

    return { wishes, currentWish, setWishes, createWish, getWish, updateWish, deleteWish }
})