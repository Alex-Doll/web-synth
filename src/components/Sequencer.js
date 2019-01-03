import React, { Component } from 'react';
import { audioContext, masterGainNode } from '../audio';

import SequencerControls from './SequencerControls';
import { Button } from './styled';



class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60.0,
      currentNote: 0,
      isPlaying: false,
      note: [false, false, false, false],
      oscNote: [false, false, false, false],
    }
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
    console.log(this.state.currentNote);
    if (this.state.note[this.state.currentNote]) {
      this.playFreq(440);
    }
    if (this.state.oscNote[this.state.currentNote]) {
      this.playModulatedFreq(440, 5);
    }
  }

  beginSequencing = () => {
    var updateNote = () => {
      this.setState(prevState => ({
        currentNote: prevState.currentNote === 3 ? 0 : prevState.currentNote + 1,
      }), this.playNotes);
    }

    var internalCallback = () => {
      updateNote();
      this.timerId = window.setTimeout(internalCallback, (60 / this.state.tempo) * 1000);
    };

    window.setTimeout(internalCallback, (60 / this.state.tempo) * 1000);
  }

  controlSequencer = () => {
    if (this.state.isPlaying) {
      console.log('The Sequencer is now playing');
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      this.playNotes();
      this.beginSequencing();
    }
    else {
      console.log('The Sequencer has stopped playing');
      if (this.timerId) {
        window.clearInterval(this.timerId);
        this.setState({ currentNote: 0 });
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

  handlePadChange = (index, type) => {
    this.setState(prevState => {
      let newArray = [...prevState[type]];
      newArray[index] = !newArray[index];
      return {
        [type]: newArray,
      };
    });
  }

  render() {
    return (
      <div>
        SEQUENCER
        <SequencerControls
          tempo={this.state.tempo}
          handleTempoChange={this.handleChange}
          isPlaying={this.state.isPlaying}
          handlePlayStop={this.handlePlayStop}
        />
        <div style={{display: 'flex', flexDirection: 'row'}} >
          <p>Note: </p>
          <input type='checkbox' onChange={() => this.handlePadChange(0, 'note')} checked={this.state.note[0]} />
          <input type='checkbox' onChange={() => this.handlePadChange(1, 'note')} checked={this.state.note[1]} />
          <input type='checkbox' onChange={() => this.handlePadChange(2, 'note')} checked={this.state.note[2]} />
          <input type='checkbox' onChange={() => this.handlePadChange(3, 'note')} checked={this.state.note[3]} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}} >
          <p>OscNote: </p>
          <input type='checkbox' onChange={() => this.handlePadChange(0, 'oscNote')} checked={this.state.oscNote[0]} />
          <input type='checkbox' onChange={() => this.handlePadChange(1, 'oscNote')} checked={this.state.oscNote[1]} />
          <input type='checkbox' onChange={() => this.handlePadChange(2, 'oscNote')} checked={this.state.oscNote[2]} />
          <input type='checkbox' onChange={() => this.handlePadChange(3, 'oscNote')} checked={this.state.oscNote[3]} />
        </div>
      </div>
    );
  }
}

export default Sequencer;
