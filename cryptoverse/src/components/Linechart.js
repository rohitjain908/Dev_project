import React from 'react';
import { Line } from 'react-chartjs-2';
import {Row,Col} from 'reactstrap';
import millify from 'millify';

function Linechart({ coinHistory, currentPrice, coinName}) {

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  return (
    <div>
      <Row>
        <Col><h3 style={{color:'blue'}}>{coinName} Price Chart</h3></Col>
        <Col>
          <h5>Change: {coinHistory?.data?.change}%</h5>
          <h5>Current {coinName} Price: $ {parseInt(currentPrice)}</h5>
        </Col>
      </Row>
      <Line data={data} options={options} />
      
    </div>
  )
}

export default Linechart
