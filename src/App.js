import React, { Component } from 'react';
import './App.css';

import Synth from './Synth';
import { INITIAL_MASTER_GAIN } from './constants.js';

class App extends Component {
  componentWillMount() {
    this.audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.gain.value = INITIAL_MASTER_GAIN;
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
