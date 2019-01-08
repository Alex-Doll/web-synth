import React, { Component } from 'react';
import { LaunchpadWrapper, LaunchpadGrid } from './styled';
import { Sample } from '../audio';

import drumloop1 from '../samples/LS_PTH_FULL_DRUMLOOP_012_125.wav';
import drumloop2 from '../samples/LS_PTH_FULL_DRUMLOOP_025_125.wav';
import drumloop3 from '../samples/LS_TM_DRUMLOOP_017_125.wav';
import drumloop4 from '../samples/LS_TM_DRUMLOOP_042_125.wav';

interface Props {
  metronome: object;
}

interface State {
}


class Launchpad extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      drums: ['stopped', 'stopped', 'stopped', 'stopped'],
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

    this.drums = [null, null, null, null];
    this.drums[0] = new Sample(drumloop1);
    this.drums[1] = new Sample(drumloop2);
    this.drums[2] = new Sample(drumloop3);
    this.drums[3] = new Sample(drumloop4);

    this.drums = [null, null, null, null];
    this.drums[0] = new Sample(drumloop1);
    this.drums[1] = new Sample(drumloop2);
    this.drums[2] = new Sample(drumloop3);
    this.drums[3] = new Sample(drumloop4);

    this.drums = [null, null, null, null];
    this.drums[0] = new Sample(drumloop1);
    this.drums[1] = new Sample(drumloop2);
    this.drums[2] = new Sample(drumloop3);
    this.drums[3] = new Sample(drumloop4);
    
  }

  private triggerOnBeat = (...args) => {
    const secondsPerBar = (60 / this.props.metronome.tempo) * this.props.metronome.barLength;
    if (args[0].beatNumber === 0) {
      this.state.drums.forEach((drumStatus, index) => {
        if (drumStatus === 'prepPlay') {
          this.drums[index].playSample(args[0].time, args[0].time + secondsPerBar);
          this.setState((prevState: State) => {
            const newDrums = [...prevState.drums];
            newDrums[index] = 'playing';
            return {
              drums: newDrums,
            };
          });
        }
        else if (drumStatus === 'prepStop') {
          this.setState((prevState: State) => {
            const newDrums = [...prevState.drums];
            newDrums[index] = 'stopped';
            return {
              drums: newDrums,
            };
          });
        }
        else if (drumStatus === 'playing') {
          this.drums[index].playSample(args[0].time, args[0].time + secondsPerBar);
        }
      });
    }
  }

  private handleClick = (e: any, index: number) => {
    if (!this.props.metronome.isPlaying) {
      this.props.metronome.togglePlaying(this.triggerOnBeat);
    }

    const drumStatus = this.state.drums[index];
    console.log(index);
    if (drumStatus === 'playing') {
      this.setState((prevState: State) => {
        const newDrums = [...prevState.drums];
        newDrums[index] = 'prepStop';
        return {
          drums: newDrums,
        };
      });
    }
    else if (drumStatus === 'stopped') {
      this.setState((prevState: State) => {
        const newDrums = [...prevState.drums];
        newDrums[index] = 'prepPlay';
        return {
          drums: newDrums,
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
          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[0]]}} onClick={(e) => this.handleClick(e, 0)} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[1]]}} onClick={(e) => this.handleClick(e, 1)} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[2]]}} onClick={(e) => this.handleClick(e, 2)} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={{...padStyle, backgroundColor: colorMap[this.state.drums[3]]}} onClick={(e) => this.handleClick(e, 3)} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
        </LaunchpadGrid>
      </LaunchpadWrapper>
    );
  }
}

export default Launchpad;
