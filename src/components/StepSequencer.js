import React from 'react';

import SequencerPad from './SequencerPad';
import { StepSequencerWrapper, Label } from './styled';

function StepSequencer(props) {
  let pads = {};

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
    pads[instrument] = instrumentEl;
  });
console.log(props.barLength)
  return (
    <StepSequencerWrapper beatCount={props.barLength} instrumentCount={props.instruments.length}>
      <Label>Note: </Label>
      { pads['note'] }

      <Label>OscNote: </Label>
      { pads['oscNote'] }

      <Label>Sample: </Label>
      { pads['sample'] }

      <Label>Low: </Label>
      { pads['note2'] }
    </StepSequencerWrapper>
  );
}

export default StepSequencer;
