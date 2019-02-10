import React, { useState, useEffect, useRef } from 'react';
import { LaunchpadWrapper, LaunchpadGrid } from './styled';
import { Sample } from '../audio';

import { useMetronome } from '../hooks/Metronome';

import drumloop1 from '../samples/LS_PTH_FULL_DRUMLOOP_012_125.wav';
import drumloop2 from '../samples/LS_PTH_FULL_DRUMLOOP_025_125.wav';
import drumloop3 from '../samples/LS_TM_DRUMLOOP_017_125.wav';
import drumloop4 from '../samples/LS_TM_DRUMLOOP_042_125.wav';

import bassloop1 from '../samples/LS_TM_BASSLOOP_023_125_C.wav';
import bassloop2 from '../samples/LS_TM_BASSLOOP_030_125_Am.wav';
import bassloop3 from '../samples/LS_PTH_BASSLOOP_027_125_Bm.wav';
import bassloop4 from '../samples/LS_PTH_SYNTHHIT_008_125_Gm.wav';

import synthloop1 from '../samples/LS_PTH_SYNTHLOOP_015_125_Fm.wav';
import synthloop2 from '../samples/LS_PTH_SYNTHLOOP_016_125_Fm.wav';
import synthloop3 from '../samples/LS_TM_SYNTHLOOP_010_125_E.wav';
import synthloop4 from '../samples/LS_TM_SYNTHLOOP_049_125_B.wav';

import fxloop1 from '../samples/LS_PTH_TOPLOOP_011_125.wav';
import fxloop2 from '../samples/LS_PTH_FXLOOP_003_125_Cm.wav';
import fxloop3 from '../samples/LS_TM_FXLOOP_011_125_F.wav';
import fxloop4 from '../samples/LS_TM_FXLOOP_018_125_F.wav';


function Launchpad2(props) {
  const [instrumentState, setInstrumentState] = useState({
    drums: ['stopped', 'stopped', 'stopped', 'stopped'],
    basses: ['stopped', 'stopped', 'stopped', 'stopped'],
    synths: ['stopped', 'stopped', 'stopped', 'stopped'],
    fxs: ['stopped', 'stopped', 'stopped', 'stopped'],
  });

  const instruments = ['drums', 'basses', 'synths', 'fxs'];
  const drumSamples = useRef([null, null, null, null]);
  const bassSamples = useRef([null, null, null, null]);
  const synthSamples = useRef([null, null, null, null]);
  const fxSamples = useRef([null, null, null, null]);

  const sampleMap = {
    drums: drumSamples,
    basses: bassSamples,
    synths: synthSamples,
    fxs: fxSamples,
  };

  const initialTempo = 125;
  const barLength = 4;

  useEffect(() => {
    loadSamples();
  }, []);

  function triggerOnBeat({ beatNumber, time }) {
    const secondsPerBar = (60 / initialTempo) * barLength;

    if (beatNumber === 0) {
      instruments.forEach((instrument, instrumentIndex) => {
        instrumentState[instrument].forEach((instrumentStatus, index) => {
          if (instrumentStatus === 'prepPlay') {
            sampleMap[instrument].current[index].playSample(time, time + secondsPerBar);
            console.log('switching to PLAY!!!');
            console.log(instrumentState);
            const newInstrument = [...instrumentState[instrument]];
            newInstrument[index] = 'playing';
            setInstrumentState({
              ...instrumentState,
              [instrument]: newInstrument,
            });
          }
          else if (instrumentStatus === 'prepStop') {
            const newInstrument = [...instrumentState[instrument]];
            newInstrument[index] = 'stopped';
            setInstrumentState({
              ...instrumentState,
              [instrument]: newInstrument,
            });
          }
          else if (instrumentStatus === 'playing') {
            sampleMap[instrument].current[index].playSample(time, time + secondsPerBar);
          }
        });
      });
    }
  }

  const [setIsPlaying, {tempo, setTempo}, isPlaying] = useMetronome(triggerOnBeat, 1, barLength, initialTempo);

  function loadSamples() {
    drumSamples.current[0] = new Sample(drumloop1);
    drumSamples.current[1] = new Sample(drumloop2);
    drumSamples.current[2] = new Sample(drumloop3);
    drumSamples.current[3] = new Sample(drumloop4);
    
    bassSamples.current[0] = new Sample(bassloop1);
    bassSamples.current[1] = new Sample(bassloop2);
    bassSamples.current[2] = new Sample(bassloop3);
    bassSamples.current[3] = new Sample(bassloop4);
    
    synthSamples.current[0] = new Sample(synthloop1);
    synthSamples.current[1] = new Sample(synthloop2);
    synthSamples.current[2] = new Sample(synthloop3);
    synthSamples.current[3] = new Sample(synthloop4);
    
    fxSamples.current[0] = new Sample(fxloop1);
    fxSamples.current[1] = new Sample(fxloop2);
    fxSamples.current[2] = new Sample(fxloop3);
    fxSamples.current[3] = new Sample(fxloop4);
  }

  function handleClick(evt, instrument, index) {
    if (!isPlaying) {
      setIsPlaying(true);
    }

    const instrumentStatus = instrumentState[instrument][index];
    if (instrumentStatus === 'playing') {
      const newInstrument = [...instrumentState[instrument]];
      newInstrument[index] = 'prepStop';
      setInstrumentState({
        ...instrumentState,
        [instrument]: newInstrument,
      });
    }
    else if (instrumentStatus === 'stopped') {
      const newInstrument = [...instrumentState[instrument]];
      newInstrument[index] = 'prepPlay';
      setInstrumentState({
        ...instrumentState,
        [instrument]: newInstrument,
      });
    }
  }


  const colorMap = {
    prepPlay: 'orange',
    playing: 'green',
    prepStop: 'yellow',
    stopped: 'red',
  };

  const padStyle = {
    height: '40px',
    width: '40px',
    backgroundColor: '#f3f3f3',
  };

  return (
    <LaunchpadWrapper>
      <h3>Launchpad!</h3>
      <LaunchpadGrid>
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.drums[0]]}} onClick={(e) => handleClick(e, 'drums', 0)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.basses[0]]}} onClick={(e) => handleClick(e, 'basses', 0)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.synths[0]]}} onClick={(e) => handleClick(e, 'synths', 0)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.fxs[0]]}} onClick={(e) => handleClick(e, 'fxs', 0)} />

        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.drums[1]]}} onClick={(e) => handleClick(e, 'drums', 1)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.basses[1]]}} onClick={(e) => handleClick(e, 'basses', 1)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.synths[1]]}} onClick={(e) => handleClick(e, 'synths', 1)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.fxs[1]]}} onClick={(e) => handleClick(e, 'fxs', 1)} />

        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.drums[2]]}} onClick={(e) => handleClick(e, 'drums', 2)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.basses[2]]}} onClick={(e) => handleClick(e, 'basses', 2)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.synths[2]]}} onClick={(e) => handleClick(e, 'synths', 2)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.fxs[2]]}} onClick={(e) => handleClick(e, 'fxs', 2)} />

        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.drums[3]]}} onClick={(e) => handleClick(e, 'drums', 3)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.basses[3]]}} onClick={(e) => handleClick(e, 'basses', 3)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.synths[3]]}} onClick={(e) => handleClick(e, 'synths', 3)} />
        <div style={{...padStyle, backgroundColor: colorMap[instrumentState.fxs[3]]}} onClick={(e) => handleClick(e, 'fxs', 3)} />
      </LaunchpadGrid>
    </LaunchpadWrapper>
  );
}


export default Launchpad2;
