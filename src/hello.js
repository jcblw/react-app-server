import React from 'react'
import ReactDOM from 'react-dom'
import {Hello} from './components/Hello'

function startApp (props) {
  ReactDOM.render(<Hello {...props} />, document.getElementById('app'))
}

module.exports = startApp
