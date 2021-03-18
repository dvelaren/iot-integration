import React, { Component } from "react";
import { varColors } from "../config/Constants";

import Sensor from "./Sensor";

import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerQuarter,
  faTint,
} from "@fortawesome/free-solid-svg-icons";

export default class Sensors extends Component {
  render() {
    const sensorValues = this.props.data.map((el, idx) => (
      <Sensor
        key={idx}
        temperature={el.data.temperature}
        humidity={el.data.humidity}
        timestamp={el.timestamp}
      />
    ));

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>
              Temperature <FontAwesomeIcon icon={faThermometerQuarter} style={{color: varColors.temperature}} />
            </th>
            <th>
              Humidity <FontAwesomeIcon icon={faTint} style={{color: varColors.humidity}} />
            </th>
          </tr>
        </thead>
        <tbody>{sensorValues}</tbody>
      </Table>
    );
  }
}
