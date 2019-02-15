import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function ChallengeLinksGroup(props) {
  const links = props.groupChallenges.map((challenge, index) => (
    <li key={index}>
      <Link
        className='challenge-link'
        to={`${props.url}/${challenge.pathName}`}
      >
        {challenge.title}{challenge.isComplete ? ' - complete' : ''}
      </Link>
    </li>
  ));

  const amountComplete = props.groupChallenges.filter(({ isComplete }) => isComplete === true).length;

  return (
    <div>
      <h4>{props.group} - Completed {amountComplete} of {props.groupChallenges.length}</h4>
      <ol>
        { links }
      </ol>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({
  groupChallenges: state.challenges[ownProps.group],
});


export default connect(mapStateToProps, {})(ChallengeLinksGroup);
