'use strict'

const { resolve } = require('path'),
      { createServer } = require('http'),
      serve = require('serve-handler'),
      port = process.env.PORT || 3000

const opts = {
    public: resolve(__dirname, 'dist'),
    directoryListing: false
}

const app = createServer((req, res) => serve(req, res, opts))

app.listen(port, () => console.log('server is ready to accept connections on port', port))
