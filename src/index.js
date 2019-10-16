'use strict'

import Vue from 'vue'
import app from './views/app'
import router from './script/router'

Vue.use(router)

window.addEventListener('DOMContentLoaded', () => {
    new Vue({ render: h => h(app) }).$mount('#app', true)
})

window.addEventListener('load', () => {
    // hide spinner (but only when we're not in pre-render stage)
    if (typeof renderContext === 'undefined') {
        const el = document.querySelector('#spinner')
        el.classList.add('fade-out')

        setTimeout(function() {
            el.parentNode.removeChild(el)
        }, 500)
    }

    // display welcome message for developers
    console.log(`

Welcome here!

It's an honor for me that you're curious about the source code. 🙃
Did you know that this whole site is open source?

https://github.com/schwarzkopfb/schwarzkopfb.io

    `)
})
