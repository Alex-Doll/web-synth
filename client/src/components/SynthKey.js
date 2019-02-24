import { useRef, useEffect } from 'react';

import { useKeyPress } from '../hooks';
import { audioContext } from '../audio.tsx';

function SynthKey(props) {
  const oscRef = useRef(null)
  const adsrGainRef = useRef(null)

  function onKeyDown() {
    if (!oscRef.current) {
      const osc = new OscillatorNode(audioContext, {
        frequency: props.freq,
        detune: props.detune,
        type: props.waveType,
      });

      const gain = audioContext.createGain();
      gain.gain.value = 0;

      osc.start();
      osc.connect(gain).connect(props.masterGainNode).connect(audioContext.destination);

      gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + props.adsrEnvelope.attack); // Attack
      gain.gain.linearRampToValueAtTime(props.adsrEnvelope.sustain, audioContext.currentTime + props.adsrEnvelope.attack + props.adsrEnvelope.decay); // Decay AND Sustain

      oscRef.current = osc;
      adsrGainRef.current = gain;
    }
  }

  async function onKeyUp() {
    console.log(oscRef.current);
    console.log(adsrGainRef.current);
    if (oscRef.current && adsrGainRef.current) {
      let releasePromise = new Promise((resolve, reject) => {
        adsrGainRef.current.gain.linearRampToValueAtTime(0, audioContext.currentTime + props.adsrEnvelope.release); // Release
        window.setTimeout(() => resolve(true), props.adsrEnvelope.release * 1000);
      });

      await releasePromise;
      oscRef.current.stop();
      oscRef.current.disconnect();

      oscRef.current = null;
      adsrGainRef.current = null;
    }
  }

  useKeyPress(props.triggerKey, onKeyDown, onKeyUp);

  useEffect(() => {
    if (oscRef.current) {
      oscRef.current.detune.value = props.detune;
    }
  }, [props.detune]);
  
  return null;
}

export default SynthKey;
