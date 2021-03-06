const MENU_HEIGHT = 100

import Vue from 'vue'

import skrollr from './skrollr'
import content from './content'

import bgLayer from '../views/bg-layer'
import scrollDown from '../views/scroll-down'

export default {
    components: { bgLayer, scrollDown },

    data: () => ({
        contentTop: 0,
        content,
        menuItems: content.pages.filter(p => !p.hidden)
    }),

    methods: {
        adjustContentTop() {
            this.contentTop = window.innerHeight + MENU_HEIGHT  + 'px'
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
        this.$router.init(content.pages)
        this.$router.$on('page:mounted', () => this.$skrollr.refresh())
    },

    mounted() {
        // initialize Skrollr and store instance
        Vue.prototype.$skrollr = skrollr.init({ 
            forceHeight: false,
            skrollrBody: 'main'
        })

        // adjust content layer position to window size
        this.adjustContentTop()

        // maybe we have to reload the whole page here (?) :(
        // because of dynamically generated skrollr attributes
        window.addEventListener('resize', () => this.adjustContentTop())
    }
}
