import React from 'react';
import { connect } from 'react-redux';


function Footer(props) {
  return (
    <footer>
      <p>Logged in as {props.user.name}</p>
    </footer>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps, {})(Footer);
