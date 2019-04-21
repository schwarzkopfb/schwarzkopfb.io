import Vue from 'vue'

import navLink from '../views/nav-link'

const router = {
    data() {
        return {
            page: {},
            pages: []
        }
    },

    methods: {
        init(pages) {
            pages.forEach(p =>
                p.component = notifyComponentLoaded(p.component, () =>
                    this.$emit('page:mounted')))

            this.pages = pages

            // subscribe for url changes
            window.addEventListener('popstate', () => this.navigate())

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
}

function notifyComponentLoaded(getComp, fn) {
    return () => {
        return getComp().then(comp => {
            comp = comp.default // es6 module
            comp.mounted = fn
            return comp
        })
    }
}

const Router = Vue.extend({ mixins: [ router ] })

function install(Vue) {
    Vue.component('nav-link', navLink)
    Vue.prototype.$router = new Router
}

export default { install, Router }
