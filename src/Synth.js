import React, { Component } from 'react';
import Tone from './Tone';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveType: 'sawtooth',
    };

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <section>
        <Tone triggerKey='a' freq={261.63} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='s' freq={293.66} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='d' freq={329.63} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='f' freq={349.23} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='g' freq={392.00} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='h' freq={440.00} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='j' freq={493.88} ctx={this.props.audioContext} waveType={this.state.waveType} />
        <Tone triggerKey='k' freq={523.25} ctx={this.props.audioContext} waveType={this.state.waveType} />

        <select name='waveType' value={this.state.waveType} onChange={this.handleChange}>
          <option value='sine'>Sine</option>
          <option value='square'>Square</option>
          <option value='sawtooth'>Sawtooth</option>
          <option value='triangle'>Triangle</option>
        </select>
      </section>
    );
  }
}

export default Synth;
