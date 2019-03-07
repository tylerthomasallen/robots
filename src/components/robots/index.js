import React, { Component } from 'react';
import Robot from './robot';
import Form from '../form';

class Robots extends Component {
  constructor(props) {
    super(props)

    this.state = {
      robots: [],
      loading: false
    }

    this.addRobot = this.addRobot.bind(this);
    this.deleteRobot = this.deleteRobot.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    let robots = localStorage.getItem('robots');
    debugger;

    if (robots !== null) {
      robots = JSON.parse(robots);
      this.setState( { robots } )
    }
  }

  addRobot(input) {
    const { robots } = this.state;

    if (!robots.includes(input)) {
      this.setState( { loading: true } )
      robots.push(input);
      this.setState( { robots } )
      localStorage.setItem('robots', JSON.stringify(robots))

    } else {
      alert(`${input} has already been added to your Army!`)
    }

  }

  deleteRobot(name) {
    const { robots } = this.state;
    const idx = robots.indexOf(name);
    if (idx !== -1) {
      robots.splice(idx, 1)
    }

    this.setState( { robots } )
    localStorage.setItem('robots', JSON.stringify(robots))
  }

  async handleLoading() {
    await this.setState( { loading: false } )
  }

  render() {
    const { robots, loading } = this.state;

    return(
    <div className="parent">
      
      <h1>Create your Robot Army!</h1>
      <p>Enter in a name and see your robot come to life!</p>
      
      <Form loading={loading} submit={this.addRobot} text="Build my bot!"/>
      
      <div className="inner-container">
        {robots.map((name, idx ) => {
          return <Robot name={name} handleLoading={this.handleLoading} deleteRobot={this.deleteRobot} key={`${name}-${idx}`}/>
        })}
      </div>
      
    </div>
    )
  }
}

export default Robots;
