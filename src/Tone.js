import React, { Component } from 'react';

class Tone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      osc: null,
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
        osc.start();
        osc.connect(this.props.masterGainNode).connect(this.props.ctx.destination);
        this.setState({ osc });
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
      this.state.osc.detune.value = this.props.detune;
    }
  }

  render() {
    return null;
  }
}

export default Tone;
