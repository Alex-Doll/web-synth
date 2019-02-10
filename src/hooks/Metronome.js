import { useState, useRef, useEffect } from 'react';
import { audioContext } from '../audio';


export function useMetronome(beatDivision = 1) {
  const [tempo, setTempo] = useState(60);
  const [beat, setBeat] = useState(0);
  const [barLength, setBarLength] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);

  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  const currentNote = useRef(0);
  const nextNoteTime = useRef(0.0);
  const notesInQueue = useRef([]);
  const functionOnNote = useRef(null);
  const timerId = useRef(null);

  function nextNote() {
    const secondsPerBeat = 60.0 / tempo;

    // Add beat length to last beat time
    nextNoteTime.current += (1 / beatDivision) * secondsPerBeat;

    // Advance the beat number, wrap to zero
    currentNote.current++;
    if (currentNote.current === (barLength * beatDivision)) {
      currentNote.current = 0;
    }
  }

  function scheduleNote(beatNumber, time) {
    notesInQueue.current.splice(0, 1);
    notesInQueue.current.push({
      note: beatNumber,
      time,
    });
    setBeat(beatNumber);

    if (functionOnNote.current) {
      functionOnNote.current({ beatNumber, time});
      console.log(`beat: ${beatNumber}, time: ${time}`);
    }
  }

  function scheduler() {
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote.current, nextNoteTime.current)
      nextNote();
    }
    timerId.current = window.setTimeout(scheduler, lookahead);
  }

  function start() {
    console.log('Metronome has started playing');
    currentNote.current = 0;
    nextNoteTime.current = audioContext.currentTime;
    scheduler();
  }

  function stop() {
    console.log('Metronome has stopped playing');
    functionOnNote.current = undefined;

    if (timerId.current) {
      window.clearTimeout(timerId.current);
      setBeat(0);
    }
  }

  function setFunctionOnNote(func) {
    functionOnNote.current = func;
  }

  useEffect(() => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isPlaying) {
      if (functionOnNote.current) {
        start();
      }
      else {
        console.log('No function attached to Metronome...');
        setIsPlaying(false);
      }
    }
    else {
      stop();
    }

    return () => window.clearTimeout(timerId.current);
  }, [isPlaying, tempo]);

  return [setIsPlaying, setFunctionOnNote, {tempo, setTempo,},];
}
