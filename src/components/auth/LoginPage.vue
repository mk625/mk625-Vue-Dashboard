<script setup>
    // imports
        import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
        import { useRoute, useRouter } from 'vue-router'

        import MButton from '@/components/ui/buttons/MButton.vue'
        import MInput from '@/components/ui/input/MInput.vue'
        import MInputError from '@/components/ui/input/MInputError.vue'
        import MInputLabel from '@/components/ui/input/MInputLabel.vue'
        import ToastPop from '@/components/ui/popup/toast/ToastPop.vue'
        import favIcon from '@/assets/images/favicon/fav-icon.png'
        import { getRememberedEmail } from '@/js/services/authService.js'
        import { useAuthStore } from '@/stores/authStore.js'
    // \\\ imports

    // global variables
        const route = useRoute()
        const router = useRouter()
        const authStore = useAuthStore()

        const email = ref(getRememberedEmail())
        const password = ref('')
        const rememberMe = ref(Boolean(getRememberedEmail()))
        const showPassword = ref(false)
        const emailError = ref('')
        const passwordError = ref('')
        const formError = ref('')
        const showToast = ref(false)
        const toastMessage = ref('')
        const activeSlide = ref(0)
        let slideTimer = null

        const socialProviders = [
            { id: 'google', label: 'Google', icon: 'bi-google' },
            { id: 'apple', label: 'Apple', icon: 'bi-apple' },
            { id: 'microsoft', label: 'Microsoft', icon: 'bi-microsoft' },
        ]

        const showcaseSlides = [
            {
                titleBefore: 'Write Better ',
                titleAccent: 'Everywhere',
                description: 'Compatible with',
                descriptionStrong: ' Gmail, Outlook Web, LinkedIn ',
                descriptionMid: 'and most web',
                descriptionEm: ' editors ',
                descriptionAfter: 'for a smooth writing experience anywhere online.',
            },
            {
                titleBefore: 'Stay Productive ',
                titleAccent: 'Anywhere',
                description: 'Manage people, payroll, and performance from one',
                descriptionStrong: ' unified dashboard ',
                descriptionMid: 'built for',
                descriptionEm: ' modern teams ',
                descriptionAfter: 'that move fast.',
            },
            {
                titleBefore: 'Collaborate ',
                titleAccent: 'Seamlessly',
                description: 'Keep attendance, reports, and employee records',
                descriptionStrong: ' in sync ',
                descriptionMid: 'so every decision is backed by',
                descriptionEm: ' clear data ',
                descriptionAfter: 'when you need it.',
            },
        ]

        const orbitApps = [
            { id: 'chrome', icon: 'bi-browser-chrome', label: 'Chrome' },
            { id: 'android', icon: 'bi-android2', label: 'Android' },
            { id: 'edge', icon: 'bi-browser-edge', label: 'Edge' },
            { id: 'outlook', icon: 'bi-envelope', label: 'Outlook' },
            { id: 'messenger', icon: 'bi-chat-dots-fill', label: 'Messenger' },
            { id: 'apple', icon: 'bi-apple', label: 'Apple' },
            { id: 'linkedin', icon: 'bi-linkedin', label: 'LinkedIn' },
            { id: 'yahoo', icon: 'bi-globe2', label: 'Yahoo' },
        ]

        const currentSlide = computed(() => showcaseSlides[activeSlide.value])
        const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'))
        const passwordToggleIcon = computed(() =>
            showPassword.value ? 'bi-eye' : 'bi-eye-slash'
        )
        const passwordToggleLabel = computed(() =>
            showPassword.value ? 'Hide password' : 'Show password'
        )
    // \\\ global variables


    // methods
        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        }

        function validateForm() {
            emailError.value = ''
            passwordError.value = ''
            formError.value = ''

            const trimmedEmail = email.value.trim()

            if (!trimmedEmail) {
                emailError.value = 'Email is required'
            } else if (!isValidEmail(trimmedEmail)) {
                emailError.value = 'Please enter a valid email address'
            }

            if (!password.value) {
                passwordError.value = 'Password is required'
            } else if (password.value.length < 6) {
                passwordError.value = 'Password must be at least 6 characters'
            }

            return !emailError.value && !passwordError.value
        }

        function openToast(message) {
            toastMessage.value = message
            showToast.value = true
        }

        async function handleLogin() {
            if (authStore.isLoading || !validateForm()) {
                return
            }

            try {
                await authStore.login(email.value.trim().toLowerCase(), password.value, rememberMe.value)
                openToast('Logged in successfully')
                const redirectPath =
                    typeof route.query.redirect === 'string' ? route.query.redirect : '/'
                await router.push(redirectPath)
            } catch (error) {
                formError.value = error.message
            }
        }

        async function handleForgotPassword() {
            const trimmedEmail = email.value.trim().toLowerCase()

            emailError.value = ''
            formError.value = ''

            if (!trimmedEmail) {
                emailError.value = 'Enter your email to reset your password'
                return
            }

            if (!isValidEmail(trimmedEmail)) {
                emailError.value = 'Please enter a valid email address'
                return
            }

            try {
                await authStore.forgotPassword(trimmedEmail)
                openToast('Password reset email sent')
            } catch (error) {
                formError.value = error.message
            }
        }

        async function handleSocialLogin(providerId) {
            if (authStore.isLoading) {
                return
            }

            formError.value = ''

            try {
                await authStore.loginSocial(providerId)
                openToast(`Signed in with ${providerId}`)
                const redirectPath =
                    typeof route.query.redirect === 'string' ? route.query.redirect : '/'
                await router.push(redirectPath)
            } catch (error) {
                formError.value = error.message
            }
        }

        function togglePasswordVisibility() {
            showPassword.value = !showPassword.value
        }

        function setSlide(index) {
            activeSlide.value = index
            restartSlideTimer()
        }

        function nextSlide() {
            activeSlide.value = (activeSlide.value + 1) % showcaseSlides.length
        }

        function restartSlideTimer() {
            if (slideTimer) {
                clearInterval(slideTimer)
            }

            slideTimer = setInterval(nextSlide, 5000)
        }
    // \\\ methods


    // lifecycle
        onMounted(() => {
            restartSlideTimer()
        })

        onBeforeUnmount(() => {
            if (slideTimer) {
                clearInterval(slideTimer)
            }
        })
    // \\\ lifecycle
