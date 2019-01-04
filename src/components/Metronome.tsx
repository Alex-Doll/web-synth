import React, { Component } from 'react';
import { audioContext } from '../audio.tsx';


interface Props {
  children: (state: State) => React.ReactNode;
}

interface State {
  readonly tempo: number;
  readonly beat: number;
  readonly barLength: number;
  readonly isPlaying: boolean;
}

class Metronome extends Component <Props, State> {
  private timerId: number | undefined;

  constructor(props) {
    super(props);

    this.state = {
      tempo: 60,
      beat: 0,
      barLength: 4,
      isPlaying: false,
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  private start = (functionOnNote) => {
    console.log('Metronome has started playing');

    const internalCallback = () => {
      this.advanceNote(functionOnNote);
      this.timerId = window.setTimeout(internalCallback, (60 / this.state.tempo) * 1000);
    };

    window.setTimeout(internalCallback, (60 / this.state.tempo) * 1000);
  }

  private advanceNote = (callback: Function) => {
    this.setState((prevState: State) => ({
      beat: prevState.beat === (prevState.barLength - 1) ? 0 : prevState.beat + 1,
    }), callback);
  }

  private stop = () => {
    console.log('Metronome has stopped playing');

    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.setState({ beat: 0 });
    }
  }

  private controlMetronome = (functionOnNote: Function) => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (this.state.isPlaying) {
      functionOnNote();

      this.start(functionOnNote);
    }
    else {
      this.stop();
    }
  }

  setTempo = (tempo: number) => {
    this.setState({ tempo });
  }

  togglePlaying = (functionOnNote: Function) => {
    this.setState((prevState: State) => ({
      isPlaying: !prevState.isPlaying,
    }), () => this.controlMetronome(functionOnNote));
  }

  render() {
    const propsToSend = {
      ...this.state,
      setTempo: this.setTempo,
      togglePlaying: this.togglePlaying,
    };

    return this.props.children(propsToSend);
  }
}

export default Metronome;
