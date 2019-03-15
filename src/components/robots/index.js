import React, { Component } from 'react';
import Robot from './robot';
import Form from '../form';

class Robots extends Component {
  constructor(props) {
    super(props)

    const robots = JSON.parse(localStorage.getItem('robots') || '[]');

    this.state = {
      robots,
      loading: false
    }

    this.addRobot = this.addRobot.bind(this);
    this.deleteRobot = this.deleteRobot.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  addRobot(input) {
    const { robots } = this.state;

    if (!robots.includes(input)) {
      this.setState( { loading: true } )

      const newRobots = [ ...robots, input ];

      this.setState( { robots: newRobots } )
      localStorage.setItem('robots', JSON.stringify(newRobots))

    } else {
      alert(`${input} has already been added to your Army!`)
    }

  }

  deleteRobot(name) {
    return () => {
      const { robots } = this.state;
      const idx = robots.indexOf(name);
      
      if (idx !== -1) {
        
        const newRobots = robots.slice(0, idx).concat(robots.slice(idx + 1))

        this.setState( { robots: newRobots } )
        localStorage.setItem('robots', JSON.stringify(newRobots))
      }
    }
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
          return (
            <Robot 
              name={name} 
              handleLoading={this.handleLoading} 
              deleteRobot={this.deleteRobot(name)} 
              key={`${name}-${idx}`}
            />
          )
        })}
      </div>
      
    </div>
    )
  }
}

export default Robots;
