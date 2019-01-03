import { INITIAL_MASTER_GAIN } from './constants';

export const audioContext = AudioContext ? new AudioContext() : new webkitAudioContext();

export const masterGainNode = audioContext.createGain();
masterGainNode.gain.value = INITIAL_MASTER_GAIN;


export class Tone {
  private osc: OscillatorNode;

  constructor(
    public frequency: number = 440,
    public detune: number = 0,
    public type: any = 'sine',
  ) {

    this.osc = new OscillatorNode(audioContext, {
      frequency,
      detune,
      type,
    });
  }

  public playFor(seconds: number) {
    this.connectToMaster(this.osc);
    this.osc.start();
    this.osc.stop(audioContext.currentTime + seconds);
  }

  private connectToMaster(source: any) {
    source.connect(masterGainNode).connect(audioContext.destination)
  }

  public connectToLFO(frequency: number = 10, waveType: any = 'sine', seconds: number) {
    const lfo = new Tone(frequency, 0, waveType);

    const amp = audioContext.createGain();
    amp.gain.setValueAtTime(1, audioContext.currentTime);

    lfo.osc.connect(amp.gain);

    this.connectToMaster(this.osc.connect(amp));
    lfo.osc.start();
    this.osc.start();
    this.osc.stop(audioContext.currentTime + seconds);
  }
}

export async function getFile(filepath: string) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export function playSample(audioBuffer: any) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.playbackRate.setValueAtTime(1, audioContext.currentTime);
  sampleSource.connect(masterGainNode).connect(audioContext.destination);
  sampleSource.start();
  return sampleSource;
}

export class Sample {
}
