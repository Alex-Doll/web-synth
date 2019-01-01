import React, { Component } from 'react';
import { audioContext } from '../audio';

class Sequencer extends Component {
  componentDidMount() {
    /*     this.playFreq(440); */
    /*     this.playModulatedFreq(60, 8); */
  }

  playFreq = (frequency) => {
    const osc = new OscillatorNode(audioContext, {
      frequency,
      type: 'sawtooth',
    });
    osc.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 1);
  }

  playModulatedFreq = (toneFreq, modFreq) => {
    const osc = new OscillatorNode(audioContext, {
      frequency: toneFreq,
      type: 'triangle',
    });

    const lfo = new OscillatorNode(audioContext, {
      frequency: modFreq,
      type: 'sine',
    });

    const amp = audioContext.createGain();
    amp.gain.setValueAtTime(1, audioContext.currentTime);

    lfo.connect(amp.gain);
    osc.connect(amp).connect(audioContext.destination);
    lfo.start();
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
