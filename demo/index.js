import { CustomPaging } from "../custom-paging.js"
customElements.define("custom-paging", CustomPaging)

const elems = {
    /**
     * @returns {CustomPaging}
     **/
    get paging1() {
        return document.querySelector(`#paging1`)
    },
    /**
     * @returns {CustomPaging}
     **/
    get paging2() {
        return document.querySelector(`#paging2`)
    },
    /**
     * @returns {CustomPaging}
     **/
    get paging3() {
        return document.querySelector(`#paging3`)
    },
}
const state = {
    /**
     * @type {CustomPaging.State}
     */
    set paging1(paging) {
        elems.paging1.state = paging
    },
    get paging1() {
        return elems.paging1.state
    },
    /**
     * @type {CustomPaging.State}
     */
    set paging2(paging) {
        elems.paging2.state = paging
    },
    get paging2() {
        return elems.paging2.state
    },
    /**
     * @type {CustomPaging.State}
     */
    set paging3(paging) {
        elems.paging3.state = paging
    },
    get paging3() {
        return elems.paging3.state
    },
}
elems.paging1.addEventListener("action", event => {
    const { page } = event.detail
    // Do something...
    state.paging1 = { ...state.paging1, activePage: page }
})
state.paging1 = { ...state.paging1, totalElements: 10*100 }

elems.paging2.addEventListener("action", event => {
    const { page } = event.detail
    // Do something...
    state.paging2 = { ...state.paging2, activePage: page }
})
state.paging2 = { ...state.paging2, totalElements: 10*3 }

elems.paging3.addEventListener("action", event => {
    const { page } = event.detail
    // Do something...
    state.paging3 = { ...state.paging3, activePage: page }
})
state.paging3 = { ...state.paging3, totalElements: 10*5 }