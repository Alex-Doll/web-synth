import React from 'react';


import { ColumnFieldset, FieldsetHeader, LabeledInput, Label, Select, Option } from './styled';


function ModulationEnvelope(props) {
  return (
    <ColumnFieldset>
      <FieldsetHeader>Mod Envelope</FieldsetHeader>

      <LabeledInput>
        <Label htmlFor='modEnvDest'>Dest</Label>
        <Select id='modEnvDest' value={props.dest} onChange={props.handleDestChange}>
          <Option value='off'>Off</Option>
          <Option value='osc1'>Osc 1</Option>
          <Option value='osc2'>Osc 2</Option>
        </Select>
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='modEnvAmt'>Amount: {props.amount}</Label>
        <input id='modEnvAmt' type='range' min='0.0' max='1.0' step='0.1' value={props.amount} onChange={props.handleAmountChange} />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='modEnvAttack'>Attack: {props.attack} sec</Label>
        <input id='modEnvAttack' type='range' min='0.0' max='1.0' step='0.1' value={props.attack} onChange={props.handleAttackChange} />
      </LabeledInput>

      <LabeledInput>
        <Label htmlFor='modEnvDecay'>Decay: {props.decay} sec</Label>
        <input id='modEnvDecay' type='range' min='0.0' max='1.0' step='0.1' value={props.decay} onChange={props.handleDecayChange} />
      </LabeledInput>
    </ColumnFieldset>
  );
}


export default ModulationEnvelope;
