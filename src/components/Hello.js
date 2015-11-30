
import React, {Component} from 'react'

class Hello extends Component {

  constructor (props) {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {count: +props.count || 0}
  }
  onClick () {
    this.setState({count: this.state.count - 1})
  }
  render () {
    return (
      <div className='hello-container'>
        <span onClick={this.onClick}>Hello Universe ({this.state.count})</span>
      </div>
    )
  }
}

export {Hello}
