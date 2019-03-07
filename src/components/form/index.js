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
      robots: { array: [] }
    }

    this.handleChange = this.handleChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = debounce(this.handleSubmit, 1000);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.renderRobots = this.renderRobots.bind(this);
    
    this.handleLoading = this.handleLoading.bind(this);
  }

  handleChange( { currentTarget: { value } } ) {
    this.setState({input: value})
  }

  async handleSubmit() {
    const { input, robots } = this.state;

    if (robots[input] === undefined) {
      await this.setState( { loading: true } )
      
      const imgUrl = await getRobot(input);
      robots[input] = imgUrl;
      robots.array.push({imgUrl, input})
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
    const { robots: { array }, loading } = this.state;
    return(
    <div className="inner-container">
      {array.map( ({ imgUrl, input } ) => {
        return <Robot imgUrl={imgUrl} name={input} loading={loading} handleLoading={this.handleLoading} key={`${input}`}/>
      })}
    </div>
    )
  }
  
  buttonText() {
    const { loading } = this.state;

    if (loading) {
      return "Loading"
    } else {
      return "Find my Robot!"
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
          <div className="input-container">
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