'use strict'

const { resolve } = require('path'),
      express = require('express'),
      app = express(),
      port = process.env.PORT || 3000

function serve(res, ...paths) {
    res.sendFile(resolve(__dirname, 'public', ...paths))
}

function serveAssets(path) {
    return express.static(resolve(__dirname, path))
}

app.use(serveAssets('dist'))
app.use(serveAssets('static'))

//app.get('/:page', (req, res) => serve(res, 'index.html'))

app.get('/content/:page', (req, res) => serve(res, 'assets', 'content', req.params.page + '.html'))

// app.all('*', (req, res) => res.redirect('/'))

app.listen(port, () => console.log('server is ready to accept connections on port ' + port))
