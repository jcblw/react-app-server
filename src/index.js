// sample of how the api could look
// this is setting up the server, putting in some routes and configuring them.

import {create} from 'react-component-server'
const port = process.env.PORT || 3000
const express = require('express')
const app = express()

const componentServer = create({
  server: app,
  componentsDir: './lib/components',
  templatesDir: './lib/templates',
  defaults: {
    bundle: true,
    component: './App.js',
    props: {},
    template: './_layout.js'
  }
})
componentServer.get('/', (req, res, done) => {
  const {query} = req
  done({
    props: {count: query.count}
  })
})
componentServer.get('/hello', (req, res, done) => {
  const {query} = req
  done({
    component: './Hello.js',
    props: {count: query.count}
  })
})
componentServer.get('/woot', {
  component: './Woot.js'
})
componentServer.get('/another')
componentServer.on('error', (err) => {
  throw err
})

// listen to port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
