import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';

import Submit from './Components/Submit';

class App extends Component {
  render() {
    return (
      <main>
        <Route path="/" exact component={Submit} />
        <Route path="/lol" component={Submit} />
      </main>
    );
  }
}

export default App;
