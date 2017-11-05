import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/Vote.css';

import Header from './Header';

var previous;

class Vote extends Component {
  state = {
    result: ['shit', 'sucker', 'cock', 'dick'],
    selection: '',
    submit: false
  }
  componentDidMount() {
    fetch(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
    .then(response => response.json())
    .then(result => this.setState({result}));
  }
  handleSubmit = () => {
    this.setState({submit: true})
  }
  selectTime = event => {
    console.log(event.target.id)
    if(previous) {
      document.getElementById(previous).style.backgroundColor = "#DC2FFF";
    }
    this.setState({selection: event.target.innerHTML});
    document.getElementById(event.target.id).style.backgroundColor = "#DC2685";
    previous = event.target.id;
  }
  render() {
    const options = this.state.result.map((data, i) => {
      return (
        <div className="box" onClick={this.selectTime} key={i} id={i}>
          {data}
        </div>
      )
    })
    return (
      <div>
        <Modal isOpen={this.state.submit}>
          <h1>Thank you for your vote! (◕‿◕)</h1>
          <h2>You voted for {this.state.selection}</h2>
        </Modal>
        <Header />
        <div className="center">
          {this.state.result.length !== 0 ? options : <p>Loading...</p>}
          <br />
          <button onClick={this.handleSubmit} className="btn">Vote!</button>
        </div>
      </div>
    );
  }
}

export default Vote;
