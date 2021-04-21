import {Card, CardItem, Content} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

import {LineChart} from 'react-native-chart-kit';

export default class Plot extends Component {
  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(60, 126, 240, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Rainy Days'], // optional
    };
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: '#fff',
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(107, 106, 104, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };
    return (
      <Card style={styles.card}>
        <CardItem>
          <LineChart
            data={data}
            width={screenWidth * 0.75}
            height={250}
            chartConfig={chartConfig}
          />
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: screenWidth * 0.9,
    alignItems: 'center',
  },
});
