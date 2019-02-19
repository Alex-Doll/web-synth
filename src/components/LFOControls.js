import React from 'react';


import { ColumnFieldset, FieldsetHeader, RowFieldset, LabeledInput, Label, Select, Option } from './styled';


function LFOControls(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>LFO</FieldsetHeader>

      <RowFieldset>
        <LabeledInput>
          <Label htmlFor='lfoMono'>Mono</Label>
          <input type='radio' id='lfoMono' name='lfoType' value='mono' checked={props.lfoType === 'mono'} onChange={props.handleLFOTypeChange} />
        </LabeledInput>
        <LabeledInput>
          <Label htmlFor='lfoPoly'>Poly</Label>
          <input type='radio' id='lfoPoly' name='lfoType' value='poly' checked={props.lfoType === 'poly'} onChange={props.handleLFOTypeChange} />
        </LabeledInput>
      </RowFieldset>

      <RowFieldset>
        <LabeledInput>
          <Label htmlFor='lfoWaveType'>Wave</Label>
          <Select id='lfoWaveType' value={props.waveType} onChange={props.handleWaveTypeChange}>
            <Option value='sine'>Sine</Option>
            <Option value='square'>Square</Option>
            <Option value='sawtooth'>Sawtooth</Option>
            <Option value='triangle'>Triangle</Option>
          </Select>
        </LabeledInput>

        <LabeledInput>
          <Label htmlFor='lfoTrigger'>Trigger</Label>
          <input type='checkbox' id='lfoTrigger' checked={props.isTrigger} onChange={props.handleIsTriggerChange} />
        </LabeledInput>
      </RowFieldset>

      <RowFieldset>
        <LabeledInput>
          <Label htmlFor='lfoAmt'>Amount: {props.amount}</Label>
          <input id='lfoAmt' type='range' min='0.1' max='1.0' step='0.1' value={props.amount} onChange={props.handleAmountChange} />
        </LabeledInput>

        <LabeledInput>
          <Label htmlFor='lfoRate'>Rate: {props.rate == 1 ? '1 bar' : `1/${props.rate}`}</Label>
          <input id='lfoRate' type='range' min='1' max='32' value={props.rate} onChange={props.handleRateChange} />
        </LabeledInput>
      </RowFieldset>

      <LabeledInput>
        <Label htmlFor='lfoDest'>Dest</Label>
        <Select id='lfoDest' value={props.dest} onChange={props.handleDestChange}>
          <Option value='off'>Off</Option>
          <Option value='osc1'>Osc 1</Option>
          <Option value='osc2'>Osc 2</Option>
        </Select>
      </LabeledInput>
    </ColumnFieldset>
  );
}


export default LFOControls;
