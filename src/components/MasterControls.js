import React from 'react';

import { Label } from './styled';

function MasterControls(props) {
  return (
    <fieldset style={{display: 'flex', flexDirection: 'column'}}>
      <legend>Master Controls</legend>
      <Label htmlFor='waveType'>Wave Type: </Label>
      <select id='waveType' value={props.waveType} onChange={props.handleChange}>
        <option value='sine'>Sine</option>
        <option value='square'>Square</option>
        <option value='sawtooth'>Sawtooth</option>
        <option value='triangle'>Triangle</option>
      </select>

      <Label htmlFor='masterGain'>Volume: {props.masterGain} dB</Label>
      <input id='masterGain' type='range' min='0' max='1' step='0.1' value={props.masterGain} onChange={props.handleGainChange} />

      <Label htmlFor='detune'>Detune: {props.detune} cents</Label>
      <input id='detune' type='range' min='-100' max='100' value={props.detune} onChange={props.handleDetuneChange} />
    </fieldset>
  );
}

export default MasterControls;
