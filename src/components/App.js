import React, { Component } from 'react';
import '../styles/App.css';

import Synth from './Synth';
import Sequencer from './Sequencer.tsx';
import Metronome from './Metronome.tsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Web Synth
        </header>
        <Synth />
        <Metronome>
          {(props) => <Sequencer metronome={props} />}
        </Metronome>
      </div>
    );
  }
}

export default App;
