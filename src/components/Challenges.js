import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Challenge from './Challenge';
import ChallengeLinks from './ChallengeLinks';


function Challenges(props) {
  const [currChallenge, setCurrChallenge] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isRedirecting) {
      setIsRedirecting(false);
      props.history.push(`${props.match.url}${currChallenge !== null ? '/'+props.challenges[currChallenge].pathName : ''}`);
    }
  }, [isRedirecting]);

  console.log(currChallenge);
  return (
    <main>
      <h2>Challenges</h2>
      <p>Start your learning journey here!</p>

      <Switch>
        <Route exact path={props.match.url} component={ChallengeLinks} />
        { currChallenge !== null &&
          <Route path={props.match.url + '/:challenge'} component={() => <Challenge challengeIndex={currChallenge} />} />
        }
      </Switch>

      <button onClick={() => {
        setCurrChallenge(null);
        setIsRedirecting(true);
      }}>CHALLENGES</button>  
      <button onClick={() => {
        if (currChallenge !== null && currChallenge > 0) {
          setCurrChallenge(currChallenge - 1);
        }
        else {
          setCurrChallenge(props.challenges.length - 1);
        }
        setIsRedirecting(true);
      }}>PREV</button>  
      <button onClick={() => {
        if (currChallenge !== null && currChallenge < (props.challenges.length - 1)) {
          setCurrChallenge(currChallenge + 1);
        }
        else {
          setCurrChallenge(0);
        }
        setIsRedirecting(true);
      }}>NEXT</button>
    </main>
  );
}


const mapStateToProps = (state) => ({
  challenges: state.challenges,
});


export default connect(mapStateToProps, {})(Challenges);
