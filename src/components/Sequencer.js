import React, { Component } from 'react';
import { audioContext } from '../audio';

class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60.0,
      currentNote: 0,
      nextNoteTime: 0.0,
    }
  }

  componentDidMount() {
    /*     this.playFreq(440); */
    /*     this.playModulatedFreq(60, 8); */
    let lookahead = 25.0;
    let scheduleAheadTime = 0.1;
  }

  nextNote = () => {
    const secondsPerBeat = 60.0 / this.state.tempo;

    this.setState(prevState => ({
        nextNoteTime: prevState.nextNoteTime + secondsPerBeat,
        currentNote: prevState.currentNote === 4 ? 0 : prevState.currentNote + 1,
    }));
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

  handleChange = (e) => {
    this.setState({
      [e.target.id]: Number(e.target.value),
    });
  }

  render() {
    return (
      <div>
        SEQUENCER
        <label htmlFor='tempo'>Tempo: {this.state.tempo} bpm</label>
        <input id='tempo' type='range' min='0' max='120' step='1.0' value={this.state.tempo} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Sequencer;
