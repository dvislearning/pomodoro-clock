import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import beep from './beep.mp3';


function Sounds() {
  return(
    <div>
    <audio id="beep" src={ beep }></audio>
  </div>
  );
}

function StartStop(props) {
  if (props.isStopped === true) {
    return <button className="mylittlebuttons" id="start_stop" onClick={props.startTimer}>Start</button>
  } else {
    return <button className="mylittlebuttons" id="start_stop" onClick={props.stopTimer}>Stop</button>
  };
};

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      timerDisplay: 1500,
      isStopped: true,
      currentMode: 'Session',
      breakLength: 300,
      sessionLength: 1500,
      headerString:  "Welcome to the Pomodoro Clock"
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.incrementTime = this.incrementTime.bind(this)
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.startSessionMode = this.startSessionMode.bind(this);
    this.startBreakMode = this.startBreakMode.bind(this);
    this.determineTimerMode = this.determineTimerMode.bind(this);
    this.playBeep = this.playBeep.bind(this);
    this.reset = this.reset.bind(this);
  };

  playBeep(){
    this.audioElement = document.getElementById('beep');
    this.audioElement.play();
  };

  incrementTime() {
    let tempTimerDispay = this.state.timerDisplay
    this.timer = setInterval(() => {
      if(this.state.timerDisplay >= 1) {
        this.setState({
          timerDisplay: tempTimerDispay -= 1
        });
        if(tempTimerDispay === 0) { this.playBeep() }
      } else {

        this.stopTimer();

        this.determineTimerMode();
      }

    }, 1000)
  };


  startTimer() {
    if(this.state.isStopped){
      if(this.timer) { clearInterval(this.timer) }
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
    if(this.state.isStopped && this.state.sessionLength < 3600) {
      let tempSessionLength = this.state.sessionLength
      if(this.state.currentMode !== 'break') {
        this.setState({
          sessionLength: tempSessionLength += 60,
          timerDisplay: tempSessionLength
        });
      } else {
        this.setState({
          sessionLength: tempSessionLength += 60
        });
      }
    }
  };

  decrementSession() {
    if(this.state.isStopped && this.state.sessionLength > 60) {
      let tempSessionLength = this.state.sessionLength
      if(this.state.currentMode !== 'break') {
        this.setState({
          sessionLength: tempSessionLength -= 60,
          timerDisplay: tempSessionLength
        });
      } else {
        this.setState({
          sessionLength: tempSessionLength -= 60
        });
      }
    }
  };

  // YOU NEED TO REFACTOR ALL THE INCREMENT/DECREMENT FUNCTIONS TO MAKE THEM WAY SMALLER.
  // CONSIDER ONE MASTER FUNCTION THAT IS CALLED BY THE OTHER FOUR.

  incrementBreak() {
    if(this.state.isStopped && this.state.breakLength < 3600) {
      let tempBreakLength = this.state.breakLength
      if(this.state.currentMode && this.state.currentMode !== 'session') {
        this.setState({
          breakLength: tempBreakLength += 60,
          timerDisplay: tempBreakLength
        });
      } else {
        this.setState({
          breakLength: tempBreakLength += 60
        });
      }
    }
  };

  decrementBreak() {
    if(this.state.isStopped && this.state.breakLength > 60) {
      let tempBreakLength = this.state.breakLength
      if(this.state.currentMode && this.state.currentMode !== 'session') {
        this.setState({
          breakLength: tempBreakLength -= 60,
          timerDisplay: tempBreakLength
        });
      } else {
        this.setState({
          breakLength: tempBreakLength -= 60
        });
      }
    }
  };


  startSessionMode() {
    let currentSessionLength =  this.state.sessionLength
    this.setState({
      currentMode: "Session",
      timerDisplay: currentSessionLength
    });
  }

  startBreakMode() {
    let currentBreakLength = this.state.breakLength
    this.setState({
      currentMode: "Break",
      timerDisplay: currentBreakLength
    });
  }

  determineTimerMode() {
    if(this.state.currentMode === 'Session') {
      this.startBreakMode();
    } else {
      this.startSessionMode();
    }
    this.state.currentMode ? this.startTimer() : alert('Timer mode cannot be determined')
  }

  reset() {
    this.stopTimer();
    this.setState({
      timerDisplay: 1500,
      isStopped: true,
      currentMode: 'Session',
      breakLength: 300,
      sessionLength: 1500
    });
    if(this.audioElement) { 
      this.audioElement.pause();
      this.audioElement.load();
     }
  };

  render(){

    // returns number of minutes in time object
    const minify = (timeObject) => {
      return ("0" + (Math.floor(timeObject / 60))).slice(-2);
    }

    const sessionBreakMinify = (timeObject) => {
      return timeObject !== 3600 ? ("" + (Math.floor(timeObject / 60))).slice(-2) : 60;
    }

    // returns number of seconds in time object
    const secify = (timeObject) => {
      return ("0" + timeObject % 60).slice(-2);
    }

    const timerDisplay = minify(this.state.timerDisplay)  + ':' +  secify(this.state.timerDisplay)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.headerString}
        </p>
        <a
          className="App-link"
          href="http://www.reddit.com/r/squaredcircle"
          target="_blank"
          rel="noopener noreferrer"
        >{this.state.currentMode}</a>
          <div id="session-label">Session Length:</div> <div id="session-length">{ sessionBreakMinify(this.state.sessionLength) }</div><br/>
          <div id="break-label">Break Length:</div> <div id="break-length">{ sessionBreakMinify(this.state.breakLength) }</div><br/>
          <div id="timer-label">{ this.state.currentMode }:</div> <br/>
          <div id="time-left">{ timerDisplay }</div>
          <Sounds />
        <StartStop isStopped={this.state.isStopped} startTimer={this.startTimer} stopTimer={this.stopTimer}/>
        <button className="mylittlebuttons" id="session-increment" onClick={this.incrementSession}>+</button>
        <button className="mylittlebuttons" id="session-decrement"onClick={this.decrementSession}>-</button>
        <button className="mylittlebuttons" id="break-increment" onClick={this.incrementBreak}>+(B)</button>
        <button className="mylittlebuttons" id="break-decrement"onClick={this.decrementBreak}>-(B)</button>
        <button className="mylittlebuttons" id="reset"onClick={this.reset}>RESET</button>
        <button className="mylittlebuttons" id="fart"onClick={this.tester}>Fart Noise</button>
      </header>
    </div>
  )};
}

export default App;
