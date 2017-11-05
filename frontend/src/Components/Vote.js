import React, { Component } from 'react';
import '../Styles/Vote.css';

import Header from './Header';

class Vote extends Component {
  state = {
    result: ['shit', 'sucker', 'cock', 'dick'],
    selection: ''
  }
  componentDidMount() {
    fetch(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
    .then(response => response.json())
    .then(result => this.setState({result}));
  }
  handleSubmit = () => {
    console.log(this.state.selection)
  }
  selectTime = (event) => {
    this.setState({selection: event.target.innerHTML})
  }
  render() {
    const options = this.state.result.map((data, i) => {
      return (
        <div className="box" onClick={this.selectTime} key={i}>
          {data}
        </div>
      )
    })
    return (
      <div>
        <Header />
        <div className="center">
          {this.state.result.length !== 0 ? options : <p>Loading...</p>}
          <br />
          <button onClick={this.handleSubmit} className="btn">Submit vote</button>
        </div>
      </div>
    );
  }
}

export default Vote;
