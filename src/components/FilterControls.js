import React from 'react';


import { ColumnFieldset, FieldsetHeader, RowFieldset, LabeledInput, Select, Option, Label } from './styled';


function FilterControls(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Filter</FieldsetHeader>

      <LabeledInput>
        <Label htmlFor='filter'>Type</Label>
        <Select id='filter' value={props.filter} onChange={props.handleFilterChange}>
          <Option value='lowpass'>Low Pass</Option>
          <Option value='highpass'>High Pass</Option>
          <Option value='bandpass'>Band Pass</Option>
        </Select>
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='filterCutoff'>Cutoff: {props.cutoff}</Label>
        <input id='filterCutoff' type='range' min='0.0' max='1.0' step='0.1' value={props.cutoff} onChange={props.handleCutoffChange} />
      </LabeledInput>
      <LabeledInput>
        <Label htmlFor='filterResonance'>Resonance: {props.resonance}</Label>
        <input id='filterResonance' type='range' min='0.0' max='1.0' step='0.1' value={props.resonance} onChange={props.handleResonanceChange} />
      </LabeledInput>
    </ColumnFieldset>
  )
}


export default FilterControls;
