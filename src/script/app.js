const MENU_HEIGHT = 100

import skrollr from './skrollr'
import content from './content'

import bgLayer from '../views/bg-layer'

export default {
    components: { bgLayer },

    data: () => ({
        skrollr: null,
        content
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

    created() {
        this.$router.pages(content.pages)
    },

    mounted() {
        // initialize Skrollr and store instance
        this.skrollr = skrollr.init({ forceHeight: false })

        // adjust content layer position to window size
        this.adjustContentTop()

        // maybe we have to reload the whole page here (?) :(
        // because of dynamically generated skrollr attributes
        window.addEventListener('resize', () => this.adjustContentTop())
    }
}
