import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useMetronome } from '../hooks/Metronome';

import Synth from './Synth';
import Sequencer from './Sequencer';
import Metronome from './Metronome.tsx';
import Launchpad from './Launchpad';
import Challenges from './Challenges';

const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);
const Contact = () => (<h2>Contact</h2>);
const NoMatch = () => (<h2>404 Page Not Found</h2>);


function Routes(props) {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/synth' component={Synth} />
      <Route path='/sequencer' component={Sequencer} />
      <Route path='/launchpad' component={Launchpad} />
      <Route path='/challenges' component={Challenges} />
      <Route component={NoMatch} />
    </Switch>
  );
}


export default Routes;
