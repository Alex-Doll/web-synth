import React from 'react';

import { Label, ColumnFieldset, FieldsetHeader, LabeledInput } from './styled';

function MasterControls(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Master Controls</FieldsetHeader>

      <LabeledInput>
        <Label htmlFor='masterGain'>Volume: {props.masterGain} dB</Label>
        <input id='masterGain' type='range' min='0' max='1' step='0.1' value={props.masterGain} onChange={props.handleGainChange} />
      </LabeledInput>

    </ColumnFieldset>
  );
}

export default MasterControls;
