class CustomSlider extends HTMLElement {
    constructor() {
        super();

        this.slidesEl = this.shadowRoot.querySelector('[data-id=slides]')
    }

    get deltaX () {
        return this.hasAttribute('delta-x') ? Number(this.getAttribute('delta-x')) : 100
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('click', e => {
            const { target } = e
            const controlEl = target.closest('[data-control]')
            if (!controlEl) {
                return
            }
            const { control } = controlEl.dataset
            if (control === 'next') {
                this.#handleMove(this.deltaX)
            } else if (control === 'prev') {
                this.#handleMove(-this.deltaX)
            } else {
                console.error('Invalid control value')
            }
        })
    }

    #handleMove(diff) {
        this.slidesEl.scrollTo({ behavior: "smooth", left: this.slidesEl.scrollLeft + diff })
    }
}

customElements.define('custom-slider', CustomSlider)