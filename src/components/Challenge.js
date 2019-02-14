import React from 'react';
import { connect } from 'react-redux';

import Synth from './Synth';
import { setChallengeIsComplete } from '../store';



function Challenge(props) {
  return (
    <section>
      <h3>{props.challenge.title}{props.challenge.isComplete ? ' - COMPLETE' : ''}</h3>
      <p>When using a synth the most noticable difference in sound comes from the wave type selected for the synth. The most common are sine, square, sawtooth, and trinagle. Change the wave type to square and play a note to hear the difference and complete the challenge!</p>
      <Synth />

      <button onClick={() => props.setChallengeIsComplete(true, props.challengeIndex)}>Complete Challenge!</button>
      <button onClick={() => props.setChallengeIsComplete(false, props.challengeIndex)}>Reset Challenge!</button>
    </section>
  );
}


const mapStateToProps = (state, ownProps) => ({
  challenge: state.challenges[ownProps.challengeIndex],
});

export default connect(mapStateToProps, { setChallengeIsComplete })(Challenge);
