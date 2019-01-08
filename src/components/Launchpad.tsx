import React, { Component } from 'react';
import { LaunchpadWrapper, LaunchpadGrid } from './styled';
import { Sample } from '../audio';

import drumloop1 from '../samples/LS_PTH_FULL_DRUMLOOP_012_125.wav';
import drumloop2 from '../samples/LS_PTH_FULL_DRUMLOOP_025_125.wav';
import drumloop3 from '../samples/LS_TM_DRUMLOOP_017_125.wav';
import drumloop4 from '../samples/LS_TM_DRUMLOOP_042_125.wav';

import bassloop1 from '../samples/LS_TM_BASSLOOP_023_125_C.wav';
import bassloop2 from '../samples/LS_TM_BASSLOOP_030_125_Am.wav';
import bassloop3 from '../samples/LS_PTH_BASSLOOP_027_125_Bm.wav';
import bassloop4 from '../samples/LS_PTH_SYNTHHIT_008_125_Gm.wav';

import synthloop1 from '../samples/LS_PTH_SYNTHLOOP_015_125_Fm.wav';
import synthloop2 from '../samples/LS_PTH_SYNTHLOOP_016_125_Fm.wav';
import synthloop3 from '../samples/LS_TM_SYNTHLOOP_010_125_E.wav';
import synthloop4 from '../samples/LS_TM_SYNTHLOOP_049_125_B.wav';

import fxloop1 from '../samples/LS_PTH_TOPLOOP_011_125.wav';
import fxloop2 from '../samples/LS_PTH_FXLOOP_003_125_Cm.wav';
import fxloop3 from '../samples/LS_TM_FXLOOP_011_125_F.wav';
import fxloop4 from '../samples/LS_TM_FXLOOP_018_125_F.wav';

interface Props {
  metronome: object;
}

interface State {
}


class Launchpad extends Component <Props, State> {
  private instruments: any;

  constructor(props: Props) {
    super(props);

    this.instruments = ['drums', 'basses', 'synths', 'fxs'];

    this.state = {
      drums: ['stopped', 'stopped', 'stopped', 'stopped'],
      basses: ['stopped', 'stopped', 'stopped', 'stopped'],
      synths: ['stopped', 'stopped', 'stopped', 'stopped'],
      fxs: ['stopped', 'stopped', 'stopped', 'stopped'],
    };
  }

  public componentDidMount() {
    console.log(this.props);
    this.loadSamples();
  }

  private loadSamples = () => {
    this.drums = [null, null, null, null];
    this.drums[0] = new Sample(drumloop1);
    this.drums[1] = new Sample(drumloop2);
    this.drums[2] = new Sample(drumloop3);
    this.drums[3] = new Sample(drumloop4);

    this.basses = [null, null, null, null];
    this.basses[0] = new Sample(bassloop1);
    this.basses[1] = new Sample(bassloop2);
    this.basses[2] = new Sample(bassloop3);
    this.basses[3] = new Sample(bassloop4);

    this.synths = [null, null, null, null];
    this.synths[0] = new Sample(synthloop1);
    this.synths[1] = new Sample(synthloop2);
    this.synths[2] = new Sample(synthloop3);
    this.synths[3] = new Sample(synthloop4);

    this.fxs = [null, null, null, null];
    this.fxs[0] = new Sample(fxloop1);
    this.fxs[1] = new Sample(fxloop2);
    this.fxs[2] = new Sample(fxloop3);
    this.fxs[3] = new Sample(fxloop4);
    
  }

  private triggerOnBeat = (...args) => {
    const secondsPerBar = (60 / this.props.metronome.tempo) * this.props.metronome.barLength;
    if (args[0].beatNumber === 0) {
      this.instruments.forEach((instrument, instrumentIndex) => {
        this.state[instrument].forEach((instrumentStatus, index) => {
          if (instrumentStatus === 'prepPlay') {
            this[instrument][index].playSample(args[0].time, args[0].time + secondsPerBar);
            this.setState((prevState: State) => {
              const newInstrument = [...prevState[instrument]];
              newInstrument[index] = 'playing';
              return {
                [instrument]: newInstrument,
              };
            });
          }
          else if (instrumentStatus === 'prepStop') {
            this.setState((prevState: State) => {
              const newInstrument = [...prevState[instrument]];
              newInstrument[index] = 'stopped';
              return {
                [instrument]: newInstrument,
              };
            });
          }
          else if (instrumentStatus === 'playing') {
            this[instrument][index].playSample(args[0].time, args[0].time + secondsPerBar);
          }
        });
      });
    }
  }

  private handleClick = (e: any, instrument: string, index: number) => {
    if (!this.props.metronome.isPlaying) {
      this.props.metronome.togglePlaying(this.triggerOnBeat);
    }

    const instrumentStatus = this.state[instrument][index];
    if (instrumentStatus === 'playing') {
      this.setState((prevState: State) => {
        const newInstrument = [...prevState[instrument]];
        newInstrument[index] = 'prepStop';
        return {
          [instrument]: newInstrument,
        };
      });
    }
    else if (instrumentStatus === 'stopped') {
      this.setState((prevState: State) => {
        const newInstrument = [...prevState[instrument]];
        newInstrument[index] = 'prepPlay';
        return {
          [instrument]: newInstrument,
        };
      });
    }
  }

  public render() {
    const colorMap = {
      prepPlay: 'orange',
      playing: 'green',
      prepStop: 'yellow',
      stopped: 'red',
    };

    const padStyle = {
      height: '40px',
      width: '40px',
      backgroundColor: '#f3f3f3',
    };

    return (
      <LaunchpadWrapper>
        <h3>Launchpad!</h3>
        <LaunchpadGrid>
          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[0]]}} onClick={(e) => this.handleClick(e, 'drums', 0)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.basses[0]]}} onClick={(e) => this.handleClick(e, 'basses', 0)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.synths[0]]}} onClick={(e) => this.handleClick(e, 'synths', 0)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.fxs[0]]}} onClick={(e) => this.handleClick(e, 'fxs', 0)} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[1]]}} onClick={(e) => this.handleClick(e, 'drums', 1)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.basses[1]]}} onClick={(e) => this.handleClick(e, 'basses', 1)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.synths[1]]}} onClick={(e) => this.handleClick(e, 'synths', 1)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.fxs[1]]}} onClick={(e) => this.handleClick(e, 'fxs', 1)} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[2]]}} onClick={(e) => this.handleClick(e, 'drums', 2)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.basses[2]]}} onClick={(e) => this.handleClick(e, 'basses', 2)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.synths[2]]}} onClick={(e) => this.handleClick(e, 'synths', 2)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.fxs[2]]}} onClick={(e) => this.handleClick(e, 'fxs', 2)} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[3]]}} onClick={(e) => this.handleClick(e, 'drums', 3)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.basses[3]]}} onClick={(e) => this.handleClick(e, 'basses', 3)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.synths[3]]}} onClick={(e) => this.handleClick(e, 'synths', 3)} />
          <div style={{...padStyle, backgroundColor: colorMap[this.state.fxs[3]]}} onClick={(e) => this.handleClick(e, 'fxs', 3)} />
        </LaunchpadGrid>
      </LaunchpadWrapper>
    );
  }
}

export default Launchpad;
