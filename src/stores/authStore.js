import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
    loginWithApple,
    loginWithEmail,
    loginWithGoogle,
    loginWithMicrosoft,
    logout as firebaseLogout,
    resetPassword,
    serializeUser,
    subscribeToAuthChanges,
} from '@/js/services/authService.js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isReady = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')
    let authReadyPromise = null

    const isAuthenticated = computed(() => Boolean(user.value))

    function clearError() {
        errorMessage.value = ''
    }

    function initAuthListener() {
        if (authReadyPromise) {
            return authReadyPromise
        }

        authReadyPromise = new Promise((resolve) => {
            subscribeToAuthChanges((firebaseUser) => {
                user.value = serializeUser(firebaseUser)
                isReady.value = true
                resolve(user.value)
            })
        })

        return authReadyPromise
    }

    async function login(email, password, rememberMe) {
        isLoading.value = true
        clearError()

        try {
            const firebaseUser = await loginWithEmail(email, password, rememberMe)
            user.value = serializeUser(firebaseUser)
            return user.value
        } catch (error) {
            errorMessage.value = error.message
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function loginSocial(provider) {
        isLoading.value = true
        clearError()

        const providers = {
            google: loginWithGoogle,
            apple: loginWithApple,
            microsoft: loginWithMicrosoft,
        }

        try {
            const firebaseUser = await providers[provider]()
            user.value = serializeUser(firebaseUser)
            return user.value
        } catch (error) {
            errorMessage.value = error.message
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function forgotPassword(email) {
        isLoading.value = true
        clearError()

        try {
            await resetPassword(email)
        } catch (error) {
            errorMessage.value = error.message
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        await firebaseLogout()
        user.value = null
    }

    return {
        user,
        isReady,
        isLoading,
        errorMessage,
        isAuthenticated,
        clearError,
        initAuthListener,
        login,
        loginSocial,
        forgotPassword,
        logout,
    }
})
