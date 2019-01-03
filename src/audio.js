import { INITIAL_MASTER_GAIN } from './constants';

export const audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();

export const masterGainNode = audioContext.createGain();
masterGainNode.gain.value = INITIAL_MASTER_GAIN;


export class Tone {
  constructor(frequency = 440, detune = 0, type = 'sine') {
    this.frequency = frequency;
    this.detune = detune;
    this.type = type;

    this.osc = new OscillatorNode(audioContext, {
      frequency,
      detune,
      type,
    });
  }
}
