import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    name: '',
    type: '',
    venue: '',
    activity: [],
    weather: '',
    startDate: '',
    endDate: ''
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit = () => {

  }
  render() {
    const activities = ['Flight Delays','Indoor Activity','Running','Jogging','Hiking','Bicycling','Golf Weather','Tennis','Skateboarding','Outdoor Concert','Kite Flying','Beach & Pool','Sailing','Stargzing','Fishing','Construction','Ski Weather','Healthy Heart Fitness','Hunting','Outdoor Barbeque','Lawn Mowing','Outdoor Activity'];
    const weather = ['Shit','Sucker'];
    const activitiesOptions = activities.map((data, i) => {
      return (
        <label key={i}>
          <p>{data}</p>
          <input type="checkbox" value={data} />
        </label>
      )
    });
    const weatherOptions = weather.map((data, i) => {
      return (
        <option value={data} key={i}>{data}</option>
      )
    });
    return (
      <div>
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">WePlan</h1>
        </header>
        <form className="formBody" onSubmit={this.handleSubmit}>
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
            <p>Activities: </p>
            {activitiesOptions}
          </label>
          <label>
            <p>Desired weather: </p>
            <select>{weatherOptions}</select>
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
