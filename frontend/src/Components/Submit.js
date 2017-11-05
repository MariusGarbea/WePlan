import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/Submit.css';

import Header from './Header';

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
    unit: '',
    emails: '',
    result: ''
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit = event => {
    fetch('http://localhost:6942/create-event', {
      method: "POST",
      body: JSON.stringify(this.state)
    }).then(response => {
      return response.json();
    }).then(result => {
      this.setState({result});
    })
  }
  selectCheckBox = event => {
    let activity = this.state.activity;
    if(event.target.checked) {
      activity.push(event.target.value);
    } else {
      if(activity.indexOf(event.target.value) !== -1) {
        activity.splice(activity.indexOf(event.target.value), 1);
      }
    }
  }
  render() {
    const activities = [
      {"activity": "Flight Delays", "id": -3},
      {"activity": "Beach & Pool", "id": 10},
      {"activity": "Field Readiness", "id": 32},
      {"activity": "Indoor Activity", "id": -2},
      {"activity": "Sailing", "id": 11},
      {"activity": "Grass Growing", "id": 33},
      {"activity": "Running", "id": 1},
      {"activity": "Stargazing", "id": 12},
      {"activity": "Soil Moisture", "id": 34},
      {"activity": "Jogging", "id": 2},
      {"activity": "Fishing", "id": 13},
      {"activity": "Morning School Bus", "id": 35},
      {"activity": "Hiking", "id": 3},
      {"activity": "Construction", "id": 14},
      {"activity": "Home Energy Efficiency", "id": 36},
      {"activity": "Bicycling", "id": 4},
      {"activity": "Ski Weather", "id": 15},
      {"activity": "Fuel Economy", "id": 37},
      {"activity": "Golf Weather", "id": 5},
      {"activity": "Healthy Heart Fitness", "id": 16},
      {"activity": "Composting", "id": 38},
      {"activity": "Tennis", "id": 6},
      {"activity": "Hunting", "id": 20},
      {"activity": "Shopping", "id": 39},
      {"activity": "Skateboarding", "id": 7},
      {"activity": "Outdoor Barbecue", "id": 24},
      {"activity": "Dog Walking Comfort", "id": 43},
      {"activity": "Outdoor Concert", "id": 8},
      {"activity": "Lawn Mowing", "id": 28},
      {"activity": "Kite Flying", "id": 9},
      {"activity": "Outdoor Activity", "id": 29}
    ]
    const weather = ['Select weather','Sunny','Cloudy','Storms','Rain','Snow','Hot','Cold','Windy','Clear'];
    const units = ['Select unit','Days','Hours','Minutes'];
    const activitiesOptions = activities.map((data, i) => {
      return (
        <label key={i}>
          <input type="checkbox" value={data.id} onChange={this.selectCheckBox} />
          <p className="inline">{data.activity}</p>
          <br />
        </label>
      )
    });
    const weatherOptions = weather.map((data, i) => {
      return (
        <option value={data} key={i}>{data}</option>
      )
    });
    const unitOptions = units.map((data, i) => {
      return (
        <option value={data} key={i}>{data}</option>
      )
    });
    return (
      <div>
        <Modal isOpen={this.state.result.length !== 0}>
          <h1>Send this link {this.state.result}</h1>
        </Modal>
        <Header />
        <div className="flexView">
          <div className="col">
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
              <input placeholder="Address" type="text" name="venue" value={this.state.venue} onChange={this.handleChange} />
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
              <input placeholder="Number" type="number" name="duration" value={this.state.duration} onChange={this.handleChange} />
              <br />
              <select onChange={this.handleChange} name="unit">{unitOptions}</select>
            </label>
            <label>
              <p>Emails: </p>
              <textarea placeholder="Invitees" type="textarea" name="emails" value={this.state.emails} onChange={this.handleChange} />
            </label>
            <br />
            <button className="btn" onClick={this.handleSubmit}>Plan!</button>
          </div>
          <div className="col col-2" >
            {activitiesOptions}
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
