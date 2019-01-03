import React, { Component } from 'react';
import { audioContext, masterGainNode, Tone } from '../audio.tsx';

import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import { SequencerWrapper } from './styled';



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

  componentDidMount() {
    const tone = new Tone();
    console.log(tone.frequency);
    console.log(tone.detune);
    console.log(tone.type);
    console.log(tone.osc);
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  playFreq = (frequency) => {
    const secondsPerBeat = 60.0 / this.state.tempo;
    const tone = new Tone();
    tone.osc.connect(masterGainNode).connect(audioContext.destination);
    tone.osc.start();
    tone.osc.stop(audioContext.currentTime + secondsPerBeat);
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
      <SequencerWrapper>
        <h2 style={{textAlign: 'center'}}>SEQUENCER</h2>
        <SequencerControls
          tempo={this.state.tempo}
          handleTempoChange={this.handleChange}
          isPlaying={this.state.isPlaying}
          handlePlayStop={this.handlePlayStop}
        />
        <StepSequencer
          note={this.state.note}
          oscNote={this.state.oscNote}
          handlePadChange={this.handlePadChange}
          currentNote={this.state.currentNote}
          isPlaying={this.state.isPlaying}
        />
      </SequencerWrapper>
    );
  }
}

export default Sequencer;
