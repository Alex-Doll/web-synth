import React, { Component } from 'react';
import { audioContext, masterGainNode } from '../audio';

class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60.0,
      isPlaying: false,
    }

    this.lookahead =  25.0;
    this.scheduleAheadTime =  0.1;
    this.currentNote =  0;
    this.nextNoteTime =  0.0;
    this.notesInQueue =  [];
  }

  componentDidMount() {
    /*     this.playFreq(440); */
    /*     this.playModulatedFreq(60, 8); */
  }

  scheduler = () => {
    while (this.nextNoteTime < audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentNote, this.nextNoteTime);
      this.nextNote();
    }
    this.timerID = window.setTimeout(this.scheduler, this.lookahead);
    console.log(this.currentNote);
    console.log(this.nextNoteTime);
  }

  nextNote = () => {
    const secondsPerBeat = 60.0 / this.state.tempo;

    this.nextNoteTime += secondsPerBeat;

    this.currentNote++;
    if (this.currentNote === 4) {
      this.currentNote = 0;
    }
  }

  scheduleNote = (beatNumber, time) => {
    this.notesInQueue.push({ note: beatNumber, time });

    if (this.currentNote % 2 === 0) {
      this.playFreq(440);
    }
    else {
      this.playModulatedFreq(60, 8);
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

  controlSequencer = () => {
    if (this.state.isPlaying) {
      console.log('The Sequencer is now playing');
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      this.currentNote = 0;
      this.nextNoteTime = audioContext.currentTime;
      this.scheduler();
    }
    else {
      console.log('The Sequencer has stopped playing');
      window.clearTimeout(this.timerID);
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
