import React, { Component } from 'react';
import { LaunchpadWrapper, LaunchpadGrid } from './styled';

interface Props {
  metronome: object;
}

interface State {
}


class Launchpad extends Component <Props, State> {
  render() {
    const padStyle = {
      height: '40px',
      width: '40px',
      backgroundColor: '#f3f3f3',
    };

    return (
      <LaunchpadWrapper>
        <h3>Launchpad!</h3>
        <LaunchpadGrid>
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />

          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
          <div style={padStyle} />
        </LaunchpadGrid>
      </LaunchpadWrapper>
    );
  }
}

export default Launchpad;
