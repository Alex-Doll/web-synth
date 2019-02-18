import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TestResults from './TestResults';
import { setChallengeIsComplete } from '../store';
import { useTestRunner } from '../hooks/TestRunner';


function Challenge(props) {
  function handleSuccess() {
    props.setChallengeIsComplete(true, props.group, props.index);
  }

  function handleFailure() {
    console.log('Challenges failed...');
  }

  const { results, runTests } = useTestRunner(props.tests, handleSuccess, handleFailure);

  return (
    <section>
      <h3>{props.title}{props.isComplete ? ' - COMPLETE' : ''}</h3>
      { props.content }
      <TestResults tests={props.tests} results={results} />
      <button
        onClick={() => {
          runTests();
        }}
      >
        RUN TESTS
      </button>
      <button
        onClick={() => {
          props.setChallengeIsComplete(false, props.group, props.index)
        }}
      >
        Reset Challenge
      </button>
      <div>
        { props.index > 0 &&
          <Link
            className='challenge-link'
            to={`${props.url}/${props.group}/${props.prevChallengePath}`}
            >
            Prev
          </Link>
        }
        { props.isComplete && props.index < props.totalChallenges - 1 &&
          <Link
            className='challenge-link'
            to={`${props.url}/${props.group}/${props.nextChallengePath}`}
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


const mapStateToProps = (state, ownProps) => {
  const challengeGroup = state.challenges[ownProps.match.params.group];
  const challenge = challengeGroup.find(({ pathName }) => pathName === ownProps.match.params.challenge);

  const index = challengeGroup.indexOf(challenge);

  const nextIndex = index < challengeGroup.length - 1 ? index + 1 : challengeGroup.length - 1;
  const prevIndex = index > 0 ? index - 1 : 0;

  return {
    ...challenge,
    index,
    group: ownProps.match.params.group,
    totalChallenges: challengeGroup.length,
    nextChallengePath: challengeGroup[nextIndex].pathName,
    prevChallengePath: challengeGroup[prevIndex].pathName,
  };
};

export default withRouter(connect(mapStateToProps, { setChallengeIsComplete })(Challenge));
