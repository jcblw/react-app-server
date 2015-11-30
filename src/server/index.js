'use strict'

import path from 'path'
import express from 'express'
import browserify from 'browserify'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
// this is just a temp way to see this working
import appRouter from './app-router'
import {template} from '../templates/_layout'

function handleDocRequest (req, res) {
  // do a fetch hear to get props
  const {count} = req.query
  const Component = getComponent(req)
  // this is just an example
  const scriptName = req.path.split('/').pop().toLowerCase()
  const props = {count, scriptName}
  // need to compile data like which script to include
  // which app to build based on
  // what meta data do we need

  if (!Component) {
    res
      .status(404)
      .send('404 not found')
  }
  const _template = template(ReactDOMServer.renderToString(<Component {...props} />), props, safeStringify)
  const html = ReactDOMServer.renderToStaticMarkup(_template)
  res.send(`<!doctype html>${html}`)
}

function startApp (config = {}) {
  const app = express()
  const port = config.PORT || 3000

  app.get('/', handleDocRequest)
  app.get('/hello', handleDocRequest)

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

function getComponent (req) {
  const appname = appRouter(req.path)
  const _app = appname || 'App'
  const pathname = path.resolve(process.cwd(), './lib/components/', `${_app}.js`)
  // fs stat to see if file is present
  return require(pathname)[_app]
}

function safeStringify (obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export {startApp}
