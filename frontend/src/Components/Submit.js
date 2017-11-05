import React, { Component } from 'react';
import logo from '../logo_cropped.png';
import '../App.css';

class Submit extends Component {
  state = {
    name: '',
    type: '',
    venue: '',
    activity: [],
    weather: '',
    startDate: '',
    endDate: '',
    duration: '',
    emails: ''
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit = event => {
    fetch('', {
      method: "POST",
      body: this.state
    }).then(response => {
      return response.json();
    }).then(result => {
      console.log(result);
    })
  }
  selectCheckBox = event => {
    if(event.target.checked) {
      this.state.activity.push(event.target.value);
    }
    // DON'T UNSELECT A CHECKBOX!
  }
  render() {
    const activities = ['Flight Delays','Indoor Activity','Running','Jogging','Hiking','Bicycling','Golf Weather','Tennis','Skateboarding','Outdoor Concert','Kite Flying','Beach & Pool','Sailing','Stargzing','Fishing','Construction','Ski Weather','Healthy Heart Fitness','Hunting','Outdoor Barbeque','Lawn Mowing','Outdoor Activity'];
    const weather = ['Select weather','Sunny','Mostly Sunny','Partly Sunny','Intermittent Clouds','Hazy Sunshine','Mostly Cloudy','Cloudy','Dreary (Overcast)','Fog','Showers','Mostly Cloudy w/ Showers','Partly Sunny w/ Showers','T-Storms','Mostly Cloudy w/ T-Storms','Partly Sunny w/ T-Storms','Rain','Flurries','Mostly Cloudy w/ Flurries','Snow','Mostly Cloudy w/ Snow','Ice','Sleet','Freezing Rain','Rain and Snow','Hot','Cold','Windy','Clear','Mostly Clear','Partly Cloudy','Intermittent Clouds','Hazy Moonlight','Mostly Cloudy','Partly Cloudy w/ Showers','Mostly Cloudy w/ Showers','Partly Cloudy w/ T-storms','Mostly Cloudy w/ T-Storms','Mostly Cloudy w/ Flurries','Mostly Cloudy w/ Snow'];
    const activitiesOptions = activities.map((data, i) => {
      return (
        <label key={i}>
          <input type="checkbox" value={data} onChange={this.selectCheckBox} />
          <p className="inline">{data}</p>
          <br />
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
        <div className="col-2">
          <div>
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
            </label>
            <label>
              <p>Desired weather: </p>
              <select onChange={this.handleChange} name="weather">{weatherOptions}</select>
            </label>
            <label>
              <p>Start date: </p>
              <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
            </label>
            <label>
              <p>End date: </p>
              <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
            </label>
            <label>
              <p>Duration: </p>
              <input type="text" name="duration" value={this.state.duration} onChange={this.handleChange} />
            </label>
            <label>
              <p>Emails: </p>
              <textarea type="textarea" name="emails" value={this.state.emails} onChange={this.handleChange} />
            </label>
            <br />
            <button className="btn" onClick={this.handleSubmit}> Plan! </button>
          </div>
          <div className="col-2">
            {activitiesOptions}
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
