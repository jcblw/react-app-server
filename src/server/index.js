'use strict'

import express from 'express'
import browserify from 'browserify'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
// this is just a temp way to see this working
import {App} from '../components/App'

function startApp (config = {}) {
  const app = express()
  const port = config.PORT || 3000

  app.get('/', (req, res) => {
    // do a fetch hear to get props
    const {count} = req.query
    const props = {count}
    const Component = getComponent()

    if (!Component) {
      res
        .status(404)
        .send('404 not found')
    }
    const html = ReactDOMServer.renderToStaticMarkup(
      <html>
        <head>
          <title>My Awesome Serverside Rendered Component</title>
          <meta charSet='utf8' />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(<Component {...props} />)
          }} />
          <script src='/js/app.js' />
          <script dangerouslySetInnerHTML={{
            __html: `
              var app = require('app')
              app(${safeStringify(props)})
            `
          }} />
        </body>
      </html>
    )

    res.send(`<!doctype html>${html}`)
  })

  app.get('/js/:filename.js', function (req, res) {
    const {filename} = req.params
    // need to cache files
    browserify()
      .require(`${process.cwd()}/lib/${filename}.js`, {
        expose: 'app'
      })
      .bundle()
      .pipe(res)
  })

  app.listen(port, function () {
    console.log(`App listening on port ${port}`)
  })

  return app
}

function getComponent () {
  return App
}

function safeStringify (obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export {startApp}
