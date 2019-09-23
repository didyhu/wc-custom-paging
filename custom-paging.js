"use strict"

/**
 * @typedef CustomPaging.State
 * @property {number} state.totalElements total elements
 * @property {number} state.pageSize page size
 * @property {number} state.activePage the index of active page
 */

/**
 * @emits action
 */
class CustomPaging extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = this.layout
        this._state = {
            dataArray: [], pageSize: 10, activePage: 0, activeItem: 0
        }
        this.addEventListener("click", event => {
            const target = event.path.find(elem => elem.parentElement == this)
            if (target) {
                const page = Number.parseInt(target.dataset.page)
                this.dispatchEvent(new CustomEvent("action", { detail: { page } }))
            }
        })
    }
    get layout() {
        return `<style>
        :host{
            display: flex;
        }
        ::slotted([data-role=page]){
            text-align: center;
            cursor: pointer;
            margin: 2px;
            padding: 2px;
        }
        ::slotted([data-role=page].active){
            font-weight: bold;
        }
        ::slotted([data-role=page]:hover){
            text-decoration: underline;
        }
        </style>
        <slot></slot>`
    }
    get btn() {
        return page => {
            let left = this.state.activePage - 3,
                right = this.state.activePage + 3
            while (left < 0) {
                left++
                right++
            }
            while (right > this.totalPages - 1) {
                right--
            }
            let text = page + 1
            if (page != 0 && page !== this.totalPages - 1) {
                if (page < left) {
                    return ""
                }
                if (page > right) {
                    return ""
                }
                if (page == left) {
                    text = "..."
                }
                if (page == right) {
                    text = "..."
                }
            }
            return `<div data-role="page" data-page="${page}" class="${page == this.state.activePage ? "active" : ""}">${text}</div>`
        }
    }
    /**
     * @param {CustomPaging.State} state
     */
    set state(state) {
        this._state = state
        this.render()
    }
    get state() {
        return this._state
    }
    get totalPages() {
        return Math.ceil(this.state.totalElements / this.state.pageSize)
    }
    render() {
        let html = ""
        for (let page = 0; page < this.totalPages; page++) {
            html += this.btn(page)
        }
        this.innerHTML = html
    }
}

export { CustomPaging }