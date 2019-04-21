import navLink from '../views/nav-link'

export default {
    install(Vue) {
        let subscribed

        Vue.component('nav-link', navLink)

        Vue.prototype.$router = new Vue({
            data: {
                page: {},
                pages: []
            },

            methods: {
                init(pages) {
                    pages.forEach(p =>
                        p.component = notifyComponentLoaded(p.component, () =>
                            this.$emit('page:mounted')))

                    this.pages = pages

                    // subscribe for url changes (only once)
                    if (!subscribed) {
                        subscribed = true
                        window.addEventListener('popstate', () => this.navigate())
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
            }
        })

        function notifyComponentLoaded(getComp, fn) {
            return () => {
                return getComp().then(comp => {
                    comp = comp.default // es6 module
                    comp.mounted = fn
                    return comp
                })
            }
        }
    }
}
