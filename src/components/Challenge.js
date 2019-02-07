import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Synth from './Synth';



function Challenge(props) {

  return (
    <section>
      <h3>{props.title}</h3>
      <p>When using a synth the most noticable difference in sound comes from the wave type selected for the synth. The most common are sine, square, sawtooth, and trinagle. Change the wave type to square and play a note to hear the difference and complete the challenge!</p>
      <Synth />
    </section>
  );
}

export default Challenge;
