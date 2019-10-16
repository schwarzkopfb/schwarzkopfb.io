'use strict'

import Vue from 'vue'
import app from './views/app'
import router from './script/router'

Vue.use(router)

new Vue({ render: h => h(app) }).$mount('#app', true)

window.addEventListener('load', () => {
    console.log(`

Welcome here!

It's an honor for me that you're curious about the source code. 🙃
Did you know that this whole site is open source?

https://github.com/schwarzkopfb/schwarzkopfb.io

    `)
})
