import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './components/SeasonDisplay'
import Loading from './components/Loading'

class App extends Component {
  state = { lat: null, errMessage: '' }

  
  componentDidMount () {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errMessage: err.message })
    )
  }

  componentDidUpdate () {
    console.log('the component is updated')
  }

  renderHelper() {
    if (this.state.errMessage && !this.state.lat) {
      return <div>Error: {this.state.errMessage}</div>
    }
    if (!this.state.errMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Loading message='Я бы на твоём месте разрешил геолокацию, а то ничего не заработает' />
  }

  render() {
    return (
      <div>
        {this.renderHelper()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))

export default App
