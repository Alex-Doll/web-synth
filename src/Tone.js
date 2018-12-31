import React, { Component } from 'react';

class Tone extends Component {
  componentDidMount() {
    const osc = new OscillatorNode(this.props.ctx, {
      frequency: this.props.freq,
      type: this.props.waveType,
    });
    osc.start();

    document.addEventListener('keydown', (event) => {
      if (event.key === this.props.triggerKey) {
        osc.connect(this.props.ctx.destination);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === this.props.triggerKey) {
        osc.disconnect();
      }
    });
  }

  render() {
    return null;
  }
}

export default Tone;
