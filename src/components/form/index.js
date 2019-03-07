import React, { Component } from 'react';
import { getRobot } from '../../api';
import debounce from 'lodash/debounce'
import Robot from '../robot';

class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: '',
      loading: false,
      robots: []
    }

    this.handleChange = this.handleChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = debounce(this.handleSubmit, 500);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.renderRobots = this.renderRobots.bind(this);
    
    this.handleLoading = this.handleLoading.bind(this);

    this.deleteRobot = this.deleteRobot.bind(this);
  }

  handleChange( { currentTarget: { value } } ) {
    this.setState({input: value})
  }

  async handleSubmit() {
    const { input, robots } = this.state;

    if (!robots.includes(input)) {
      await this.setState( { loading: true } )
      
      robots.push(input)
      await this.setState( { robots });
      
      await this.setState( { input: ''} );
    
    } else {
      alert("You've already made that robot!")
    }

  }

  handleKeyPress({ key }) {
    if (key === 'Enter') {
      this.handleSubmit()
    }
  }
  
  async handleLoading() {
    await this.setState( { loading: false } )
  }

  renderRobots() {
    const { robots } = this.state;
    return(
    <div className="inner-container">
      {robots.map((name, idx ) => {
        return <Robot name={name} handleLoading={this.handleLoading} deleteRobot={this.deleteRobot} key={`${name}-${idx}`}/>
      })}
    </div>
    )
  }

  deleteRobot(name) {
    const { robots } = this.state;
    const idx = robots.indexOf(name);
    if (idx !== -1) {
      robots.splice(idx, 1)
    }

    this.setState( { robots } )

  }
  
  buttonText() {
    const { loading } = this.state;

    if (loading) {
      return "Loading..."
    } else {
      return "Build my Bot!"
    }
  }

  render() {
    const { input } = this.state;

    return(
      <div className="parent" onKeyPress={this.handleKeyPress}>

      <div className="inner-container">
        <h1>Create your Robot Army!</h1>
      </div>

        <div className="inner-container">
          <div className="button">
            <input type="text" value={input} onChange={this.handleChange} />
          </div>
          <span className="button" onClick={this.handleSubmit}>{this.buttonText()}</span>
        </div>

        {this.renderRobots()}
      </div>
    )
  }
}

export default Form;