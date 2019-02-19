import React, { useState } from 'react';
import SynthKey from './SynthKey';
import ADSRGain from './ADSRGain';
import MasterControls from './MasterControls';
import Generator from './Generator';
import {
  INITIAL_MASTER_GAIN,
  INITIAL_DETUNE_AMT,
  INITIAL_WAVE_TYPE,
  INITIAL_OSC_MIX,
  INITIAL_ADSR_GAIN_ATTACK,
  INITIAL_ADSR_GAIN_DECAY,
  INITIAL_ADSR_GAIN_SUSTAIN,
  INITIAL_ADSR_GAIN_RELEASE,
} from '../constants.js';
import { masterGainNode } from '../audio.tsx';


function Synth(props) {
  const [masterGain, setMasterGain] = useState(INITIAL_MASTER_GAIN);
  const [isOscOn1, setIsOscOn1] = useState(true);
  const [waveType1, setWaveType1] = useState(INITIAL_WAVE_TYPE);
  const [detune1, setDetune1] = useState(INITIAL_DETUNE_AMT);
  const [isOscOn2, setIsOscOn2] = useState(false);
  const [waveType2, setWaveType2] = useState(INITIAL_WAVE_TYPE);
  const [detune2, setDetune2] = useState(INITIAL_DETUNE_AMT);
  const [oscMix, setOscMix] = useState(INITIAL_OSC_MIX);
  const [attack, setAttack] = useState(INITIAL_ADSR_GAIN_ATTACK);
  const [decay, setDecay] = useState(INITIAL_ADSR_GAIN_DECAY);
  const [sustain, setSustain] = useState(INITIAL_ADSR_GAIN_SUSTAIN);
  const [release, setRelease] = useState(INITIAL_ADSR_GAIN_RELEASE);

  const toneMap = [
    { triggerKey: 'a', frequency: 261.63, note:'C4' },
    { triggerKey: 's', frequency: 293.66, note:'D4' },
    { triggerKey: 'd', frequency: 329.63, note:'E4' },
    { triggerKey: 'f', frequency: 349.23, note:'F4' },
    { triggerKey: 'g', frequency: 392.00, note:'G4' },
    { triggerKey: 'h', frequency: 440.00, note:'A4' },
    { triggerKey: 'j', frequency: 493.88, note:'B4' },
    { triggerKey: 'k', frequency: 523.25, note:'C5' },
  ];

  masterGainNode.gain.value = masterGain;

  const Tones = toneMap.map((tone, index) => (
    <SynthKey
      key={index}
      triggerKey={tone.triggerKey}
      freq={tone.frequency}
      waveType={waveType1}
      masterGainNode={masterGainNode}
      detune={detune1}
      adsrEnvelope={{
        attack: Number(attack),
        decay: Number(decay),
        sustain: Number(sustain),
        release: Number(release),
      }}
    />
  ));
  return (
    <section>
      <h2 style={{textAlign: 'center'}}>SYNTH</h2>
      <p style={{textAlign: 'center'}}>Use the a - k keys to play notes</p>
      { Tones }
      <div style={{display: 'flex'}}>
        <Generator
          oscs={{
            osc1: {
              isOscOnName: 'isOscOn1',
              isOscOn: isOscOn1,
              handleIsOscOnChange: (e) => setIsOscOn1(e.target.checked),
              waveTypeName: 'waveType1',
              waveType: waveType1,
              handleWaveTypeChange: (e) => setWaveType1(e.target.value),
              detuneName: 'detune1',
              detune: detune1,
              handleDetuneChange: (e) => setDetune1(e.target.value),
            },
            osc2: {
              isOscOnName: 'isOscOn2',
              isOscOn: isOscOn2,
              handleIsOscOnChange: (e) => setIsOscOn2(e.target.checked),
              waveTypeName: 'waveType2',
              waveType: waveType2,
              handleWaveTypeChange: (e) => setWaveType2(e.target.value),
              detuneName: 'detune2',
              detune: detune2,
              handleDetuneChange: (e) => setDetune2(e.target.value),
            },
          }}
          oscMix={oscMix}
          handleOscMixChange={(e) => setOscMix(e.target.value)}
        />
        <MasterControls
          masterGain={masterGain}
          handleGainChange={(e) => setMasterGain(e.target.value)}
        />

        <ADSRGain
          attack={attack}
          decay={decay}
          sustain={sustain}
          release={release}
          handleADSRChange={{
            setAttack: (e) => setAttack(e.target.value),
            setDecay: (e) => setDecay(e.target.value),
            setSustain: (e) => setSustain(e.target.value),
            setRelease: (e) => setRelease(e.target.value),
          }}
        />
      </div>
    </section>
  );
}


export default Synth;
