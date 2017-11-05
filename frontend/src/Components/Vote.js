import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/Vote.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
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
  }
  componentDidMount() {
    fetch(`http://localhost:6942/event-details/${this.props.match.params[0]}`)
    .then(response => response.json())
    .then(result => this.setState({result}));
    call = setInterval(this.check, 15000);
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
        </div>
      )
    })
    var parsed = [];
    var nonsorted = [];
    for(let i = 0; i < this.state.votingResults.length; i++) {
      parsed.push(this.state.votingResults[i])
      nonsorted.push(this.state.votingResults[i])
    }
    console.log(parsed.length)
    parsed.sort(function(a, b){
      return b.tally - a.tally
    });
    console.log(parsed);
    return (
      <div>
        <Modal isOpen={this.state.submit}>
          <h1>Thank you for your vote! (◕‿◕)</h1>
          <h2>You voted for {this.state.selection}</h2>
          <XYPlot
            width={700}
            height={600}>
            <HorizontalGridLines />
            <VerticalBarSeries
              data={nonsorted.map((data, i) => {
                return {x: (new Date(data.text.split(" - ")[0]).getTime() - new Date().getTime())/1000/60/60/24, y: data.tally}
              })}/>
            <XAxis />
            <YAxis />
          </XYPlot>
          {this.state.votingResults.length >= 1 ? <h2> {parsed[0].text} is winning with {parsed[0].tally} votes!</h2> : <h2>Wait here for more results</h2>}
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
