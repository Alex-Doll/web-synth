import React, { Component } from 'react';
import Tone from './Tone';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveType: 'sawtooth',
      masterGain: '0.5',
    };

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGainChange = (e) => {
    this.props.masterGainNode.gain.value = e.target.value;
    this.setState({
        masterGain: e.target.value,
    });
  }

  render() {
    return (
      <section>
        <Tone triggerKey='a' freq={261.63} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='s' freq={293.66} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='d' freq={329.63} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='f' freq={349.23} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='g' freq={392.00} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='h' freq={440.00} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='j' freq={493.88} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />
        <Tone triggerKey='k' freq={523.25} ctx={this.props.audioContext} waveType={this.state.waveType} masterGainNode={this.props.masterGainNode} />

        <select name='waveType' value={this.state.waveType} onChange={this.handleChange}>
          <option value='sine'>Sine</option>
          <option value='square'>Square</option>
          <option value='sawtooth'>Sawtooth</option>
          <option value='triangle'>Triangle</option>
        </select>

        <div>
          <input name='masterGain' type='range' min='0' max='1' step='0.1' value={this.state.masterGain} onChange={this.handleGainChange} />
          <p>Volume: {this.state.masterGain} dB</p>
        </div>
      </section>
    );
  }
}

export default Synth;
