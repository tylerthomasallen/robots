import React, { Component } from 'react';

class Robot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingClass: "loading"
    }

    this.handleLoading = this.handleLoading.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleLoading() {
    await this.setState( { loadingClass: "" } )
    this.props.handleLoading();
  }

  handleDelete() {
    const { name, deleteRobot } = this.props;
    deleteRobot(name)
  }

  render() {
    const { name } = this.props;
    const { loadingClass } = this.state;

    return(
      <div className={`robot ${loadingClass}`}>
        <i className="fas fa-trash" onClick={this.handleDelete}></i>
        <img src={`https://robohash.org/${name}.png`} onLoad={this.handleLoading}/>
        <h1>{name}</h1>
      </div>
    )
  }
}


export default Robot;