import { useState, useRef, useEffect } from 'react';
import { audioContext } from '../audio';


export function useMetronome(beatCallback = () => console.log('No callback attached'), beatDivision = 1, barLength = 4, initialTempo = 60) {
  const [tempo, setTempo] = useState(initialTempo);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mutable Refs for time tracking and note scheduling
  const currentNote = useRef(0);
  const nextNoteTime = useRef(0.0);
  const notesInQueue = useRef([]);
  const timerId = useRef(null);

  // Timing/Scheduling constants
  const LOOKAHEAD = 25.0;
  const SCHEDULE_AHEAD_TIME = 0.1;

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = beatCallback;
  }, [beatCallback]);


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

    if (savedCallback.current) {
      savedCallback.current({ beatNumber, time});
      console.log(`beat: ${beatNumber}, time: ${time}`);
    }
  }

  function scheduler() {
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer
    while (nextNoteTime.current < audioContext.currentTime + SCHEDULE_AHEAD_TIME) {
      scheduleNote(currentNote.current, nextNoteTime.current)
      nextNote();
    }
    timerId.current = window.setTimeout(scheduler, LOOKAHEAD);
  }

  function start() {
    console.log('Metronome has started playing');
    currentNote.current = 0;
    nextNoteTime.current = audioContext.currentTime;
    scheduler();
  }

  function stop() {
    console.log('Metronome has stopped playing');

    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }
  }

  useEffect(() => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isPlaying) {
        start();
    }
    else {
      stop();
    }

    return () => window.clearTimeout(timerId.current);
  }, [isPlaying, tempo]);

  return [setIsPlaying, { tempo, setTempo }, isPlaying];
}
