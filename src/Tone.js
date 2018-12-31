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
          type: this.props.waveType,
        });
        osc.start();
        osc.connect(this.props.ctx.destination);
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
    if (prevProps !== this.props) {
      console.log(this.props);
    }
  }

  render() {
    return null;
  }
}

export default Tone;
