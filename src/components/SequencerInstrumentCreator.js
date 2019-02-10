import React, { Component, useState } from 'react';

import { LabeledInput, Label, Button, ColumnFieldset, Select, Option } from './styled';


function SequencerInstrumentCreator(props) {
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentType, setInstrumentType] = useState(props.instruments[0]);
  return (
    <ColumnFieldset>
      <LabeledInput>
        <Label htmlFor='instrumentName'>Instrument Name</Label>
        <input type='text' id='instrumentName' onChange={(e) => setInstrumentName(e.target.value)} value={instrumentName} />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='instrumentType'>Instrument Type: </Label>
        <Select id='instrumentType' value={instrumentType} onChange={(e) => setInstrumentType(e.target.value)}>
          { props.instruments.map((instrument, index) => (
            <Option
              key={index}
              value={instrument}
              >{instrument}</Option>
          )) }
        </Select>
      </LabeledInput>

      <Button onClick={() => {
        setInstrumentName('');
        props.addInstrument(instrumentName, instrumentType);
      }}>Add Instrument</Button>
    </ColumnFieldset>
  );
}

export default SequencerInstrumentCreator;
