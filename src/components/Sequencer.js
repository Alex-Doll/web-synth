import React, { useState, useEffect, useRef } from 'react';
import { useMetronome } from '../hooks/Metronome';

import { SequencerWrapper } from './styled';
import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import SequencerInstrumentCreator from './SequencerInstrumentCreator';

import { Tone, Sample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';
import kickloop from '../samples/LS_TM_KICKLOOP_004_125.wav';
import snareloop from '../samples/LS_TM_SNARECLAPLOOP_004_125.wav';
import hatloop from '../samples/LS_TM_HATLOOP_012_125.wav';


function Sequencer(props) {
  const barLength = 4;
  const [instruments, setInstruments] = useState(['kick', 'snare', 'hat', 'bass']);
  const [padStatus, setPadStatus] = useState(initializePads());
  const [setIsPlaying, isPlaying, tempo, beat] = useMetronome(playNotes);
  const [instrumentMap, setInstrumentMap] = useState({
    kick: playBuffer.bind(this, 'kick'),
    snare: playBuffer.bind(this, 'snare'),
    hat: playBuffer.bind(this, 'hat'),
    bass: playFreq.bind(this, 60),
  });

  // Sample Buffers
  const bassBuffer = useRef();
  const kickBuffer = useRef();
  const snareBuffer = useRef();
  const hatBuffer = useRef();

  const availableInstruments = {
    highNote: playFreq.bind(this, 440),
    bassNote: playFreq.bind(this, 60),
    modHighNote: playModulatedFreq.bind(this, 440, 5),
    modBassNote: playModulatedFreq.bind(this, 60, 5),
    sample: playBuffer.bind(this, 'bass'),
    kick: playBuffer.bind(this, 'kick'),
    snare: playBuffer.bind(this, 'snare'),
    hat: playBuffer.bind(this, 'hat'),
  };

  useEffect(() => {
    bassBuffer.current = new Sample(soundfile);
    kickBuffer.current = new Sample(kickloop);
    snareBuffer.current = new Sample(snareloop);
    hatBuffer.current = new Sample(hatloop);
  }, []);

  
  function playNotes({ beatNumber, time }) {
    for (let key in padStatus) {
      if (padStatus[key][beatNumber]) {
        instrumentMap[key]({ beatNumber, time });
      }
    }
  }

  function playBuffer(buffer, { beatNumber, time }) {
    const secondsPerBeat = 60 / tempo.tempo;
    const startTime = time;
    const stopTime = startTime + secondsPerBeat;

    switch (buffer) {
      case 'kick':
        kickBuffer.current.playSample(startTime, stopTime);
        break;
      case 'snare':
        snareBuffer.current.playSample(startTime, stopTime);
        break;
      case 'hat':
        hatBuffer.current.playSample(startTime, stopTime);
        break;
      case 'bass':
        bassBuffer.current.playSample(startTime, stopTime);
        break;
      default:
        bassBuffer.current.playSample(startTime, stopTime);
        console.log('Sample not found for: ' + buffer);
    }
  }

  function playFreq(frequency, { beatNumber, time }) {
    const secondsPerBeat = 60 / tempo.tempo;
    const tone = new Tone(frequency);
    tone.playFor(secondsPerBeat, time);
  }

  function playModulatedFreq(toneFreq, modFreq, { beatNumber, time }) {
    const secondsPerBeat = 60 / tempo.tempo;
    const tone = new Tone(toneFreq, 0, 'triangle');
    tone.connectToLFO(modFreq, 'sine', secondsPerBeat, time);
  }

  function initializePads() {
    let padStatus = {};
    instruments.forEach((instrument, index) => {
      padStatus[instrument] = new Array(barLength).fill(false);
    });

    return padStatus
  }

  function handlePadChange(instrument, index) {
    let instrumentStatus = [...padStatus[instrument]];
    instrumentStatus[index] = !instrumentStatus[index];
    setPadStatus({
      ...padStatus,
      [instrument]: instrumentStatus,
    });
  }

  function addInstrument(name, type) {
    setInstruments([...instruments, name]);

    setPadStatus({
      ...padStatus,
      [name]: new Array(barLength).fill(false),
    });

    setInstrumentMap({
      ...instrumentMap,
      [name]: availableInstruments[type],
    });
  }

  function removeInstrument(name) {
    const filteredInstruments = instruments.filter(instrument => instrument !== name);
    setInstruments(filteredInstruments);

    const { [name]: padValue, ...filteredPadStatus } = padStatus;
    setPadStatus(filteredPadStatus);

    const { [name]: mapValue, ...filteredInstrumentMap } = instrumentMap;
    setInstrumentMap(filteredInstrumentMap);
  }

  return (
    <SequencerWrapper>
      <h2 style={{textAlign: 'center'}}>SEQUENCER</h2>
      <SequencerControls
        tempo={tempo.tempo}
        handleTempoChange={tempo.setTempo}
        isPlaying={isPlaying}
        handlePlayStop={() => setIsPlaying(!isPlaying)}
      />
      <StepSequencer
        instruments={instruments}
        padStatus={padStatus}
        handlePadChange={handlePadChange}
        currentNote={beat}
        isPlaying={isPlaying}
        barLength={barLength}
        removeInstrument={removeInstrument}
      />
      <SequencerInstrumentCreator
        addInstrument={addInstrument}
        instruments={Object.keys(availableInstruments)}
      />
    </SequencerWrapper>
  );
}


export default Sequencer;
