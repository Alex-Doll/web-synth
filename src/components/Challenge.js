import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setChallengeIsComplete } from '../store';



function Challenge(props) {
  const challenge = props.challenges.find(({ pathName }) => pathName === props.match.params.challenge);
  const index = props.challenges.indexOf(challenge);


  return (
    <section>
      <h3>{challenge.title}{challenge.isComplete ? ' - COMPLETE' : ''}</h3>
      <button
        onClick={() => props.setChallengeIsComplete(true, index)}
      >
        Complete Challenge
      </button>
      <button
        onClick={() => props.setChallengeIsComplete(false, index)}
      >
        Reset Challenge
      </button>
      <div>
        { index > 0 &&
          <Link
            className='challenge-link'
            to={`${props.url}/${props.challenges[index - 1].pathName}`}
            >
            Prev
          </Link>
        }
        { index < props.challenges.length - 1 &&
          <Link
            className='challenge-link'
            to={`${props.url}/${props.challenges[index + 1].pathName}`}
            >
            Next
          </Link>
        }
        <div>
            <Link
              className='challenge-link'
              to={props.url}
              >
              Challenges
            </Link>
        </div>
      </div>
    </section>
  );
}


const mapStateToProps = (state) => ({
  challenges: state.challenges,
});

export default connect(mapStateToProps, { setChallengeIsComplete })(Challenge);
