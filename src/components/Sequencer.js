import React, { Component } from 'react';
import { audioContext, masterGainNode } from '../audio';

class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60.0,
      currentNote: 0,
      isPlaying: false,
    }
  }

  componentDidMount() {
    /*     this.playFreq(440); */
    /*     this.playModulatedFreq(60, 8); */
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

    playFreq = (frequency) => {
    const secondsPerBeat = 60.0 / this.state.tempo;
    const osc = new OscillatorNode(audioContext, {
      frequency,
      type: 'sawtooth',
    });
    osc.connect(masterGainNode).connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + secondsPerBeat);
  }

  playModulatedFreq = (toneFreq, modFreq) => {
    const secondsPerBeat = 60.0 / this.state.tempo;
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
    osc.connect(amp).connect(masterGainNode).connect(audioContext.destination);
    lfo.start();
    osc.start();
    osc.stop(audioContext.currentTime + secondsPerBeat);
  }

  playNotes = () => {
    if (this.state.currentNote % 2 === 0) {
      this.playFreq(440);
    }
    else {
      this.playModulatedFreq(440, 5);
    }
  }

  controlSequencer = () => {
    const millisecondsPerBeat = (60.0 / this.state.tempo) * 1000;

    if (this.state.isPlaying) {
      console.log('The Sequencer is now playing');
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      this.timerId = window.setInterval(() => {
        this.setState(prevState => {
          return {
            currentNote: prevState.currentNote === 3 ? 0 : prevState.currentNote + 1,
          };
        }, this.playNotes);
      }, millisecondsPerBeat);
    }
    else {
      console.log('The Sequencer has stopped playing');
      if (this.timerId) {
        window.clearInterval(this.timerId);
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: Number(e.target.value),
    });
  }

  handlePlayStop = (e) => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying,
    }), this.controlSequencer);
  }

  render() {
    return (
      <div>
        SEQUENCER
        <label htmlFor='tempo'>Tempo: {this.state.tempo} bpm</label>
        <input id='tempo' type='range' min='1' max='120' step='1.0' value={this.state.tempo} onChange={this.handleChange} />
        <button onClick={this.handlePlayStop}>
          {this.state.isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
    );
  }
}

export default Sequencer;
