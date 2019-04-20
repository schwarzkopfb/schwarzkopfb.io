const MENU_HEIGHT = 100

import skrollr from './skrollr'
import content from './content'

import bgLayer from '../views/bg-layer'
import navLink from '../views/nav-link'

export default {
    components: { bgLayer, navLink },

    data: () => ({
        currentMenuItem: null,
        skrollr: null,
        ...content
    }),

    methods: {
        onLinkClick(item) {
            // update UI according to the selected menu item
            // note: `item` should be a string and `goToPage()`
            // returns the related menu item object
            item = this.goToPage(item)

            // update url as well
            history.pushState(item, '', item.link)
        },

        goToPage(menuItem) {
            if (!menuItem)
                menuItem = this.getMenuItemByUrl()
            else if (typeof menuItem === 'string')
                menuItem = this.getMenuItemByLink(menuItem)

            return this.currentMenuItem = menuItem
        },

        getMenuItemByLink(link) {
            return this.menu.find(item => item.link === link)
        },

        getMenuItemByUrl() {
            // pass back the first menu item by default
            return this.getMenuItemByLink(location.pathname) || this.menu[ 0 ]
        },

        adjustContentTop() {
            this.$refs.content.style.marginTop = `${window.innerHeight + MENU_HEIGHT}px`
        },

        getMenuItemDynamicSkrollrAttributes(i) {
            // this is the soul of that 3d twist effect of the menu bar
            return {
                [ `data-${i * 35}` ]: 'top: 20px; opacity: 0; transform: rotateX(-60deg);',
                [ `data-${i * 35 + 400}` ]: 'top: 0px; opacity: 1; transform: rotateX(0deg);'
            }
        }
    },

    watch: {
        currentMenuItem: {
            deep: true,

            handler(item) {
                // update theme, title, tagline & content by the current menu item
                this.theme = item.theme
                this.title = item.title
                this.tagline = item.tagline
                this.content = item.content

                // tell Skrollr about content (and page size) change
                this.$nextTick(() =>
                    this.skrollr.refresh()
                )
            }
        }
    },

    mounted() {
        // initialize Skrollr and store instance
        this.skrollr = skrollr.init({ forceHeight: false })

        // adjust content layer position to window size
        this.adjustContentTop()

        // initial navigation: open the page (if) specified by the url
        this.goToPage()

        // maybe we have to reload the whole page here (?) :(
        // because of dynamically generated skrollr attributes
        window.addEventListener('resize', () => this.adjustContentTop())

        // enable push-state-navigation
        window.addEventListener('popstate', e => this.goToPage(e.state))
    }
}
