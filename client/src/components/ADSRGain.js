import React from 'react';

import { Label, ColumnFieldset, FieldsetHeader, LabeledInput } from './styled';

function ADSRGain(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Amp Envelope</FieldsetHeader>

      <LabeledInput>
        <Label htmlFor='attack'>Attack: {props.attack} sec</Label>
        <input
          id='attack'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.attack}
          onChange={props.handleADSRChange.setAttack}
        />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='decay'>Decay: {props.decay} sec</Label>
        <input
          id='decay'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.decay}
          onChange={props.handleADSRChange.setDecay}
        />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='sustain'>Sustain: {props.sustain} dB</Label>
        <input
          id='sustain'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.sustain}
          onChange={props.handleADSRChange.setSustain}
        />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='release'>Release: {props.release} sec</Label>
        <input
          id='release'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.release}
          onChange={props.handleADSRChange.setRelease}
        />
      </LabeledInput>
    </ColumnFieldset>
  );
}

export default ADSRGain;
