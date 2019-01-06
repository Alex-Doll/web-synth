import React, { Component } from 'react';
import { audioContext, masterGainNode, Tone,  getFile, playSample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';
import kickloop from '../samples/LS_TM_KICKLOOP_004_125.wav';
import snareloop from '../samples/LS_TM_SNARECLAPLOOP_004_125.wav';
import hatloop from '../samples/LS_TM_HATLOOP_012_125.wav'

import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import SequencerInstrumentCreator from './SequencerInstrumentCreator';
import { SequencerWrapper } from './styled';


class Sequencer extends Component <any, any> {
  private bassBuffer: any;
  private kickBuffer: any;
  private snareBuffer: any;
  private hatBuffer: any;
  private instrumentMap: any;
  private availableInstruments: any;

  constructor(props: any) {
    super(props);

    const instruments = ['kick', 'snare', 'hat', 'bass'];
    const padStatus = this.initializePads(instruments);

    this.state = {
      instruments,
      padStatus,
    }

    this.instrumentMap = {
      kick: this.playBuffer.bind(this, 'kick'),
      snare: this.playBuffer.bind(this, 'snare'),
      hat: this.playBuffer.bind(this, 'hat'),
      bass: this.playFreq.bind(this, 60),
    }

    this.availableInstruments = {
      highNote: this.playFreq.bind(this, 440),
      bassNote: this.playFreq.bind(this, 60),
      modHighNote: this.playModulatedFreq.bind(this, 440, 5),
      modBassNote: this.playModulatedFreq.bind(this, 60, 5),
      sample: this.playBuffer,
      kick: this.playBuffer.bind(this, 'kick'),
      snare: this.playBuffer.bind(this, 'snare'),
      hat: this.playBuffer.bind(this, 'hat'),
    }
  }

  componentDidMount() {
    getFile(soundfile).then(buffer => this.bassBuffer = buffer);
    getFile(kickloop).then(buffer => this.kickBuffer = buffer);
    getFile(snareloop).then(buffer => this.snareBuffer = buffer);
    getFile(hatloop).then(buffer => this.hatBuffer = buffer);
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

  playBuffer = (buffer: string) => {
    const secondsPerBeat = 60.0 / this.props.metronome.tempo;
    switch (buffer) {
      case 'kick':
        var sampleSource = playSample(this.kickBuffer);
        break;
      case 'snare':
        var sampleSource = playSample(this.snareBuffer);
        break;
      case 'hat':
        var sampleSource = playSample(this.hatBuffer);
        break;
      case 'bass':
        var sampleSource = playSample(this.bassBuffer);
        break;
      default:
        var sampleSource = playSample(this.bassBuffer);
    }

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

  addInstrument = (name: string, type: string) => {
    this.setState((prevState: any) => {
      this.instrumentMap[name] = this.availableInstruments[type];
      console.log(this.instrumentMap);
      return {
        instruments: [...prevState.instruments, name],
        padStatus: {
          ...prevState.padStatus,
          [name]: new Array(this.props.metronome.barLength).fill(false),
        }
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
        <SequencerInstrumentCreator
          addInstrument={this.addInstrument}
          instruments={Object.keys(this.availableInstruments)}
        />
      </SequencerWrapper>
    );
  }
}

export default Sequencer;
