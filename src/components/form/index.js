import React, { Component } from 'react';
// import { debounce } from 'lodash';
import './styles.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: '',
      img: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange( { currentTarget: { value } } ) {
    this.setState({input: value})
  }

  handleSubmit() {
    const { input } = this.state;
    this.setState({img: input})
  }

  render() {
    const { input, img } = this.state;

    return(
      <div className="parent">

        <h1>Robots</h1>

        <p>Enter in your name and see which robot you are!</p>
        
        <div className="inner-container">
          <div className="input-container">
            <input type="text" value={input} onChange={this.handleChange} />
          </div>
          <span className="button" onClick={this.handleSubmit}>Find my Robot!</span>
        </div>

        <img src={`https://robohash.org/${img}.png`} />
      </div>
    )
  }
}

export default Form;