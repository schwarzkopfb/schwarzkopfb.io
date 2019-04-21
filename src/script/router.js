import navLink from '../views/nav-link'

export default {
    install(Vue) {
        let subscribed

        Vue.component('nav-link', navLink)

        Vue.prototype.$router = Vue.observable({
            page: {},
            pages: [],

            pages(pages) {
                this.pages = pages

                // subscribe for url changes (only once)
                if (!subscribed) {
                    subscribed = true
                    window.addEventListener('popstate', e => this.navigate())
                }

                // go to the page (if) specified by the url
                this.navigate()
            },

            navigate(page) {
                if (!page)
                    page = this.getMenuItemByUrl()
                else
                    page = this.getMenuItemByLink(page)

                this.page = page

                return page.link
            },

            getMenuItemByLink(link) {
                return this.pages.find(item => item.link === link)
            },

            getMenuItemByUrl() {
                // pass back the first page by default
                return this.getMenuItemByLink(location.pathname) || this.pages[ 0 ]
            }
        })
    }
}
