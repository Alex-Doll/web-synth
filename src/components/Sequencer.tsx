import React, { Component } from 'react';
import { audioContext, masterGainNode, Tone,  getFile, playSample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';

import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import { SequencerWrapper } from './styled';


class Sequencer extends Component <any, any> {
  private buffer: any;
  private instrumentMap: any;

  constructor(props: any) {
    super(props);

    const instruments = ['note', 'oscNote', 'sample', 'note2', 'sample2'];
    const padStatus = this.initializePads(instruments);

    this.state = {
      instruments,
      padStatus,
    }

    this.instrumentMap = {
      note: this.playFreq.bind(this, 440),
      oscNote: this.playModulatedFreq.bind(this, 440, 5),
      sample: this.playBuffer,
      note2: this.playFreq.bind(this, 60),
      sample2: this.playBuffer,
    }
  }

  componentDidMount() {
    getFile(soundfile).then(buffer => this.buffer = buffer);
  }

  initializePads = (instruments: any) => {
    // For some reason couldnt get typescript to work with reduce function
    let padStatus: { [index:string] : any } = {};
    instruments.forEach((instrument: string, index: number) => {
      padStatus[instrument] = new Array(this.props.metronome.barLength).fill(false);
    });

    return padStatus;
  }

  playNotes = () => {
    console.log(this.props.metronome.beat);
    for (let key in this.state.padStatus) {
      if (this.state.padStatus[key][this.props.metronome.beat]) {
        this.instrumentMap[key]();
      }
    }
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

  playBuffer = () => {
    const secondsPerBeat = 60.0 / this.props.metronome.tempo;
    const sampleSource = playSample(this.buffer);
    sampleSource.stop(audioContext.currentTime + secondsPerBeat);
  }

  handlePadChange = (instrument: string, index: number) => {
    this.setState((prevState: any) => {
      let instrumentStatus = [...prevState.padStatus[instrument]];
      instrumentStatus[index] = !instrumentStatus[index];
      return {
        padStatus: {
          ...prevState.padStatus,
          [instrument]: instrumentStatus,
        }
      };
    });
  }

  removeInstrument = (instrumentToRemove: string) => {
    this.setState((prevState: any) => {
      const newInstruments = prevState.instruments.filter((instrument: string) => instrument !== instrumentToRemove);
      const { [instrumentToRemove]: value, ...newPadStatus } = prevState.padStatus;
      delete this.instrumentMap[instrumentToRemove];
      return {
        instruments: newInstruments,
        padStatus: newPadStatus,
      };
    });
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
          instruments={this.state.instruments}
          padStatus={this.state.padStatus}
          handlePadChange={this.handlePadChange}
          currentNote={this.props.metronome.beat}
          isPlaying={this.props.metronome.isPlaying}
          barLength={this.props.metronome.barLength}
          removeInstrument={this.removeInstrument}
        />
      </SequencerWrapper>
    );
  }
}

export default Sequencer;
