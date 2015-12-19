import React, {Component} from 'react'
import {stateValidation} from 'react-state-validation'

class Hello extends Component {

  constructor (props) {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {
      count: +props.count || 0,
      first_name: 'hello'
    }
  }
  onClick () {
    this.setState({count: this.state.count - 1})
  }
  onInputChange (key) {
    return (e) => {
      const {value} = e.target
      this.setState({[key]: value})
    }
  }
  render () {
    return (
      <div className='hello-container'>
        <span onClick={this.onClick}>Hello Universe ({this.state.count})</span>
        <input value={this.state.first_name} onChange={this.onInputChange('first_name')}/>
        <input value={this.state.last_name} onChange={this.onInputChange('last_name')}/>
      </div>
    )
  }
}

Hello.stateValidations = {
  first_name: () => {
    return new Error('Bad first name')
  }
}

module.exports = stateValidation(Hello)
