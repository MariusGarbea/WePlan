import React, { Component } from 'react';

import Header from './Header';

class Vote extends Component {
  getUpdates = () => {
    fetch(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
    .then(response => response.json())
    .then(result => result);
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.match.params[0]}
      </div>
    );
  }
}

export default Vote;
