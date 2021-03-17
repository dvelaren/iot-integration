import React, { Component } from "react";
import Sensor from "./Sensor";

import Spinner from 'react-bootstrap/Spinner'
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
    const checkData = () => {
      if (this.props.data.length > 0) {
        return (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>
                  Temperature <FontAwesomeIcon icon={faThermometerQuarter} />
                </th>
                <th>
                  Humidity <FontAwesomeIcon icon={faTint} />
                </th>
              </tr>
            </thead>
            <tbody>{sensorValues}</tbody>
          </Table>
        );
      } else {
        return <Spinner animation="border" />;
      }
    };
    return (
      checkData()
    );
  }
}
