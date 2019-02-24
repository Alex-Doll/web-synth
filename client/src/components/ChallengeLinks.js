import React from 'react';
import { connect } from 'react-redux';

import ChallengeLinksGroup from './ChallengeLinksGroup';

function ChallengeLinks(props) {
  const linkGroups = Object.keys(props.challenges).map((group, index) => (
    <ChallengeLinksGroup key={index} group={group} {...props} />
  ));

  return (
    <ul>
      { linkGroups }
    </ul>
  );
};


const mapStateToProps = (state) => ({
  challenges: state.challenges,
});


export default connect(mapStateToProps, {})(ChallengeLinks);
