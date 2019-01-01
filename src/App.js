import React, { Component } from 'react';
import './App.css';

import Synth from './Synth';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Web Synth
        </header>
        <Synth />
      </div>
    );
  }
}

export default App;
