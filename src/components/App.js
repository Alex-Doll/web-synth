import React, { Component } from 'react';
import '../styles/App.css';

import Synth from './Synth';
import Sequencer from './Sequencer.tsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Web Synth
        </header>
        <Synth />
        <Sequencer />
      </div>
    );
  }
}

export default App;
