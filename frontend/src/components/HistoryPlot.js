import React, { Component } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/esm/Spinner";
import Plot from "react-plotly.js";

export default class HistoryPlot extends Component {
  render() {
    const unpack = (rows, key) => {
      return rows.map((row) => {
        return key !== "timestamp"
          ? row.data[key]
          : moment(row[key]).format("YYYY-MM-DD HH:mm:ss");
      });
    };

    const traceTemp = (data) => {
      // console.log('[HistoryPlot] timestamp:', unpack(data, "timestamp"), 'temperature', unpack(data, "temperature"))
      return [
        {
          type: "scatter",
          mode: "lines",
          name: "Temperature (°C)",
          // x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
          // y: [1, 3, 6],
          x: unpack(data, "timestamp"),
          y: unpack(data, "temperature"),
          line: { color: "#17BECF" },
        },
      ];
    };

    const layout = {
      title: "Time-series",
      width: 500,
      height: 500,
      xaxis: {
        type: "date",
      },
      yaxis: {
        autorange: true,
        range: [0, 100],
        type: "linear",
      },
      // showlegend: true
    };

    const checkData = () => {
      if (this.props.data.length > 0) {
        return (
          <Card>
            <Card.Body>
              <Plot data={traceTemp(this.props.data)} layout={layout} />
            </Card.Body>
          </Card>
        );
      } else {
        return <Spinner animation="border" />;
      }
    };
    return checkData();
  }
}
