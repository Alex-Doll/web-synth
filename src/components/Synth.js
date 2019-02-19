import React, { useState } from 'react';
import SynthKey from './SynthKey';
import ADSRGain from './ADSRGain';
import MasterControls from './MasterControls';
import Generator from './Generator';
import FilterControls from './FilterControls';
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
  const [filter, setFilter] = useState('lowpass');
  const [filterCutoff, setFilterCutoff] = useState(1.0);
  const [filterResonance, setFilterResonance] = useState(1.0);


  const toneMap = [
    { triggerKey: 'z', frequency: 130.81, note:'C3' },
    { triggerKey: 'x', frequency: 146.83, note:'D3' },
    { triggerKey: 'c', frequency: 164.81, note:'E3' },
    { triggerKey: 'v', frequency: 174.61, note:'F3' },
    { triggerKey: 'b', frequency: 196.00, note:'G3' },
    { triggerKey: 'n', frequency: 220.00, note:'A3' },
    { triggerKey: 'm', frequency: 246.94, note:'B3' },
    { triggerKey: ',', frequency: 261.63, note:'C4' },
    { triggerKey: 'a', frequency: 261.63, note:'C4' },
    { triggerKey: 's', frequency: 293.66, note:'D4' },
    { triggerKey: 'd', frequency: 329.63, note:'E4' },
    { triggerKey: 'f', frequency: 349.23, note:'F4' },
    { triggerKey: 'g', frequency: 392.00, note:'G4' },
    { triggerKey: 'h', frequency: 440.00, note:'A4' },
    { triggerKey: 'j', frequency: 493.88, note:'B4' },
    { triggerKey: 'k', frequency: 523.25, note:'C5' },
    { triggerKey: 'q', frequency: 523.25, note:'C5' },
    { triggerKey: 'w', frequency: 587.33, note:'D5' },
    { triggerKey: 'e', frequency: 659.25, note:'E5' },
    { triggerKey: 'r', frequency: 698.46, note:'F5' },
    { triggerKey: 't', frequency: 783.99, note:'G5' },
    { triggerKey: 'y', frequency: 880.00, note:'A5' },
    { triggerKey: 'u', frequency: 987.77, note:'B5' },
    { triggerKey: 'i', frequency: 1046.50, note:'C6' },
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
        <FilterControls
          filter={filter}
          handleFilterChange={(e) => setFilter(e.target.value)}
          cutoff={filterCutoff}
          handleCutoffChange={(e) => setFilterCutoff(e.target.value)}
          resonance={filterResonance}
          handleResonanceChange={(e) => setFilterResonance(e.target.value)}
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
