import React, { Component } from 'react';
import Tone from './Tone';
import { INITIAL_MASTER_GAIN, INITIAL_DETUNE_AMT } from './constants.js';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveType: 'sawtooth',
      masterGain: INITIAL_MASTER_GAIN,
      detune: INITIAL_DETUNE_AMT,
    };

    this.toneMap = [
      { triggerKey: 'a', frequency: 261.63, note:'C4' },
      { triggerKey: 's', frequency: 293.66, note:'D4' },
      { triggerKey: 'd', frequency: 329.63, note:'E4' },
      { triggerKey: 'f', frequency: 349.23, note:'F4' },
      { triggerKey: 'g', frequency: 392.00, note:'G4' },
      { triggerKey: 'h', frequency: 440.00, note:'A4' },
      { triggerKey: 'j', frequency: 493.88, note:'B4' },
      { triggerKey: 'k', frequency: 523.25, note:'C5' },
    ];
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

  handleDetuneChange = (e) => {
    this.setState({
      detune: e.target.value,
    });
  }

  render() {
    const Tones = this.toneMap.map((tone, index) => (
      <Tone
        key={index}
        triggerKey={tone.triggerKey}
        freq={tone.frequency}
        ctx={this.props.audioContext}
        waveType={this.state.waveType}
        masterGainNode={this.props.masterGainNode}
        detune={this.state.detune}
      />
    ));
    return (
      <section>
        { Tones }

        <select name='waveType' value={this.state.waveType} onChange={this.handleChange}>
          <option value='sine'>Sine</option>
          <option value='square'>Square</option>
          <option value='sawtooth'>Sawtooth</option>
          <option value='triangle'>Triangle</option>
        </select>

        <div>
          <input name='masterGain' type='range' min='0' max='1' step='0.1' value={this.state.masterGain} onChange={this.handleGainChange} />
          <p>Volume: {this.state.masterGain} dB</p>

          <input name='detune' type='range' min='-100' max='100' value={this.state.detune} onChange={this.handleDetuneChange} />
          <p>Detune: {this.state.detune} cents</p>
        </div>
      </section>
    );
  }
}

export default Synth;
