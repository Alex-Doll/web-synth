import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

function Navbar(props) {
  return (
    <header>
      <h1>Music App - {props.user.name}</h1>
      <nav>
        <Link to='/'>Home</Link>
        <NavLink to='/about' activeClassName='active-route'>About</NavLink>
        <NavLink to='/contact' activeClassName='active-route'>Contact</NavLink>
        <NavLink to='/synth' activeClassName='active-route'>Synth</NavLink>
        <NavLink to='/sequencer' activeClassName='active-route'>Sequencer</NavLink>
        <NavLink to='/launchpad' activeClassName='active-route'>Launchpad</NavLink>
        <NavLink to='/challenges' activeClassName='active-route'>Challenges</NavLink>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, {})(Navbar));
