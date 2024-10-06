import apiClient from "../../api-utils";

const WISHLIST_ENDPOINT = '/wishlists';

class WishlistRepository {

    async createWishlist(wishlistData) {
        const response = await apiClient.post(`${WISHLIST_ENDPOINT}/create`, wishlistData);
        
        return response.data
    }

    async readWishlist(id) {
        const response = await apiClient.get(`${WISHLIST_ENDPOINT}/${id}`);

        return response.data
    }

    async updateWishlist(id, wishlistData) {
        const response = await apiClient.put(`${WISHLIST_ENDPOINT}/${id}`, wishlistData);

        return response.data
    }

    async deleteWishlist(id) {
        const response = await apiClient.delete(`${WISHLIST_ENDPOINT}/${id}`);

        return response.data
    }

    async readWishlists() {
        const response = await apiClient.get(WISHLIST_ENDPOINT);

        return response.data
    }
}

export default new WishlistRepository()