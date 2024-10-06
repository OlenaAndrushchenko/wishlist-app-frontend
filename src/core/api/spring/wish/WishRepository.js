import apiClient from "../../api-utils";

const ITEMS_ENDPOINT = '/wishlist-items';

class WishRepository {

    async createWishlistItem(wishItemData) {
        const response = await apiClient.post(`${ITEMS_ENDPOINT}/create`, wishItemData);

        return response.data
    }

    async readWishlistItem(id) {
        const response = await apiClient.get(`${ITEMS_ENDPOINT}/${id}`);

        return response.data
    }

    async updateWishlistItem(id, wishItemData) {
        const response = await apiClient.put(`${ITEMS_ENDPOINT}/${id}`, wishItemData);

        return response.data
    }

    async deleteWishlistItem(id) {
        const response = await apiClient.delete(`${ITEMS_ENDPOINT}/${id}`);

        return response.data
    }
}

export default new WishRepository()