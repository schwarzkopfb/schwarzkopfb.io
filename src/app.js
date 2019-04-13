'use strict'

import Vue from 'vue'
import App from './app'
import skrollr from './skrollr'

new Vue({
    el: '#app',
    render: h => h(App),

    mounted() {
        const s = skrollr.init({ forceHeight: false })
    }
})

console.log(`

Welcome here!
I'm honored that you're curious about the source code. 🙃
Did you know that this whole site is open source?
https://github.com/schwarzkopfb/schwarzkopfb.io

`)
