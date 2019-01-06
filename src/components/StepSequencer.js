import React from 'react';

import SequencerPad from './SequencerPad';
import { StepSequencerWrapper, StepSequencerRow, Label } from './styled';

function StepSequencer(props) {
  let sequencerRows = [];

  props.instruments.forEach((instrument, index) => {
    const instrumentEl = props.padStatus[instrument].map((isChecked, index) => (
      <SequencerPad
        key={index}
        handleClick={() => props.handlePadChange(instrument, index)}
        checked={isChecked}
        isPlaying={props.currentNote === index}
        sequencerOn={props.isPlaying}
      />
    ));

    const row = (
      <StepSequencerRow beatCount={props.barLength}>
        <Label>{instrument}: </Label>
        { instrumentEl }
      </StepSequencerRow>
    );

    sequencerRows.push(row);
  });

console.log(props.barLength)
  return (
    <StepSequencerWrapper instrumentCount={props.instruments.length}>
      { sequencerRows }
    </StepSequencerWrapper>
  );
}

export default StepSequencer;
