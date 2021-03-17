import React, { Component } from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import logo from "./logo.svg";
import { backendHost, refreshInterval } from "./config/Constants";
import Sensors from "./components/Sensors";
import HistoryPlot from "./components/HistoryPlot";

export default class App extends Component {
  state = {
    data: [],
    intervalId: null,
  };

  componentDidMount() {
    let intervalId = setInterval(this.loadData, refreshInterval);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loadData = () => {
    this.getData(backendHost.data).then((response) => {
      // console.log("[App] data:", response);
      this.setState({ data: response });
    });
  };

  getData = (url) => {
    let backendPromise = new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.log("[App] Error:", error);
          resolve(false);
        });
    });
    return backendPromise;
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Row className="mt-5 text-center">
            <Col>
              <Sensors data={this.state.data} />
            </Col>
            <Col>
              <HistoryPlot data={this.state.data} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
