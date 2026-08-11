<script setup>
    import { useRouter } from 'vue-router'

    import MButton from '@/components/ui/buttons/MButton.vue'

    const router = useRouter()

    function goHome() {
        router.push('/')
    }

    function goBack() {
        router.back()
    }
</script>

<template>
    <div class="not-found-page">
        <main class="not-found-page__card" aria-labelledby="not-found-title">
            <div class="not-found-page__content">
                <p class="not-found-page__eyebrow">Error 404</p>
                <h1 id="not-found-title" class="not-found-page__title">Page not found</h1>
                <p class="not-found-page__description">
                    The page you requested could not be found. It may have moved or no longer exists.
                </p>

                <div class="not-found-page__actions d-flx g-12">
                    <MButton variant="primary" @click="goHome">
                        <span class="d-flx aI-C g-8">
                            <i class="bi bi-house-door" aria-hidden="true"></i>
                            <span>Go to dashboard</span>
                        </span>
                    </MButton>

                    <MButton variant="secondary" @click="goBack">
                        <span class="d-flx aI-C g-8">
                            <i class="bi bi-arrow-left" aria-hidden="true"></i>
                            <span>Go back</span>
                        </span>
                    </MButton>
                </div>
            </div>

            <div class="not-found-page__illustration" aria-hidden="true">
                <svg viewBox="0 0 240 240" fill="none">
                    <circle cx="120" cy="120" r="104" stroke="currentColor" stroke-width="2" opacity="0.16" />
                    <path d="M94 76h52c10.5 0 19 8.5 19 19v50c0 10.5-8.5 19-19 19h-52c-10.5 0-19-8.5-19-19V95c0-10.5 8.5-19 19-19Z" stroke="currentColor" stroke-width="2" opacity="0.42" />
                    <path d="M110 102h20" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M110 126h20" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M104 148h32" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M120 60v24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M90 90l-16-16" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M150 90l16-16" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                </svg>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
    .not-found-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 24px;
        background: linear-gradient(135deg, var(--c-gray-98) 0%, var(--c-gray-95) 100%);
    }

    .not-found-page__card {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
        gap: 40px;
        align-items: center;
        width: min(100%, 980px);
        padding: 40px;
        background-color: var(--c-white);
        border: 1px solid var(--c-border-default);
        border-radius: 24px;
        box-shadow: var(--c-shadow-lg);

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 24px;
        }
    }

    .not-found-page__content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .not-found-page__eyebrow {
        margin: 0;
        color: var(--c-app-theme);
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .not-found-page__title {
        margin: 0;
        color: var(--c-text-primary);
        font-size: clamp(2rem, 3.4vw, 3rem);
        font-weight: 700;
        line-height: 1.1;
    }

    .not-found-page__description {
        margin: 0;
        color: var(--c-text-secondary);
        font-size: 1rem;
        line-height: 1.7;
        max-width: 560px;
    }

    .not-found-page__actions {
        margin-top: 8px;
        flex-wrap: wrap;
    }

    .not-found-page__illustration {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--c-app-theme);

        svg {
            width: min(100%, 280px);
            height: auto;
            opacity: 0.95;
            animation: float 3.2s ease-in-out infinite;
        }
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-12px);
        }
    }
</style>
