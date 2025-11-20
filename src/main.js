import './features/glass-tabs/index.js'
import './features/custom-slider/index.js'
import './features/page-scroll/index.js'

const main = async () => {
    await customElements.whenDefined('glass-tabs')
    const tabsEl = document.getElementById('main-tabs')

    const url = new URL(window.location.href)
    if (url.searchParams.has('tab')) {
        const tab = url.searchParams.get('tab')
        tabsEl.setAttribute('active-tab', tab)
    }

    tabsEl.addEventListener('change', (e) => {
        if (!e.detail) return

        const { value } = e.detail

        const url = new URL(window.location.href)
        url.searchParams.set('tab', value)
        window.history.replaceState({}, '', url)
        tabsEl.scrollIntoView({
            behavior: "smooth",
        });
    })
}

document.addEventListener('DOMContentLoaded', main)