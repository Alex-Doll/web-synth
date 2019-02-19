import React from 'react';

import { ColumnFieldset, FieldsetHeader, LabeledInput, Label, Select, Option } from './styled';


function Generator(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Generator</FieldsetHeader>

      <LabeledInput>
        <Label htmlFor='waveType1'>Wave</Label>
        <Select id='waveType1' value={props.waveTypes.waveType1} onChange={props.handleWaveTypeChanges.setWaveType1}>
          <Option value='sine'>Sine</Option>
          <Option value='square'>Square</Option>
          <Option value='sawtooth'>Sawtooth</Option>
          <Option value='triangle'>Triangle</Option>
        </Select>
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='detune1'>Detune: {props.detunes.detune1} cents</Label>
        <input id='detune1' type='range' min='-100' max='100' value={props.detunes.detune1} onChange={props.handleDetuneChanges.setDetune1} />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='waveType2'>Wave</Label>
        <Select id='waveType2' value={props.waveTypes.waveType2} onChange={props.handleWaveTypeChanges.setWaveType2}>
          <Option value='sine'>Sine</Option>
          <Option value='square'>Square</Option>
          <Option value='sawtooth'>Sawtooth</Option>
          <Option value='triangle'>Triangle</Option>
        </Select>
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='detune2'>Detune: {props.detunes.detune2} cents</Label>
        <input id='detune2' type='range' min='-100' max='100' value={props.detunes.detune2} onChange={props.handleDetuneChanges.setDetune2} />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='oscMix'>Mix: {props.oscMix}</Label>
        <input id='oscMix' type='range' min='-1' max='1' step='0.5' value={props.oscMix} onChange={props.handleOscMixChange} />
      </LabeledInput>

    </ColumnFieldset>
  )  
}


export default Generator;
