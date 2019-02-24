import React from 'react';

import { RowFieldset, FieldsetHeader, LabeledInput, Label, Select, Option } from './styled';


function OscillatorControls(props) {
  return (
    <RowFieldset>
      <LabeledInput>
        <input id={props.isOscOnName} type='checkbox' checked={props.isOscOn} onChange={props.handleIsOscOnChange} />
      </LabeledInput>
      <FieldsetHeader>OSC {props.number}</FieldsetHeader>
      <LabeledInput>
        <Label htmlFor={props.waveTypeName}>Wave</Label>
        <Select id={props.waveTypeName} value={props.waveType} onChange={props.handleWaveTypeChange}>
          <Option value='sine'>Sine</Option>
          <Option value='square'>Square</Option>
          <Option value='sawtooth'>Sawtooth</Option>
          <Option value='triangle'>Triangle</Option>
        </Select>
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor={props.detuneName}>Detune: {props.detune} cents</Label>
        <input id={props.detuneName} type='range' min='-100' max='100' value={props.detune} onChange={props.handleDetuneChange} />
      </LabeledInput>
    </RowFieldset>
  );
}


export default OscillatorControls;
