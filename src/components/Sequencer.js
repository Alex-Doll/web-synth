import React, { useState, useEffect, useRef } from 'react';
import { useMetronome } from '../hooks/Metronome';

import { SequencerWrapper } from './styled';
import SequencerControls from './SequencerControls';
import StepSequencer from './StepSequencer';
import SequencerInstrumentCreator from './SequencerInstrumentCreator';

import { audioContext, masterGainNode, Tone, Sample } from '../audio';
import soundfile from '../samples/LS_TM_BASSLOOP_023_125_C.wav';
import kickloop from '../samples/LS_TM_KICKLOOP_004_125.wav';
import snareloop from '../samples/LS_TM_SNARECLAPLOOP_004_125.wav';
import hatloop from '../samples/LS_TM_HATLOOP_012_125.wav';


function Sequencer(props) {
  const [barLength, setBarLength] = useState(4);
  const [instruments, setInstruments] = useState(['kick', 'snare', 'hat', 'bass']);
  const [padStatus, setPadStatus] = useState(initializePads());
  const [setIsPlaying, isPlaying, tempo, beat] = useMetronome();
  const [instrumentMap, setInstrumentMap] = useState({
    kick: null,
    snare: null,
    hat: null,
    bass: null,
  });

  const bassBuffer = useRef();
  const kickBuffer = useRef();
  const snareBuffer = useRef();
  const hatBuffer = useRef();

  const availableInstruments = {
    highNote: null,
    bassNote: null,
    modHighNote: null,
    modBassNote: null,
    sample: null,
    kick: null,
    snare: null,
    hat: null,
  };

  useEffect(() => {
    bassBuffer.current = new Sample(soundfile);
    kickBuffer.current = new Sample(kickloop);
    snareBuffer.current = new Sample(snareloop);
    hatBuffer.current = new Sample(hatloop);
  }, []);


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

  console.log(instruments);
  console.log(padStatus);
  console.log(instrumentMap);

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
