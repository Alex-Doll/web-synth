import React from 'react';

import { Label, ColumnFieldset, FieldsetHeader, Slider } from './styled';

function ADSRGain(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>ADSR Gain Envelope</FieldsetHeader>

      <Slider>
        <Label htmlFor='attack'>Attack: {props.attack} sec</Label>
        <input
          id='attack'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.attack}
          onChange={props.handleADSRChange}
        />
      </Slider>

      <Slider>
        <Label htmlFor='decay'>Decay: {props.decay} sec</Label>
        <input
          id='decay'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.decay}
          onChange={props.handleADSRChange}
        />
      </Slider>

      <Slider>
        <Label htmlFor='sustain'>Sustain: {props.sustain} dB</Label>
        <input
          id='sustain'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.sustain}
          onChange={props.handleADSRChange}
        />
      </Slider>

      <Slider>
        <Label htmlFor='release'>Release: {props.release} sec</Label>
        <input
          id='release'
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={props.release}
          onChange={props.handleADSRChange}
        />
      </Slider>
    </ColumnFieldset>
  );
}

export default ADSRGain;
