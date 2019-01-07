import React, { Component } from 'react';

import { LabeledInput, Label, Button, ColumnFieldset, Select, Option } from './styled';

class SequencerInstrumentCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instrumentName: '',
      instrumentType: this.props.instruments[0],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    return (
      <ColumnFieldset>
        <LabeledInput>
          <Label htmlFor='instrumentName'>Instrument Name</Label>
          <input type='text' id='instrumentName' onChange={this.handleChange} value={this.state.instrumentName} />
        </LabeledInput>

        <LabeledInput>
          <Label htmlFor='instrumentType'>Instrument Type: </Label>
          <Select id='instrumentType' value={this.state.instrumentType} onChange={this.handleChange}>
            { this.props.instruments.map((instrument, index) => (
              <Option
                key={index}
                value={instrument}
              >{instrument}</Option>
            )) }
          </Select>
        </LabeledInput>

        <Button onClick={() => {
          this.setState({ instrumentName: '' });
          this.props.addInstrument(this.state.instrumentName, this.state.instrumentType);
        }}>Add Instrument</Button>
      </ColumnFieldset>
    );
  }
}

export default SequencerInstrumentCreator;
