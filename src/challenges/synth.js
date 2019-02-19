import React from 'react';

import Synth from '../components/Synth';


export const synthChallenges = [
  {
    pathName: 'challenge1',
    title: 'Play the Synth!',
    isComplete: false,
    tests: [
      {
        name: 'Unlock the next challenge',
        description: 'To unlock the next challenge just click RUN TESTS and make sure you pass all of the tests! (I think you will pass the one easy)',
        func: () => {
          return true;
        },
      },
    ],
    content: <Synth />,
  },
  {
    pathName: 'challenge2',
    title: 'Change the volume',
    isComplete: false,
    tests: [
      {
        name: 'Set Volume',
        description: 'Change the master volume of the synth to 0.5 dB',
        func: () => {
          const volumeSlider = document.getElementById('masterGain');
          return volumeSlider.value === '0.5';
        },
      },
    ],
    content: <Synth />,
  },
  {
    pathName: 'challenge3',
    title: 'Setting the wave type',
    isComplete: false,
    tests: [
      {
        name: 'First Wave',
        description: 'Change the wave type of oscillator 1 to Triangle',
        func: () => {
          const wavePicker = document.getElementById('waveType1');
          return wavePicker.value === 'triangle';
        },
      },
      {
        name: 'Second Wave',
        description: 'Change the wave type of oscillator 2 to Sine',
        func: () => {
          const wavePicker = document.getElementById('waveType2');
          return wavePicker.value === 'sine';
        },
      },
    ],
    content: <Synth showGenerator />,
  },
];
