import React, { Component } from 'react';
import { audioContext } from './audio';

class Tone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      osc: null,
      gain: null,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (event.key === this.props.triggerKey && !this.state.osc) {
        const osc = new OscillatorNode(this.props.ctx, {
          frequency: this.props.freq,
          detune: this.props.detune,
          type: this.props.waveType,
        });

        const adsrGain = audioContext.createGain();
        adsrGain.gain.value = 0;

        osc.start();
        osc.connect(adsrGain).connect(this.props.masterGainNode).connect(this.props.ctx.destination);

        adsrGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + this.props.adsrEnvelope.attack); // Attack

        this.setState({ osc, adsrGain });
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === this.props.triggerKey && this.state.osc) {
        this.state.osc.disconnect();
        this.setState({ osc: null });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detune !== this.props.detune && this.state.osc) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.osc.detune.value = this.props.detune;
    }
  }

  render() {
    return null;
  }
}

export default Tone;
