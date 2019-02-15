import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Challenge from './Challenge';
import ChallengeLinks from './ChallengeLinks';


function Challenges(props) {
  return (
    <main>
      <h2>Challenges!</h2>

      <Switch>
        <Route
          exact
          path={props.match.path}
          render={(rProps) => (
            <ChallengeLinks {...rProps} url={props.match.url} />
          )}
        />
        <Route
          path={`${props.match.path}/:group/:challenge`}
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
