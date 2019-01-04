import React, { Component } from 'react';
import { audioContext, masterGainNode, Tone,  getFile, playSample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';

import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import { SequencerWrapper } from './styled';


class Sequencer extends Component <any, any> {
  private buffer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      note: [false, false, false, false],
      oscNote: [false, false, false, false],
      sample: [false, false, false, false],
    }
  }

  componentDidMount() {
    getFile(soundfile).then(buffer => this.buffer = buffer);
  }

  playFreq = (frequency: number) => {
    const secondsPerBeat = 60.0 / this.props.metronome.tempo;
    const tone = new Tone(frequency);
    tone.playFor(secondsPerBeat);
  }

  playModulatedFreq = (toneFreq: number, modFreq: number) => {
    const secondsPerBeat = 60.0 / this.props.metronome.tempo;
    const tone = new Tone(toneFreq, 0, 'triangle');
    tone.connectToLFO(modFreq, 'sine', secondsPerBeat);
  }

  playNotes = () => {
    console.log(this.props.metronome.currentNote);
    if (this.state.note[this.props.metronome.currentNote]) {
      this.playFreq(440);
    }
    if (this.state.oscNote[this.props.metronome.currentNote]) {
      this.playModulatedFreq(440, 5);
    }
    if (this.state.sample[this.props.metronome.currentNote]) {
      this.playBuffer();
    }
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.id]: Number(e.target.value),
    });
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
    const secondsPerBeat = 60.0 / this.props.metronome.tempo;
    const sampleSource = playSample(this.buffer);
    sampleSource.stop(audioContext.currentTime + secondsPerBeat);
  }

  render() {
    return (
      <SequencerWrapper>
        <h2 style={{textAlign: 'center'}}>SEQUENCER</h2>
        <SequencerControls
          tempo={this.props.metronome.tempo}
          handleTempoChange={this.props.metronome.setTempo}
          isPlaying={this.props.metronome.isPlaying}
          handlePlayStop={() => this.props.metronome.togglePlaying(this.playNotes)}
        />
        <StepSequencer
          note={this.state.note}
          oscNote={this.state.oscNote}
          sample={this.state.sample}
          handlePadChange={this.handlePadChange}
          currentNote={this.props.metronome.currentNote}
          isPlaying={this.props.metronome.isPlaying}
        />
      </SequencerWrapper>
    );
  }
}

export default Sequencer;
