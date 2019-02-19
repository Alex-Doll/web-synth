import React from 'react';

import OscillatorControls from './OscillatorControls';
import { ColumnFieldset, FieldsetHeader, LabeledInput, Label } from './styled';


function Generator(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Generator</FieldsetHeader>

      <OscillatorControls {...props.oscs.osc1} />
      <OscillatorControls {...props.oscs.osc2} />

      <LabeledInput>
        <Label htmlFor='oscMix'>Mix: {props.oscMix}</Label>
        <input id='oscMix' type='range' min='-1' max='1' step='0.5' value={props.oscMix} onChange={props.handleOscMixChange} />
      </LabeledInput>

    </ColumnFieldset>
  )  
}


export default Generator;
