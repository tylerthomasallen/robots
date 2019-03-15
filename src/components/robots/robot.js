import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Robot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingClass: "loading"
    }

    this.handleLoading = this.handleLoading.bind(this);
  }

  async handleLoading() {
    await this.setState( { loadingClass: "" } )
    this.props.handleLoading();
  }

  render() {
    const { name, deleteRobot } = this.props;
    const { loadingClass } = this.state;

    return(
      <div className={`robot ${loadingClass}`}>
        <i className="fas fa-trash" onClick={deleteRobot}></i>
        <img src={`https://robohash.org/${name}.png`} alt={`robot-${name}`} onLoad={this.handleLoading}/>
        <h1>{name}</h1>
      </div>
    )
  }
}

Robot.propTypes = {
  name: PropTypes.string,
  deleteRobot: PropTypes.func,
  handleLoading: PropTypes.func
}


export default Robot;