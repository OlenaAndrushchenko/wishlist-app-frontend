import AuthService from '@/core/api/spring/auth/AuthService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const isAuthenticated = ref(!!token.value);
    const user = ref(token.value ? { email: 'email' } : null);
    const errorMessage = ref("");

    const login = async (email, password) => {
        try {
            const { token: receivedToken } = await new AuthService().login(email, password);

            if (!receivedToken) throw new Error('Token not received');

            user.value = { email };
            token.value = receivedToken;
            localStorage.setItem('token', receivedToken);
            isAuthenticated.value = true;
            errorMessage.value = "";

        } catch (error) {
            console.error("Failed to login", error);
            errorMessage.value = error.response?.data?.message || "Login failed. Please try again.";
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const data = await new AuthService().register(username, email, password);
            errorMessage.value = "";
            return data;
        } catch (error) {
            console.error("Failed to register", error);
            errorMessage.value = error.response?.data?.message || "Registration failed. !!! Please try again.";
            throw error;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        isAuthenticated.value = false;
        errorMessage.value = "";
    };

    return { isAuthenticated, user, token, login, register, logout, errorMessage };
});
