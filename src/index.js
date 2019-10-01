'use strict'

import Vue from 'vue'
import app from './views/app'
import router from './script/router'
import onload from './script/onload'

Vue.use(router)

new Vue({
    el: '#app',
    render: h => h(app)
})

onload(() => {
    console.log(`

Welcome here!

It's an honor for me that you're curious about the source code. 🙃
Did you know that this whole site is open source?

https://github.com/schwarzkopfb/schwarzkopfb.io

    `)
})
