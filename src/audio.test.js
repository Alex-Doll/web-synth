/* import { audioContext } from './audio'; */
import { AudioContextMock } from './setupTests';

function getAudioContext(audioContextExists = true) {
  if (!audioContextExists) {
    global.AudioContext = null;
  }

  jest.resetModules();
  return require('./audio').audioContext;
}

it('loads AudioContext when AudioContext is present on window', () => {
  const audioContext = getAudioContext(true);
  expect(audioContext.type).toEqual('AudioContext');
});

it('loads webkitAudioContext when AudioContext is not present on window', () => {
  const audioContext = getAudioContext(false);
  expect(audioContext.type).toEqual('webkitAudioContext');
});
