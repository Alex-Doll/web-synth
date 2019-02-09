import React, { useState } from 'react';

import Synth from './Synth';



function Challenge(props) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <section>
      <h3>{props.title}{isComplete ? ' - COMPLETE' : ''}</h3>
      <p>When using a synth the most noticable difference in sound comes from the wave type selected for the synth. The most common are sine, square, sawtooth, and trinagle. Change the wave type to square and play a note to hear the difference and complete the challenge!</p>
      <Synth />

      <button onClick={() => setIsComplete(true)}>Complete Challenge!</button>
      <button onClick={() => setIsComplete(false)}>Reset Challenge!</button>
    </section>
  );
}

export default Challenge;
