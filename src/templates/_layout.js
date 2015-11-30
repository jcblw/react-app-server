import React from 'react'


const template = (ComponentString, props, stringify) => (
  <html>
    <head>
      <title>My Awesome Serverside Rendered Component</title>
      <meta charSet='utf8' />
    </head>
    <body>
      <div id='app' dangerouslySetInnerHTML={{
        __html: ComponentString
      }} />
      <script src={`/js/${props.scriptName}.js`} />
      <script dangerouslySetInnerHTML={{
        __html: `
          var app = require('app')
          app(${stringify(props)})
        `
      }} />
    </body>
  </html>
)

export {template}
