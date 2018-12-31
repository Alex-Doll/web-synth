import React, { Component } from 'react';
import './App.css';

import Synth from './Synth';

class App extends Component {
  componentWillMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext);
  }

  render() {
    return (
      <div className="App">
        <header>
          Web Synth
        </header>
        <Synth audioContext={this.audioContext} />
      </div>
    );
  }
}

export default App;
