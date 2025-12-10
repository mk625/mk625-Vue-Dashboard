
export default {
    beforeMount(el) {
        el.style.overflow = 'hidden'
        el.style.height = '0'
        el.style.opacity = '0'
    },
    updated(el, binding) {
        const isOpen = binding.value
        const fullHeight = el.scrollHeight

        el.style.transition = 'height 0.3s ease, opacity 0.3s ease'

        if (isOpen) {
            el.style.height = fullHeight + 'px'
            el.style.opacity = '1'

            const after = () => {
                el.style.height = 'auto'
                el.removeEventListener('transitionend', after)
            }
            el.addEventListener('transitionend', after)
        } else {
            el.style.height = el.scrollHeight + 'px'

            requestAnimationFrame(() => {
                el.style.height = '0'
                el.style.opacity = '0'
            })
        }
    },
}
