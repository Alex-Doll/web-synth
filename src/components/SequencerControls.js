import React from 'react';

import { LabeledInput, Label, Button, ColumnFieldset } from './styled';

function SequencerControls(props) {
  return (
    <ColumnFieldset>
      <label htmlFor='tempo'>Tempo: {props.tempo} bpm</label>
      <input id='tempo' type='range' min='1' max='120' step='1.0' value={props.tempo} onChange={props.handleTempoChange} />
      <Button onClick={props.handlePlayStop}>
        {props.isPlaying ? 'Stop' : 'Play'}
      </Button>
    </ColumnFieldset>
  );
}

export default SequencerControls;
