import React, { Component } from 'react';


interface Props {
  children: (state: State) => React.ReactNode;
}

interface State {
  readonly tempo: number;
  readonly currentNote: number;
  readonly isPlaying: boolean;
}

class Metronome extends Component <Props, State> {
  constructor() {
    super(props);

    this.state = {
      tempo: 100,
      currentNote: 0,
      isPlaying: false,
    }
  }
}

export default Metronome;
