class AudioContextMock {
  constructor() {
  }

  createGain = jest.fn(() => ({
    gain: {
      value: null,
    }
  }));
}

global.AudioContext = AudioContextMock;
global.webkitAudioContext = AudioContextMock;
