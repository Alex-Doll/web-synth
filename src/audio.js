import { INITIAL_MASTER_GAIN } from './constants';

export const audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();

export const masterGainNode = audioContext.createGain();
masterGainNode.gain.value = INITIAL_MASTER_GAIN;
