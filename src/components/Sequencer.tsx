import React, { Component } from 'react';
import { audioContext, masterGainNode, Tone,  getFile, playSample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';

import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import { SequencerWrapper } from './styled';


class Sequencer extends Component <any, any> {
  private timerId: number | undefined;
  private buffer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      tempo: 60.0,
      currentNote: 0,
      isPlaying: false,
      note: [false, false, false, false],
      oscNote: [false, false, false, false],
      sample: [false, false, false, false],
    }
  }

  componentDidMount() {
    getFile(soundfile).then(buffer => this.buffer = buffer);
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  playFreq = (frequency: number) => {
    const secondsPerBeat = 60.0 / this.state.tempo;
    const tone = new Tone(frequency);
    tone.playFor(secondsPerBeat);
  }

  playModulatedFreq = (toneFreq: number, modFreq: number) => {
    const secondsPerBeat = 60.0 / this.state.tempo;
    const tone = new Tone(toneFreq, 0, 'triangle');
    tone.connectToLFO(modFreq, 'sine', secondsPerBeat);
  }

  playNotes = () => {
    console.log(this.state.currentNote);
    if (this.state.note[this.state.currentNote]) {
      this.playFreq(440);
    }
    if (this.state.oscNote[this.state.currentNote]) {
      this.playModulatedFreq(440, 5);
    }
    if (this.state.sample[this.state.currentNote]) {
      this.playBuffer();
    }
  }

  beginSequencing = () => {
    var updateNote = () => {
      this.setState((prevState: any) => ({
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

  handleChange = (e: any) => {
    this.setState({
      [e.target.id]: Number(e.target.value),
    });
  }

  handlePlayStop = (e: any) => {
    this.setState((prevState: any) => ({
      isPlaying: !prevState.isPlaying,
    }), this.controlSequencer);
  }

  handlePadChange = (index: number, type: string) => {
    this.setState((prevState: any) => {
      let newArray = [...prevState[type]];
      newArray[index] = !newArray[index];
      return {
        [type]: newArray,
      };
    });
  }

  playBuffer = () => {
    const secondsPerBeat = 60.0 / this.state.tempo;
    const sampleSource = playSample(this.buffer);
    sampleSource.stop(audioContext.currentTime + secondsPerBeat);
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
          sample={this.state.sample}
          handlePadChange={this.handlePadChange}
          currentNote={this.state.currentNote}
          isPlaying={this.state.isPlaying}
        />
      </SequencerWrapper>
    );
  }
}

export default Sequencer;
