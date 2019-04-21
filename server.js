'use strict'

const { resolve } = require('path'),
      fs = require('fs'),
      express = require('express'),
      yaml = require('yaml'),
      app = express(),
      port = process.env.PORT || 3000,
      { pages } = yaml.parse(fs.readFileSync(resolve(__dirname, 'content', 'site.yml'), 'utf8'))

function serve(res, ...paths) {
    res.sendFile(resolve(__dirname, ...paths))
}

function serveAssets(...paths) {
    return express.static(resolve(__dirname, ...paths))
}

app.use(serveAssets('dist'))
app.use(serveAssets('static'))

app.get('/:page', (req, res, next) => {
    if (req.params.page in pages)
        serve(res, 'dist', 'index.html')
    else
        next()
})

app.all('*', (req, res) => res.redirect('/404'))

app.listen(port, () => console.log('server is ready to accept connections on port ' + port))
