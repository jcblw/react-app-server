
import React, {Component} from 'react'
import Hello from './hello'

class Woot extends Component {

  constructor (props) {
    super()
  }
  render () {
    return (
      <div className='woot-container'>
        <h1>Woot it works</h1>
        <Hello count={25} />
      </div>
    )
  }
}

module.exports = Woot
