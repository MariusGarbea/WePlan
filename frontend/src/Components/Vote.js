import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/Vote.css';

import Header from './Header';

var previous, call;

class Vote extends Component {
  state = {
    result: {intervals: {intervals: []}},
    selection: '',
    selectionID: -1,
    submit: false,
    votingResults: ''
  }
  check = () => {
    fetch(`http://localhost:6942/vote/${this.props.match.params[0]}/results`)
    .then(response => response.json())
    .then(votingResults => this.setState({votingResults}))
    clearInterval(call);
  }
  componentDidMount() {
    fetch(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
    .then(response => response.json())
    .then(result => this.setState({result}));
    call = setInterval(this.check, 120);
  }
  handleSubmit = () => {
    this.setState({submit: true})
    fetch('http://localhost:6942/vote', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'POST',
      body: JSON.stringify({
        eventID: this.props.match.params[0],
        selection: this.state.selection,
        selectionID: this.state.selectionID
      })
    }).then((done, err) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(done)
      }
    })
  }
  selectTime = event => {
    console.log(event.target.id)
    if(previous) {
      document.getElementById(previous).style.backgroundColor = "#DC2FFF";
    }
    this.setState({selection: event.target.innerHTML.replace("<br>", " - "), selectionID: event.target.id});
    document.getElementById(event.target.id).style.backgroundColor = "#DC2685";
    previous = event.target.id;
  }
  render() {
    const details = () => {
       return (
         <div>
           <h1>Name: {this.state.result.name}</h1>
           <h2>Description: {this.state.result.type}</h2>
           <h3>Location: {this.state.result.venue}</h3>
         </div>
       )
     }
    const options = this.state.result.intervals.intervals.map((data, i) => {
      return (
        <div className="box" onClick={this.selectTime} key={i} id={i}>
          {new Date(data.start).toLocaleString()}
          <br/>
          {new Date(data.end).toLocaleString()}
          <br/>
        </div>
      )
    })
    return (
      <div>
        <Modal isOpen={this.state.submit}>
          <h1>Thank you for your vote! (◕‿◕)</h1>
          <h2>You voted for {this.state.selection}</h2>
          {this.state.votingResults ? <h2>{this.state.votingResults.text} won with {this.state.votingResults.tally} votes!</h2> : <h2>Wait here for results</h2>}
        </Modal>
        <Header />
        <div className="center">
        {this.state.result ? details() : <p>Loading...</p>}
          {this.state.result ? options : <p>Loading...</p>}
          <br/>
          <button onClick={this.handleSubmit} className="btn">Vote!</button>
        </div>
      </div>
    );
  }
}

export default Vote;
