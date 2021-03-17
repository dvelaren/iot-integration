import React, { Component } from "react";

export default class Sensor extends Component {
  render() {
    let timestamp = new Date(this.props.timestamp);
    return (
      <tr>
        <td>{timestamp.toLocaleString()}</td>
        <td>{this.props.temperature}</td>
        <td>{this.props.humidity}</td>
      </tr>
    );
  }
}
