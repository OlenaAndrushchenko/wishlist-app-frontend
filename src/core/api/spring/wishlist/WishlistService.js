import WishlistRepository from "./WishlistRepository";

export default class WishlistService {
    constructor(repository = WishlistRepository) {
        this.repository = repository;
    }

    async createWishlist(wishlistData) {
        const data = await this.repository.createWishlist(wishlistData);
        return data;
    }

    async readWishlist(id) {
        const data = await this.repository.readWishlist(id);
        return data;
    }

    async updateWishlist(id, wishlistData) {
        const data = await this.repository.updateWishlist(id, wishlistData);
        return data;
    }

    async deleteWishlist(id) {
        const data = await this.repository.deleteWishlist(id);
        return data;
    }

    async readWishlists() {
        const data = await this.repository.readWishlists();
        return data;
    }
}