import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ChallengeLinks(props) {
  const links = props.challenges.map((challenge, index) => (
    <li key={index}>
      <Link
        className='challenge-link'
        to={`${props.url}/${challenge.pathName}`}
      >
        {challenge.title}{challenge.isComplete ? ' - complete' : ''}
      </Link>
    </li>
  ));

  return (
    <ul>
      { links }
    </ul>
  );
};


const mapStateToProps = (state) => ({
  challenges: state.challenges,
});


export default connect(mapStateToProps, {})(ChallengeLinks);
