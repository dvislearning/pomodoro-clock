import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NONAME } from 'dns';

function StartStop(props) {
  if (props.isStopped === true) {
    return <button className="mylittlebuttons" id="start-stop" onClick={props.startTimer}>Start</button>
  } else {
    return <button className="mylittlebuttons" id="start-stop" onClick={props.stopTimer}>Stop</button>
  };
};

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      elapsedInterval: 0,
      timerDisplay: 1500000,
      timerMode: 'session',
      isStopped: true,
      breakLength: 300000,
      sessionLength: 1500000
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.incrementTime = this.incrementTime.bind(this)
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.tester = this.tester.bind(this);
  };

  tester = (string) => { console.log(string) }

  incrementTime = () => {
    this.timer = setInterval(() => {
      this.setState({
        elapsedInterval: this.state.elapsedInterval += 1000,
        timerDisplay: this.state.timerDisplay -= 1000
      });
    }, 1000)
  };


  startTimer() {
    if(this.state.isStopped){
      this.setState({
        isStopped: false
      });
      this.incrementTime();
    }
  }

  stopTimer() {
    this.setState({
      isStopped: true
    });
    clearInterval(this.timer);
  }

  incrementSession() {
    if(this.state.sessionLength < 3600000) {
      this.setState({
        sessionLength: this.state.sessionLength += 60000
      });
    }
  }

  decrementSession() {
    if(this.state.sessionLength > 6000) {
      this.setState({
        sessionLength: this.state.sessionLength -= 60000
      });
    }
  }

  render(){

    // returns number of minutes in time object
    const minify = (timeObject) => {
      return timeObject !== 3600000 ? ("0" + (Math.floor(timeObject / 60000) % 60)).slice(-2) : 60;
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
        <a
          className="App-link"
          href="http://www.reddit.com/r/squaredcircle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Session Length: { minify(this.state.sessionLength) } : { secify(this.state.sessionLength) }<br/>
          Time Left: <br/>
          <span id="time-left">{ minify(this.state.timerDisplay) } : { secify(this.state.timerDisplay) }</span>
        </a>
        <div id="start_stop"><StartStop isStopped={this.state.isStopped} startTimer={this.startTimer} stopTimer={this.stopTimer}/></div>
        <button className="mylittlebuttons" onClick={this.incrementSession}>+</button>
        <button className="mylittlebuttons" onClick={this.decrementSession}>-</button>
      </header>
    </div>
  )};
}

export default App;
