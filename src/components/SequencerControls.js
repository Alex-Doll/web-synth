import React from 'react';

import { LabeledInput, Label, Button, RowFieldset } from './styled';

function SequencerControls(props) {
  return (
    <RowFieldset>
      <LabeledInput>
        <Label htmlFor='tempo'>Tempo: {props.tempo} bpm</Label>
        <input id='tempo' type='range' min='1' max='120' step='1.0' value={props.tempo} onChange={props.handleTempoChange} />
      </LabeledInput>
      <Button onClick={props.handlePlayStop}>
        {props.isPlaying ? 'Stop' : 'Play'}
      </Button>
    </RowFieldset>
  );
}

export default SequencerControls;
