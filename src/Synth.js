import React, { Component } from 'react';
import Tone from './Tone';

class Synth extends Component {
  render() {
    return (
      <section>
        <Tone triggerKey='a' freq={261.63} ctx={this.props.audioContext} />
        <Tone triggerKey='s' freq={293.66} ctx={this.props.audioContext} />
        <Tone triggerKey='d' freq={329.63} ctx={this.props.audioContext} />
        <Tone triggerKey='f' freq={349.23} ctx={this.props.audioContext} />
        <Tone triggerKey='g' freq={392.00} ctx={this.props.audioContext} />
        <Tone triggerKey='h' freq={440.00} ctx={this.props.audioContext} />
        <Tone triggerKey='j' freq={493.88} ctx={this.props.audioContext} />
        <Tone triggerKey='k' freq={523.25} ctx={this.props.audioContext} />
      </section>
    );
  }
}

export default Synth;
