import apiClient from "../../api-utils"

class AuthRepository {
    async login(email, password) {
        const response = await apiClient.post('/auth/login', {
            email,
            password
        });
        const token = response.headers['authorization']?.split(' ')[1];
        return {
            token,
            message: response.data
        }
    }

    async register(username, email, password) {
        return apiClient.post('/register', {
            username,
            email,
            password
        })
    }
}

export default new AuthRepository()