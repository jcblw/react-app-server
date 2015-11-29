import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App'

function startApp (props) {
  ReactDOM.render(<App {...props} />, document.getElementById('app'))
}

module.exports = startApp
