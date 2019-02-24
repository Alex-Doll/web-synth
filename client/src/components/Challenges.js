import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Challenge from './Challenge';
import ChallengeLinks from './ChallengeLinks';


function Challenges(props) {

  function addNumber() {
    fetch('/api', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({num: Math.random()}),
    })
      .catch(err => console.log(err));
  }

  async function fetchAPI() {
    try {
      const res = await fetch('/api');
      const data = await res.json();
      document.title = data;
      const footerp = document.querySelector('footer p');
      footerp.innerHTML = data;
      console.log(data)
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <main>
      <h2>Challenges!</h2>

      <button onClick={addNumber}>Post Number</button>

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
          render={() => (
            <Challenge url={props.match.url} />
          )}
        />
      </Switch>
    </main>
  );
}


const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps, null)(Challenges);
