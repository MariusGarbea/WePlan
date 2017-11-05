import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/Vote.css';

import Header from './Header';

var previous;

class Vote extends Component {
  state = {
    result: {intervals: {intervals: []}},
    selection: '',
    submit: false
  }
  componentDidMount() {
    console.log(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
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
    this.setState({selection: event.target.innerHTML.replace("<br>", " - ")});
    document.getElementById(event.target.id).style.backgroundColor = "#DC2685";
    previous = event.target.id;
  }
  render() {
    console.log(this.state.result)
      const options = this.state.result.intervals.intervals.map((data, i) => {
        return (
          <div className="box" onClick={this.selectTime} key={i} id={i}>
            {new Date(data.start).toLocaleString()}
            <br/>
            {new Date(data.end).toLocaleString()}
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
          {this.state.result ? options : <p>Loading...</p>}
          <br />
          <button onClick={this.handleSubmit} className="btn">Vote!</button>
        </div>
      </div>
    );
  }
}

export default Vote;
