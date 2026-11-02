import { reactive } from 'vue'

const TOAST_TYPES = ['success', 'warning', 'info', 'error']
const DEFAULT_DURATION = 3000

export const toasts = reactive([])

let seed = 0

function normalizeToast(params) {
    const options = typeof params === 'string' ? { message: params } : { ...params }
    const duration = Number.isFinite(options.duration) ? options.duration : DEFAULT_DURATION
    const type = TOAST_TYPES.includes(options.type) ? options.type : 'info'

    return {
        id: ++seed,
        message: options.message == null ? '' : String(options.message),
        type,
        duration,
        showClose: typeof options.showClose === 'boolean' ? options.showClose : duration === 0,
        onClose: typeof options.onClose === 'function' ? options.onClose : null,
        timer: null,
    }
}

function clearTimer(toast) {
    if (!toast.timer) return

    clearTimeout(toast.timer)
    toast.timer = null
}

function scheduleClose(toast) {
    clearTimer(toast)

    if (toast.duration <= 0) return

    toast.timer = setTimeout(() => {
        closeToast(toast.id)
    }, toast.duration)
}

export function pauseToast(id) {
    const toast = toasts.find((item) => item.id === id)
    if (toast) clearTimer(toast)
}

export function resumeToast(id) {
    const toast = toasts.find((item) => item.id === id)
    if (toast) scheduleClose(toast)
}

export function closeToast(id) {
    const index = toasts.findIndex((item) => item.id === id)
    if (index === -1) return

    const [toast] = toasts.splice(index, 1)
    clearTimer(toast)
    toast.onClose?.()
}

function closeAll() {
    ;[...toasts].forEach((toast) => closeToast(toast.id))
}

function mToast(params = {}) {
    const toast = normalizeToast(params)

    toasts.push(toast)
    scheduleClose(toast)

    return {
        close: () => closeToast(toast.id),
    }
}

TOAST_TYPES.forEach((type) => {
    mToast[type] = (params = {}) => {
        const options = typeof params === 'string' ? { message: params } : params
        return mToast({ ...options, type })
    }
})

mToast.closeAll = closeAll

export default mToast
