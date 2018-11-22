'use strict'

const { resolve } = require('path'),
      express = require('express'),
      app = express(),
      port = process.env.PORT || 3000

function serve(res, ...paths) {
    res.sendFile(resolve(__dirname, 'public', ...paths))
}

app.use(express.static(resolve(__dirname, 'public')))

//app.get('/:page', (req, res) => serve(res, 'index.html'))

app.get('/content/:page', (req, res) => serve(res, 'assets', 'content', req.params.page + '.html'))

app.all('*', (req, res) => res.redirect('/'))

app.listen(port, () => console.log('server is ready to accept connections on port ' + port))
