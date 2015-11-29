
import React, {Component} from 'react'

class App extends Component {

  constructor (props) {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {count: +props.count || 0}
  }
  onClick () {
    this.setState({count: this.state.count + 1})
  }
  render () {
    return (
      <div className='app-container'>
        <span onClick={this.onClick}>Hello World ({this.state.count})</span>
      </div>
    )
  }
}

export {App}
