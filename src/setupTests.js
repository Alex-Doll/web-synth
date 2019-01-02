export class AudioContextMock {
  constructor() {
    this.type = 'AudioContext';
  }

  createGain = jest.fn(() => ({
    gain: {
      value: null,
    }
  }));
}

export class webkitAudioContextMock extends AudioContextMock {
  constructor() {
    super();
    this.type = 'webkitAudioContext';
  }
}

global.AudioContext = AudioContextMock;
global.webkitAudioContext = webkitAudioContextMock;
