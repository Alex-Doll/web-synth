import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Synth from './Synth';
import Sequencer from './Sequencer.tsx';
import Metronome from './Metronome.tsx';
import Launchpad from './Launchpad.tsx';
import Challenges from './Challenges';

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


function Routes(props) {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/synth' component={synthPage} />
      <Route path='/sequencer' component={sequencerPage} />
      <Route path='/launchpad' component={launchpadPage} />
      <Route path='/challenges' component={Challenges} />
      <Route component={NoMatch} />
    </Switch>
  );
}


export default Routes;
