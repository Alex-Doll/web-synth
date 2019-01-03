import React, { Component } from 'react';
import Tone from './Tone';
import ADSRGain from './ADSRGain';
import MasterControls from './MasterControls';
import {
  INITIAL_MASTER_GAIN,
  INITIAL_DETUNE_AMT,
  INITIAL_ADSR_GAIN_ATTACK,
  INITIAL_ADSR_GAIN_DECAY,
  INITIAL_ADSR_GAIN_SUSTAIN,
  INITIAL_ADSR_GAIN_RELEASE,
} from '../constants.js';
import { masterGainNode } from '../audio.tsx';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveType: 'sawtooth',
      masterGain: INITIAL_MASTER_GAIN,
      detune: INITIAL_DETUNE_AMT,
      attack: INITIAL_ADSR_GAIN_ATTACK,
      decay: INITIAL_ADSR_GAIN_DECAY,
      sustain: INITIAL_ADSR_GAIN_SUSTAIN,
      release: INITIAL_ADSR_GAIN_RELEASE,
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
      [e.target.id]: e.target.value,
    });
  }

  handleGainChange = (e) => {
    masterGainNode.gain.value = e.target.value;
    this.setState({
      masterGain: e.target.value,
    });
  }

  handleDetuneChange = (e) => {
    this.setState({
      detune: e.target.value,
    });
  }

  handleADSRChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const Tones = this.toneMap.map((tone, index) => (
      <Tone
        key={index}
        triggerKey={tone.triggerKey}
        freq={tone.frequency}
        waveType={this.state.waveType}
        masterGainNode={masterGainNode}
        detune={this.state.detune}
        adsrEnvelope={{
          attack: Number(this.state.attack),
          decay: Number(this.state.decay),
          sustain: Number(this.state.sustain),
          release: Number(this.state.release),
        }}
      />
    ));
    return (
      <section>
        <h2 style={{textAlign: 'center'}}>SYNTH</h2>
        <p style={{textAlign: 'center'}}>Use the a - k keys to play notes</p>
        { Tones }
        <div style={{display: 'flex'}}>
          <MasterControls
            waveType={this.state.waveType}
            handleChange={this.handleChange}
            masterGain={this.state.masterGain}
            handleGainChange={this.handleGainChange}
            detune={this.state.detune}
            handleDetuneChange={this.handleDetuneChange}
          />

          <ADSRGain
            attack={this.state.attack}
            decay={this.state.decay}
            sustain={this.state.sustain}
            release={this.state.release}
            handleADSRChange={this.handleADSRChange}
          />
        </div>
      </section>
    );
  }
}

export default Synth;
