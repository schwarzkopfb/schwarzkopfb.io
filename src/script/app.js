const DEFAULT_THEME = 'red'
const MENU_HEIGHT = 100

import skrollr from './skrollr'
import labels from '../../content/site'

function getLabels() {
    const result = { menu: [] },
          { menu } = result,
          { title, tagline, content, pages, footer } = labels

    let { theme } = labels

    // fallback to default if not specified
    theme = theme || DEFAULT_THEME

    // extract default theme, title, tagline & content
    result.theme = theme
    result.title = title
    result.tagline = tagline
    result.content = content

    // parse menu items & fetch related content
    for (let [ key, value ] of Object.entries(pages)) {
        const item = { title, tagline, content }

        if (typeof value === 'object') {
            // fallback to item key if not specified
            var label = value.label || key,
                // fallback to main theme if not specified
                itemTheme = value.theme || theme,
                // destructure link from item descriptor object
                { link } = value

            // fallback to main title if not specified
            item.title = value.title || title
            // fallback to main tagline if not specified
            item.tagline = value.tagline || tagline

            // fetch page content
            // fallback to item key if not specified
            import(`../../content/pages/${value.content || key}`)
                .then(res => item.content = res.default) // todo: handle error
        }
        else {
            // not specified, so fallback to main theme
            itemTheme = theme
            label = key
            link = value

            // fetch page content
            import(`../../content/pages/${key}`)
                .then(res => item.content = res.default) // todo: handle error
        }

        item.theme = itemTheme
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

        // select first menu item by default
        this.currentMenuItem = this.menu[ 0 ]

        // adjust content layer position to window size
        this.adjustContentTop()

        // maybe we have to reload the whole page here (?) :(
        // because of dynamically generated skrollr attributes
        window.addEventListener('resize', () => this.adjustContentTop())
    }
}