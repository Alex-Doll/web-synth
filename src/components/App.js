import React, { Component } from 'react';
import '../styles/App.css';

import Navbar from './Navbar';
import Routes from './Routes';
import Footer from './Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <main>
          <Routes />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
