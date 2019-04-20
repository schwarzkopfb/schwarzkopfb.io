'use strict'

const { resolve } = require('path'),
      express = require('express'),
      app = express(),
      port = process.env.PORT || 3000

function serve(res, ...paths) {
    res.sendFile(resolve(__dirname, ...paths))
}

function serveAssets(...paths) {
    return express.static(resolve(__dirname, ...paths))
}

app.use(serveAssets('dist'))
app.use(serveAssets('static'))

app.get('/:page', (req, res) => serve(res, 'dist', 'index.html'))

app.all('*', (req, res) => res.redirect('/404'))

app.listen(port, () => console.log('server is ready to accept connections on port ' + port))
