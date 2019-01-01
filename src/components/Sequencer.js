import React, { Component } from 'react';
import { audioContext } from '../audio';

class Sequencer extends Component {
  componentDidMount() {
    this.playSweep();
  }

  playSweep = () => {
    const osc = new OscillatorNode(audioContext, {
      frequency: 440,
      type: 'sawtooth',
    });
    osc.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 1);
  }

  render() {
    return (
      <div>
        SEQUENCER
      </div>
    );
  }
}

export default Sequencer;
