import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import '../styles/App.css';

import Synth from './Synth';
import Sequencer from './Sequencer.tsx';
import Metronome from './Metronome.tsx';
import Launchpad from './Launchpad.tsx';

const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);
const Contact = () => (<h2>Contact</h2>);
const synthPage = () => (<Synth />);
const sequencerPage = () => (<Metronome beatDivision={4}>
  {(props) => <Sequencer metronome={props} />}
</Metronome>);
const launchpadPage = () => (<Metronome tempo={125.0}>
  {(props) => <Launchpad metronome={props} />}
</Metronome>);
const NoMatch = () => (<h2>404 Page Not Found</h2>);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Music App
          <nav>
            <Link to='/'>Home</Link>
            <NavLink to='/about' activeClassName='active-route'>About</NavLink>
            <NavLink to='/contact' activeClassName='active-route'>Contact</NavLink>
            <NavLink to='/synth' activeClassName='active-route'>Synth</NavLink>
            <NavLink to='/sequencer' activeClassName='active-route'>Sequencer</NavLink>
            <NavLink to='/launchpad' activeClassName='active-route'>LaunchPad</NavLink>
          </nav>
        </header>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/synth' component={synthPage} />
          <Route path='/sequencer' component={sequencerPage} />
          <Route path='/launchpad' component={launchpadPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