</script>


<template>
    <div class="login-page">
        <div class="login-page__card">
            <!-- form column -->
            <main class="login-page__form-col">
                <div class="login-page__brand d-flx aI-C g-10">
                    <img class="login-page__brand-logo" :src="favIcon" alt="Dashboard logo" />
                    <span class="login-page__brand-name fw-sbold">MK Dashboard</span>
                </div>

                <div class="login-page__form-body">
                    <div class="login-page__intro d-flx fD-C aI-C g-12">
                        <div class="login-page__intro-icon" aria-hidden="true">
                            <i class="bi bi-box-arrow-in-right f22"></i>
                        </div>
                        <div class="login-page__intro-copy d-flx fD-C aI-C g-6">
                            <h1 class="login-page__title fw-sbold">Login to your account!</h1>
                            <p class="login-page__subtitle">
                                Enter your registered email address and password to login!
                            </p>
                        </div>
                    </div>

                    <form class="login-page__form d-flx fD-C g-18" @submit.prevent="handleLogin">
                        <div class="login-page__field d-flx fD-C g-6">
                            <MInputLabel label_name="Email" html_for="login-email" />
                            <MInput
                                v-model="email"
                                input_id="login-email"
                                type="email"
                                placeholder="eg. pixelcot@gmail.com"
                                pre_icon="bi-envelope"
                                autocomplete="email"
                                :aria_invalid="Boolean(emailError)"
                            />
                            <MInputError :isError="Boolean(emailError)" :error_message="emailError" />
                        </div>

                        <div class="login-page__field d-flx fD-C g-6">
                            <MInputLabel label_name="Password" html_for="login-password" />
                            <MInput
                                v-model="password"
                                input_id="login-password"
                                :type="passwordInputType"
                                placeholder="Enter your password"
                                pre_icon="bi-lock"
                                autocomplete="current-password"
                                :aria_invalid="Boolean(passwordError)"
                            >
                                <template #suffix>
                                    <button
                                        class="login-page__password-toggle"
                                        type="button"
                                        :aria-label="passwordToggleLabel"
                                        @click="togglePasswordVisibility"
                                    >
                                        <i :class="['bi', passwordToggleIcon]" aria-hidden="true"></i>
                                    </button>
                                </template>
                            </MInput>
                            <MInputError
                                :isError="Boolean(passwordError)"
                                :error_message="passwordError"
                            />
                        </div>

                        <div class="login-page__options d-flx aI-C jC-SB g-12">
                            <label class="login-page__remember d-flx aI-C g-8">
                                <input
                                    v-model="rememberMe"
                                    class="login-page__checkbox"
                                    type="checkbox"
                                />
                                <span class="login-page__remember-text">Remember me</span>
                            </label>

                            <button
                                class="login-page__forgot"
                                type="button"
                                @click="handleForgotPassword"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <p v-if="formError" class="login-page__form-error" role="alert">
                            {{ formError }}
                        </p>

                        <MButton
                            type="submit"
                            variant="primary"
                            btn_view="loader"
                            :isLoading="authStore.isLoading"
                        >
                            Login
                        </MButton>
                    </form>

                    <div class="login-page__divider d-flx aI-C g-12">
                        <span class="login-page__divider-line" aria-hidden="true"></span>
                        <span class="login-page__divider-text">Or login with</span>
                        <span class="login-page__divider-line" aria-hidden="true"></span>
                    </div>

                    <div class="login-page__social d-flx aI-C g-12">
                        <button
                            v-for="provider in socialProviders"
                            :key="provider.id"
                            class="login-page__social-btn"
                            type="button"
                            :aria-label="`Continue with ${provider.label}`"
                            :disabled="authStore.isLoading"
                            @click="handleSocialLogin(provider.id)"
                        >
                            <i :class="['bi', provider.icon, 'f18']" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </main>
            <!-- \\\ form column -->

            <!-- showcase column -->
            <aside class="login-page__showcase" aria-label="Product highlights">
                <div class="login-page__showcase-inner d-flx fD-C aI-C jC-SB">
                    <h2 class="login-page__showcase-title fw-sbold">
                        <span>{{ currentSlide.titleBefore }}</span>
                        <span class="login-page__showcase-accent">{{ currentSlide.titleAccent }}</span>
                    </h2>

                    <div class="login-page__orbit" aria-hidden="true">
                        <span class="login-page__orbit-ring login-page__orbit-ring--1"></span>
                        <span class="login-page__orbit-ring login-page__orbit-ring--2"></span>
                        <span class="login-page__orbit-ring login-page__orbit-ring--3"></span>

                        <div class="login-page__orbit-core">
                            <span class="login-page__orbit-mark fw-bold">P</span>
                        </div>

                        <div
                            v-for="app in orbitApps"
                            :key="app.id"
                            :class="['login-page__orbit-app', `login-page__orbit-app--${app.id}`]"
                            :title="app.label"
                        >
                            <i :class="['bi', app.icon]"></i>
                        </div>
                    </div>

                    <p class="login-page__showcase-copy">
                        <span>{{ currentSlide.description }}</span>
                        <strong>{{ currentSlide.descriptionStrong }}</strong>
                        <span>{{ currentSlide.descriptionMid }}</span>
                        <em>{{ currentSlide.descriptionEm }}</em>
                        <span>{{ currentSlide.descriptionAfter }}</span>
                    </p>

                    <div class="login-page__dots d-flx aI-C jC-C g-8" role="tablist" aria-label="Showcase slides">
                        <button
                            v-for="(slide, index) in showcaseSlides"
                            :key="slide.titleAccent"
                            class="login-page__dot"
                            type="button"
                            role="tab"
                            :class="{ 'login-page__dot--active': index === activeSlide }"
                            :aria-selected="index === activeSlide"
                            :aria-label="`Show slide ${index + 1}`"
                            @click="setSlide(index)"
                        ></button>
                    </div>
                </div>
            </aside>
            <!-- \\\ showcase column -->
        </div>

        <ToastPop v-model:show="showToast" :message="toastMessage" />
    </div>
