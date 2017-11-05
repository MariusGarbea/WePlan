import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    name: '',
    type: '',
    venue: '',
    activity: '',
    startDate: '',
    endDate: ''
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    const activities = ['Beach & Pool', 'Bicycling', 'Fishing', 'Hiking'];
    return (
      <div>
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">WePlan</h1>
        </header>
        <form className="formBody">
          <label>
            <p>Event name: </p>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            <p>Event type: </p>
            <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />
          </label>
          <label>
            <p>Venue: </p>
            <input type="text" name="venue" value={this.state.venue} onChange={this.handleChange} />
          </label>
          <label>
            <p>Activity: </p>
            <input type="text" name="activity" value={this.state.activity} onChange={this.handleChange} />
          </label>
          <label>
            <p>Start date: </p>
            <input type="text" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
          </label>
          <label>
            <p>End date: </p>
            <input type="text" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Plan!" className="btn" />
        </form>
      </div>
    );
  }
}

export default App;
