import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';

import Submit from './Components/Submit';
import Vote from './Components/Vote';

class App extends Component {
  render() {
    return (
      <main>
        <Route path="/" exact component={Submit} />
        <Route path="/vote/*" component={Vote} />
      </main>
    );
  }
}

export default App;
