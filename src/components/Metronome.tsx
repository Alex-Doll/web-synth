import React, { Component } from 'react';
import { audioContext } from '../audio';


interface Props {
  children: (state: State) => React.ReactNode;
  beatDivision: number;
}

interface State {
  readonly tempo: number;
  readonly beat: number;
  readonly barLength: number;
  readonly isPlaying: boolean;
}

class Metronome extends Component <Props, State> {
  private timerId: number | undefined;
  private lookahead: number;
  private scheduleAheadTime: number;
  private currentNote: number;
  private nextNoteTime: number;
  private notesInQueue: any;
  private functionOnNote: Function | undefined;

  public static defaultProps = {
    children: null,
    beatDivision: 1,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      tempo: 60,
      beat: 0,
      barLength: 4,
      isPlaying: false,
    }

    this.lookahead = 25.0;
    this.scheduleAheadTime = 0.1;

    this.currentNote = 0;
    this.nextNoteTime = 0.0;
    this.notesInQueue = [];
  }

  public componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  private nextNote = () => {
    const secondsPerBeat = 60.0 / this.state.tempo;

    this.nextNoteTime +=  (1 / this.props.beatDivision) * secondsPerBeat; // Add beat length to last beat time

    // Advance the beat number, wrap to zero
    this.currentNote++;
    if (this.currentNote === (this.state.barLength * this.props.beatDivision)) {
      this.currentNote = 0;
    }
  }

  private scheduleNote = (beatNumber: number, time: number) => {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.splice(0, 1);
    this.notesInQueue.push({
      note: beatNumber,
      time: time,
    });
    this.setState({
      beat: beatNumber,
    });

    if (this.functionOnNote) {
      this.functionOnNote({ beatNumber, time });
      console.log(beatNumber, time);
    }
  }

  private scheduler = () => {
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer
    while (this.nextNoteTime < audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentNote, this.nextNoteTime);
      this.nextNote();
    }
    this.timerId = window.setTimeout(this.scheduler, this.lookahead);
  }

  private start = () => {
    console.log('Metronome has started playing');
    this.currentNote = 0;
    this.nextNoteTime = audioContext.currentTime;
    this.scheduler();
  }

  private stop = () => {
    console.log('Metronome has stopped playing');
    this.functionOnNote = undefined;

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
      this.functionOnNote = functionOnNote;
      this.start();
    }
    else {
      this.stop();
    }
  }

  public setTempo = (tempo: number) => {
    this.setState({ tempo });
  }

  public togglePlaying = (functionOnNote: Function) => {
    this.setState((prevState: State) => ({
      isPlaying: !prevState.isPlaying,
    }), () => this.controlMetronome(functionOnNote));
  }

  public render() {
    const propsToSend = {
      ...this.state,
      setTempo: this.setTempo,
      togglePlaying: this.togglePlaying,
    };

    return this.props.children(propsToSend);
  }
}

export default Metronome;
