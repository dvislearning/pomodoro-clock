import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NONAME } from 'dns';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      initialTime: Date.now(),
      elapsedInterval: 0,
      timerDisplay: 1500000,
      activeTimer: null,
      isStopped: true,
      isPaused: false,
      breakLength: 300000,
      sessionLength: 1500000,
    };

    this.timer = this.timer.bind(this);
  };

  timer(){ setInterval(() => {
    this.setState({
      elapsedInterval: this.state.elapsedInterval += 1000,
      timerDisplay: this.state.timerDisplay -= 1000
    });
  }, 1000)};

  render(){

    // returns number of minutes in time object
    const minify = (timeObject) => {
      return ("0" + (Math.floor(timeObject / 60000) % 60)).slice(-2);
    }

    // returns number of seconds in time object
    const secify = (timeObject) => {
      return ("0" + (Math.floor(timeObject / 1000) % 60)).slice(-2);
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Time Left:
        <a
          className="App-link"
          href="http://www.reddit.com/r/squaredcircle"
          target="_blank"
          rel="noopener noreferrer"
        >
          { minify(this.state.timerDisplay) } : { secify(this.state.timerDisplay) } ---- {/* minify(this.state.elapsedInterval) } : { secify(this.state.elapsedIntervalc) */}
        </a>
        <button id="mylittlebutton" onClick={this.timer}>Begin</button>
      </header>
    </div>
  )};
}

export default App;
