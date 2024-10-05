import AuthRepository from "./AuthRepository";

export default class AuthService {

    constructor(repository = AuthRepository) {
        this.repository = repository
    }
    
    async login(email, password) {
        const { token, message } = await AuthRepository.login(email, password);
        return { token, message };
    }

    async register(username, email, password) {
        const response = await AuthRepository.register(username, email, password);
        return response.data;
    }
}