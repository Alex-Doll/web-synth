import React, { Component } from 'react';
import { audioContext, masterGainNode } from '../audio';

class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60.0,
      lookahead: 25.0,
      scheduleAheadTime: 0.1,
      currentNote: 0,
      nextNoteTime: 0.0,
      notesInQueue: [],
      isPlaying: false,
    }
  }

  componentDidMount() {
    /*     this.playFreq(440); */
    /*     this.playModulatedFreq(60, 8); */
  }

  scheduler = () => {
    while (this.state.nextNoteTime < audioContext.currentTime + this.state.scheduleAheadTime) {
      this.scheduleNote(this.state.currentNote, this.state.nextNoteTime);
      this.nextNote();
    }
    const timerID = window.setTimeout(this.scheduler, this.state.lookahead);
  }

  nextNote = () => {
    const secondsPerBeat = 60.0 / this.state.tempo;

    this.setState(prevState => ({
        nextNoteTime: prevState.nextNoteTime + secondsPerBeat,
        currentNote: prevState.currentNote === 3 ? 0 : prevState.currentNote + 1,
    }));
  }

  scheduleNote = (beatNumber, time) => {
    if (this.state.currentNote % 2 === 0) {
      this.playFreq(440);
    }
    else {
      this.playModulatedFreq(60, 8);
    }

    this.setState(prevState => ({
      notesInQueue: [...prevState.notesInQueue, {note: beatNumber, time}],
    }));
  }

  playFreq = (frequency) => {
    const osc = new OscillatorNode(audioContext, {
      frequency,
      type: 'sawtooth',
    });
    osc.connect(masterGainNode).connect(audioContext.destination);
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
    osc.connect(amp).connect(masterGainNode).connect(audioContext.destination);
    lfo.start();
    osc.start();
    osc.stop(audioContext.currentTime + 1);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: Number(e.target.value),
    });
  }

  handlePlayPause = (e) => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying,
    }));
  }

  render() {
    return (
      <div>
        SEQUENCER
        <label htmlFor='tempo'>Tempo: {this.state.tempo} bpm</label>
        <input id='tempo' type='range' min='0' max='120' step='1.0' value={this.state.tempo} onChange={this.handleChange} />
        <button onClick={this.handlePlayPause}>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  }
}

export default Sequencer;
