import React from 'react'
import { Container } from 'reactstrap';
import {Row,Col} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

class Home extends React.Component {

  constructor(props){
    super(props);

    this.state={
      global_stats:[]
    }
  }


  componentDidMount(){
    axios({
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '42ae9fba0cmsh8174364b68e3119p12f6a2jsnffc51f5a4b69'
      }
    }).then((response)=>
      // console.log(response.data.data.coins),
      this.setState({
        global_stats:response.data.data.stats,
      })
    )
  }

  render(){

    return (
      <>
        <Container>
          <h1>Global Crypto Stats</h1>
          <Row xs="2">
            <Col>Total Cryptocurrencies <h3>{this.state.global_stats.total}</h3></Col>
            <Col>Total Excahnges <h3>{this.state.global_stats.totalExchanges}</h3></Col>
            <Col>Total Market cap <h3>{parseInt(this.state.global_stats.totalMarketCap)}</h3></Col>
            <Col>Total 24th volume <h3>{parseInt(this.state.global_stats.total24hVolume)}</h3></Col>
            <Col>Total Markets <h3>{parseInt(this.state.global_stats.totalMarkets)}</h3></Col>
          </Row>
        </Container>
        <br/><br/>
        
        <span style={{display:'flex'}}>
          <h4>Top 10 cryptocurrencies in the world</h4>
          <p style={{marginLeft:'500px'}}><Link to="/cryptocurrencies">Show more</Link></p>
        </span>
        
        <Cryptocurrencies simplified/>

        <br/><br/>

        <span style={{display:'flex'}}>
          <h4>Latest Crypto News</h4>
          <p style={{marginLeft:'682px'}}><Link to="/news">Show more</Link></p>
        </span>

        <News simplified/>
      </>
    )
  }
}

export default Home
