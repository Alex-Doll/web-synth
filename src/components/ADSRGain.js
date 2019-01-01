import React from 'react';

function ADSRGain(props) {
  return (
    <fieldset style={{display: 'flex', flexDirection: 'column'}}>
      <legend>ADSR Gain Envelope</legend>
      <label htmlFor='attack'>Attack: {props.attack} sec</label>
      <input
        id='attack'
        type='range'
        min='0'
        max='1'
        step='0.1'
        value={props.attack}
        onChange={props.handleADSRChange}
      />

      <label htmlFor='decay'>Decay: {props.decay} sec</label>
      <input
        id='decay'
        type='range'
        min='0'
        max='1'
        step='0.1'
        value={props.decay}
        onChange={props.handleADSRChange}
      />

      <label htmlFor='sustain'>Sustain: {props.sustain} dB</label>
      <input
        id='sustain'
        type='range'
        min='0'
        max='1'
        step='0.1'
        value={props.sustain}
        onChange={props.handleADSRChange}
      />

      <label htmlFor='release'>Release: {props.release} sec</label>
      <input
        id='release'
        type='range'
        min='0'
        max='1'
        step='0.1'
        value={props.release}
        onChange={props.handleADSRChange}
      />
    </fieldset>
  );
}

export default ADSRGain;
