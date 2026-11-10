export const AVATAR_SIZES = {
    small: 24,
    default: 32,
    large: 40
}

export const AVATAR_VARIANTS = ['blue', 'green', 'orange', 'red']

/**
 * Converts the `size` prop (preset name, number or css length) into a css length.
 */
export function resolveAvatarSize(size, fallback = AVATAR_SIZES.default) {
    if (typeof size === 'number' && Number.isFinite(size)) return `${size}px`

    if (typeof size === 'string') {
        const value = size.trim()

        if (value in AVATAR_SIZES) return `${AVATAR_SIZES[value]}px`
        if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`
        if (value) return value
    }

    return `${fallback}px`
}

/**
 * "Muthu Kumar" -> "MK" | "Muthu" -> "M"
 * Uses one letter per word (unicode safe) up to `max` letters.
 */
export function getInitials(name = '', max = 2) {
    const words = String(name ?? '').trim().split(/\s+/).filter(Boolean)
    const limit = Math.max(1, Number(max) || 2)

    return words
        .slice(0, limit)
        .map(word => Array.from(word)[0])
        .join('')
        .toUpperCase()
}

/**
 * Small stable string hash (djb2) so the same name always gets the same color.
 */
export function hashString(value = '') {
    let hash = 5381

    for (const char of String(value)) {
        hash = ((hash << 5) + hash + char.codePointAt(0)) >>> 0
    }

    return hash
}

export function pickAvatarVariant(seed = '', variants = AVATAR_VARIANTS) {
    if (!seed || !variants.length) return 'gray'

    return variants[hashString(seed) % variants.length]
}

/**
 * Formats badge values: 120 with max 99 -> "99+"
 */
export function formatBadgeValue(value, max = 99) {
    if (typeof value === 'number' && Number.isFinite(max) && value > max) return `${max}+`

    return String(value)
}
