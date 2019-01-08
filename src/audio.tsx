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

  public playFor(seconds: number, startTime: number = audioContext.currentTime) {
    this.connectToMaster(this.osc);
    this.osc.start(startTime);
    this.osc.stop(startTime + seconds);
  }

  private connectToMaster(source: any) {
    source.connect(masterGainNode).connect(audioContext.destination)
  }

  public connectToLFO(frequency: number = 10, waveType: any = 'sine', seconds: number, startTime: number = audioContext.currentTime) {
    const lfo = new Tone(frequency, 0, waveType);

    const amp = audioContext.createGain();
    amp.gain.setValueAtTime(1, audioContext.currentTime);

    lfo.osc.connect(amp.gain);

    this.connectToMaster(this.osc.connect(amp));
    lfo.osc.start(startTime);
    this.osc.start(startTime);
    this.osc.stop(startTime + seconds);
  }
}

export class Sample {
  public buffer: any;
  public source: any;
  public isPlaying: boolean = false;

  constructor(public path: string) {
    this.getFile(path).then(buffer => {
      this.buffer = buffer;
    })
    .catch(err => console.log(err));
  }

  private async getFile(filepath: string) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  private getSource(buffer: any) {
    return audioContext.createBufferSource();
  }

  public playSample(startTime: number = audioContext.currentTime, stopTime: number|undefined = undefined) {
    const source = this.getSource(this.buffer);
    source.buffer = this.buffer;
    source.playbackRate.setValueAtTime(1, startTime);
    source.connect(masterGainNode).connect(audioContext.destination);
    source.start(startTime);

    if (stopTime) {
      source.stop(stopTime);
    }
  }
}