</template>


<style scoped lang="scss">
    .login-page {
        /* login-only tokens */
            --login-page-bg: #f4f0f2;
            --login-card-shadow:
                0 8px 30px oklch(0% 0 0 / 0.06),
                0 2px 8px oklch(0% 0 0 / 0.04);
            --login-showcase-bg: #eaf3ff;
            --login-showcase-bg-end: #f5f9ff;
            --login-orbit: oklch(70% 0.04 250 / 0.35);
            --login-accent-text: #1a56db;
            --login-input-h: 44px;
            --login-input-radius: 10px;
            --login-card-radius: 24px;
            --login-showcase-radius: 20px;
        /* \\\ login-only tokens */

        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        padding: 24px;
        background:
            radial-gradient(circle at 12% 18%, oklch(92% 0.03 20 / 0.9), transparent 42%),
            radial-gradient(circle at 88% 78%, oklch(90% 0.04 250 / 0.55), transparent 40%),
            var(--login-page-bg);
        overflow: auto;
    }

    .login-page__card {
        display: grid;
        grid-template-columns: minmax(320px, 460px) minmax(300px, 1fr);
        width: min(980px, 100%);
        min-height: 640px;
        background-color: var(--c-white);
        border-radius: var(--login-card-radius);
        box-shadow: var(--login-card-shadow);
        overflow: hidden;
    }

    .login-page__form-col {
        display: flex;
        flex-direction: column;
        padding: 28px 40px 36px;
    }

    .login-page__brand-logo {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }

    .login-page__brand-name {
        font-size: 15px;
        color: var(--c-text-primary);
    }

    .login-page__form-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        width: 100%;
        max-width: 360px;
        margin-inline: auto;
        gap: 28px;
    }

    .login-page__intro-icon {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        background:
            linear-gradient(180deg, oklch(96% 0.02 250 / 0.9), transparent),
            var(--c-app-theme__shade-80);
        color: var(--c-app-theme);
        border-radius: 14px;
        box-shadow: inset 0 0 0 1px oklch(70% 0.05 250 / 0.12);
    }

    .login-page__title {
        font-size: 24px;
        color: var(--c-text-primary);
        text-align: center;
        line-height: 1.25;
    }

    .login-page__subtitle {
        max-width: 280px;
        font-size: 13px;
        color: var(--c-text-secondary);
        text-align: center;
        line-height: 1.5;
    }

    .login-page__form {
        --h-input: var(--login-input-h);
        --br-radius-input: var(--login-input-radius);
    }

    .login-page__form :deep(.input-box) {
        max-width: none;
    }

    .login-page__form :deep(.m-btn) {
        width: 100%;
    }

    .login-page__password-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background: transparent;
        color: var(--c-gray-50);
        border: none;
        cursor: pointer;
    }

    .login-page__password-toggle:hover,
    .login-page__password-toggle:focus-visible {
        color: var(--c-text-primary);
    }

    .login-page__remember-text {
        font-size: 13px;
        color: var(--c-text-secondary);
    }

    .login-page__checkbox {
        width: 16px;
        height: 16px;
        accent-color: var(--c-app-theme);
        cursor: pointer;
    }

    .login-page__forgot {
        padding: 0;
        background: transparent;
        font-size: 13px;
        font-weight: var(--fw-medium);
        color: var(--c-link);
        border: none;
        cursor: pointer;
    }

    .login-page__forgot:hover,
    .login-page__forgot:focus-visible {
        text-decoration: underline;
    }

    .login-page__form-error {
        font-size: 13px;
        color: var(--c-status__red);
    }

    .login-page__divider-line {
        flex: 1;
        height: 1px;
        background-color: var(--c-border-default);
    }

    .login-page__divider-text {
        font-size: 12px;
        color: var(--c-text-tertiary);
        white-space: nowrap;
    }

    .login-page__social-btn {
        display: inline-flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: var(--login-input-h);
        background-color: var(--c-white);
        color: var(--c-text-primary);
        border: 1px solid var(--c-border-default);
        border-radius: var(--login-input-radius);
        cursor: pointer;
        transition: var(--fast-trans);
    }

    .login-page__social-btn:hover:not(:disabled),
    .login-page__social-btn:focus-visible {
        border-color: var(--c-gray-70);
        box-shadow: var(--input-box-shad-hov);
    }

    .login-page__social-btn:disabled {
        opacity: 0.65;
        cursor: not-allowed;
    }

    .login-page__showcase {
        padding: 18px;
        background-color: var(--c-white);
    }

    .login-page__showcase-inner {
        height: 100%;
        min-height: 560px;
        padding: 36px 28px 28px;
        background:
            linear-gradient(180deg, var(--login-showcase-bg), var(--login-showcase-bg-end));
        border-radius: var(--login-showcase-radius);
    }

    .login-page__showcase-title {
        max-width: 320px;
        font-size: 28px;
        color: var(--c-text-primary);
        text-align: center;
        line-height: 1.25;
    }

    .login-page__showcase-accent {
        color: var(--login-accent-text);
    }

    .login-page__orbit {
        width: min(320px, 100%);
        aspect-ratio: 1;
        position: relative;
    }

    .login-page__orbit-ring {
        border: 1px solid var(--login-orbit);
        border-radius: 50%;
        position: absolute;
        inset: 18%;
    }

    .login-page__orbit-ring--2 {
        inset: 10%;
    }

    .login-page__orbit-ring--3 {
        inset: 2%;
    }

    .login-page__orbit-core {
        display: grid;
        place-items: center;
        width: 72px;
        height: 72px;
        background: linear-gradient(160deg, var(--c-app-theme), color-mix(in oklab, var(--c-app-theme), black 18%));
        color: var(--c-white);
        border-radius: 50%;
        box-shadow: var(--c-shadow);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login-page__orbit-mark {
        font-size: 30px;
        line-height: 1;
    }

    .login-page__orbit-app {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        background-color: var(--c-white);
        color: var(--c-app-theme);
        border-radius: 12px;
        box-shadow: var(--c-shadow-sm);
        position: absolute;
        transform: translate(-50%, -50%);
    }

    .login-page__orbit-app--chrome {
        top: 8%;
        left: 50%;
    }

    .login-page__orbit-app--android {
        top: 22%;
        left: 82%;
    }

    .login-page__orbit-app--edge {
        top: 50%;
        left: 94%;
    }

    .login-page__orbit-app--outlook {
        top: 78%;
        left: 82%;
    }

    .login-page__orbit-app--messenger {
        top: 92%;
        left: 50%;
    }

    .login-page__orbit-app--apple {
        top: 78%;
        left: 18%;
    }

    .login-page__orbit-app--linkedin {
        top: 50%;
        left: 6%;
    }

    .login-page__orbit-app--yahoo {
        top: 22%;
        left: 18%;
    }

    .login-page__showcase-copy {
        max-width: 340px;
        font-size: 14px;
        color: var(--c-text-secondary);
        text-align: center;
        line-height: 1.6;
    }

    .login-page__dot {
        width: 8px;
        height: 8px;
        padding: 0;
        background-color: var(--c-gray-80);
        border: none;
        border-radius: 999px;
        cursor: pointer;
        transition: var(--fast-trans);
    }

    .login-page__dot--active {
        width: 28px;
        background-color: var(--c-app-theme);
    }

    @media (max-width: 900px) {
        .login-page__card {
            grid-template-columns: 1fr;
            min-height: auto;
        }

        .login-page__showcase {
            display: none;
        }

        .login-page__form-col {
            padding: 24px 20px 28px;
        }
    }
</style>
