import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Challenge from './Challenge';
import ChallengeLinks from './ChallengeLinks';


function Challenges(props) {
  const amountComplete = props.challenges.filter(({ isComplete}) => isComplete === true).length;
  return (
    <main>
      <h2>Challenges!</h2>
      <p>Completed {amountComplete} of {props.challenges.length}</p>

      <Switch>
        <Route
          exact
          path={props.match.path}
          render={(rProps) => (
            <ChallengeLinks {...rProps} url={props.match.url} />
          )}
        />
        <Route
          path={`${props.match.path}/:challenge`}
          render={(rProps) => (
            <Challenge {...rProps} url={props.match.url} />
          )}
        />
      </Switch>
    </main>
  );
}


const mapStateToProps = (state) => ({
  challenges: state.challenges,
});


export default connect(mapStateToProps, null)(Challenges);
