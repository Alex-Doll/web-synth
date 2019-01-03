import React from 'react';

import { Label, ColumnFieldset, FieldsetHeader, Slider, Select, Option } from './styled';

function MasterControls(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Master Controls</FieldsetHeader>

      <Slider>
      <Label htmlFor='waveType'>Wave Type: </Label>
      <Select id='waveType' value={props.waveType} onChange={props.handleChange}>
        <Option value='sine'>Sine</Option>
        <Option value='square'>Square</Option>
        <Option value='sawtooth'>Sawtooth</Option>
        <Option value='triangle'>Triangle</Option>
      </Select>
      </Slider>

      <Slider>
      <Label htmlFor='masterGain'>Volume: {props.masterGain} dB</Label>
      <input id='masterGain' type='range' min='0' max='1' step='0.1' value={props.masterGain} onChange={props.handleGainChange} />
      </Slider>

      <Slider>
      <Label htmlFor='detune'>Detune: {props.detune} cents</Label>
      <input id='detune' type='range' min='-100' max='100' value={props.detune} onChange={props.handleDetuneChange} />
      </Slider>
    </ColumnFieldset>
  );
}

export default MasterControls;
