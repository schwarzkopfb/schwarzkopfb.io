const MENU_HEIGHT = 100

import skrollr from './skrollr'
import labels from '../content/site'

function getLabels() {
    const result = { menu: [] },
          { menu } = result,
          { title, tagline, content, pages, footer } = labels

    // extract default title, tagline & content
    result.title = title
    result.tagline = tagline
    result.content = content

    // parse menu items & fetch related content
    for (let [ key, value ] of Object.entries(pages)) {
        const item = { title, tagline, content }

        if (typeof value === 'object') {
            var label = value.label || key,
                { link } = value

            item.title = value.title || title
            item.tagline = value.tagline || tagline

            import(`../content/pages/${value.content || key}`)
                .then(res => item.content = res.default) // todo: handle error
        }
        else {
            label = key
            link = value

            import(`../content/pages/${key}`)
                .then(res => item.content = res.default) // todo: handle error
        }

        item.label = label
        item.link = link

        menu.push(item)
    }

    // extract footer
    result.footer = footer

    return result
}

export default {
    data: () => ({
        currentMenuItem: null,
        skrollr: null,
        ...getLabels()
    }),

    methods: {
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
                // update title, tagline & content by the current menu item
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

        // select first menu item by default
        this.currentMenuItem = this.menu[ 0 ]

        // adjust content layer position to window size
        this.adjustContentTop()

        // maybe we have to reload the whole page here (?) :(
        // because of dynamically generated skrollr attributes
        window.addEventListener('resize', () => this.adjustContentTop())
    }
}
