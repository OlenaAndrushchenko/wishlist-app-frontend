import WishRepository from "./WishRepository";

export default class WishService {
    constructor(repository = WishRepository) {
        this.repository = repository;
    }

    async createWish(wishData) {
        const data = await this.repository.createWishlistItem(wishData);
        return data;
    }

    async readWish(id) {
        const data = await this.repository.readWishlistItem(id);
        return data;
    }

    async updateWish(id, wishData) {
        const data = await this.repository.updateWishlistItem(id, wishData);
        return data;
    }

    async deleteWish(id) {
        const data = await this.repository.deleteWishlistItem(id);
        return data;
    }

}