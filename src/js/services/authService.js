import {
    GoogleAuthProvider,
    OAuthProvider,
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth } from '@/firebase.js'

const REMEMBER_EMAIL_KEY = 'mk-dashboard-remember-email'

const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')
const microsoftProvider = new OAuthProvider('microsoft.com')

function mapAuthError(error) {
    const code = error?.code || ''

    const messages = {
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
        'auth/cancelled-popup-request': 'Sign-in was cancelled.',
        'auth/account-exists-with-different-credential':
            'An account already exists with the same email using a different sign-in method.',
        'auth/operation-not-allowed':
            'This sign-in method is not enabled. Enable it in Firebase Authentication.',
        'auth/popup-blocked': 'The sign-in popup was blocked by the browser.',
        'auth/network-request-failed': 'Network error. Check your connection and try again.',
        'auth/missing-email': 'Please enter your email address first.',
    }

    return messages[code] || error?.message || 'Something went wrong. Please try again.'
}

export function getRememberedEmail() {
    return localStorage.getItem(REMEMBER_EMAIL_KEY) || ''
}

export function setRememberedEmail(email) {
    localStorage.setItem(REMEMBER_EMAIL_KEY, email)
}

export function clearRememberedEmail() {
    localStorage.removeItem(REMEMBER_EMAIL_KEY)
}

export async function loginWithEmail(email, password, rememberMe) {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)

    try {
        const credential = await signInWithEmailAndPassword(auth, email, password)

        if (rememberMe) {
            setRememberedEmail(email)
        } else {
            clearRememberedEmail()
        }

        return credential.user
    } catch (error) {
        throw new Error(mapAuthError(error))
    }
}

export async function loginWithGoogle() {
    try {
        const credential = await signInWithPopup(auth, googleProvider)
        return credential.user
    } catch (error) {
        throw new Error(mapAuthError(error))
    }
}

export async function loginWithApple() {
    try {
        const credential = await signInWithPopup(auth, appleProvider)
        return credential.user
    } catch (error) {
        throw new Error(mapAuthError(error))
    }
}

export async function loginWithMicrosoft() {
    try {
        const credential = await signInWithPopup(auth, microsoftProvider)
        return credential.user
    } catch (error) {
        throw new Error(mapAuthError(error))
    }
}

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        throw new Error(mapAuthError(error))
    }
}

export async function logout() {
    await signOut(auth)
}

export function subscribeToAuthChanges(callback) {
    return onAuthStateChanged(auth, callback)
}

export function serializeUser(user) {
    if (!user) {
        return null
    }

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    }
}
