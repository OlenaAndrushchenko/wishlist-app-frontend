import apiClient from "../../api-utils";

const ITEMS_ENDPOINT = '/wishlist-items';

class WishRepository {

    async createWishlistItem(wishData) {
        const response = await apiClient.post(`${ITEMS_ENDPOINT}/create`, wishData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        return response.data
    }

    async readWishlistItem(id) {
        const response = await apiClient.get(`${ITEMS_ENDPOINT}/${id}`);

        return response.data
    }

    async updateWishlistItem(id, wishData) {
        const response = await apiClient.put(`${ITEMS_ENDPOINT}/${id}`, wishData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        return response.data
    }

    async deleteWishlistItem(id) {
        const response = await apiClient.delete(`${ITEMS_ENDPOINT}/${id}`);

        return response.data
    }
}

export default new WishRepository()