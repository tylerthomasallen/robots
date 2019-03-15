import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.buttonText = this.buttonText.bind(this);
  }

  handleChange( { currentTarget: { value } } ) {
    this.setState( { input: value } )
  }

  handleSubmit() {
    const { input } = this.state;
    const { submit } = this.props;

    submit(input)

    this.setState( { input: '' } )
  }

  handleKeyPress({ key }) {
    if (key === 'Enter') {
      this.handleSubmit()
    }
  }
  
  buttonText() {
    const { loading, text } = this.props;

    if (loading) {
      return "Loading..."
    } else {
      return text
    }
  }

  render() {
    const { input } = this.state;

    return(
      <div className="inner-container" onKeyPress={this.handleKeyPress}>

        <div className="inner-container">
          <div className="button">
            <input type="text" placeholder="Name" value={input} onChange={this.handleChange} />
          </div>
          <span className="button" onClick={this.handleSubmit}>{this.buttonText()}</span>
        </div>
      </div>
    )
  }
}

Form.propTypes = {
  loading: PropTypes.bool,
  test: PropTypes.string,
  submit: PropTypes.func
}

export default Form;