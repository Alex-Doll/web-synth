import React, { Component } from 'react';
import './App.css';

import Synth from './Synth';

class App extends Component {
  componentWillMount() {
    this.audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();
    this.masterGainNode = this.audioContext.createGain();
  }

  render() {
    return (
      <div className="App">
        <header>
          Web Synth
        </header>
        <Synth audioContext={this.audioContext} masterGainNode={this.masterGainNode} />
      </div>
    );
  }
}

export default App;
