class PageScroll extends HTMLElement {
    constructor() {
        super()
        this.topEl = this.shadowRoot.querySelector('[data-id=top]')
        this._handlePageScroll = this.handlePageScroll.bind(this)
    }

    handlePageScroll () {
        this.topEl.style.opacity = window.scrollY > 200 ? '1' : '0'
    }

    connectedCallback () {
        document.addEventListener('scroll', this._handlePageScroll)
    }

    disconnectedCallback () {
        document.removeEventListener('scroll', this._handlePageScroll)
    }
}

customElements.define('page-scroll', PageScroll)