import React,{Component} from 'react';
import axios from 'axios';
import {Row,Col} from 'reactstrap';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import Linechart from './Linechart';


class CryptoDetail extends Component{
  constructor(props){
    super(props);

    this.state={
      detail:[],
      timeperiod:'7d',
      coinHistory:[]
    }
  }


  componentDidMount(){
    this.refresh();
  }

  refresh=()=>{
    axios({
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${this.props.match.params.id}`,
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '42ae9fba0cmsh8174364b68e3119p12f6a2jsnffc51f5a4b69'
      }
    }).then((response)=>{
      console.log(response.data.data.coin)
      this.setState({
        detail:response.data.data.coin
      })
    })

    axios({
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/1/history/${this.state.timeperiod}`,
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '42ae9fba0cmsh8174364b68e3119p12f6a2jsnffc51f5a4b69'
      }
    }).then((response)=>{
      this.setState({
        coinHistory:response.data
      })
    })

  }

  handlechange=(event)=>{
    this.setState({
      timeperiod:event.target.value
    },()=>this.refresh())

  }

  render(){

    const stats = [
      { title: 'Price to USD', value: `$ ${this.state.detail.price && millify(this.state.detail.price)}`, icon: <i class="fa fa-usd"></i> },
      { title: 'Rank', value: this.state.detail.rank, icon: <i class="fa fa-hashtag" aria-hidden="true"></i> },
      { title: '24h Volume', value: `$ ${this.state.detail.volume && millify(this.state.detail.volume)}`, icon: <i class="fa fa-bolt"></i> },
      { title: 'Market Cap', value: `$ ${this.state.detail.marketCap && millify(this.state.detail.marketCap)}`, icon: <i class="fa fa-usd"></i> },
      { title: 'All-time-high(daily avg.)', value: `$ ${this.state.detail.allTimeHigh && millify(this.state.detail.allTimeHigh.price)}`, icon: <i class="fa fa-trophy" aria-hidden="true"></i>},
    ];



    const genericStats = [
      { title: 'Number Of Markets', value: this.state.detail.numberOfMarkets, icon: <i class='fa fa-star'></i> },
      { title: 'Number Of Exchanges', value: this.state.detail.numberOfExchanges, icon: <i class="fa fa-money" aria-hidden="true"></i> },
      { title: 'Aprroved Supply', value: this.state.detail.approvedSupply ? <i class="fa fa-check" aria-hidden="true"></i> : <i class="fa fa-close"></i>, icon: <i class="fa fa-exclamation-circle" aria-hidden="true"></i> },
      { title: 'Total Supply', value: this.state.detail.totalSupply, icon: <i class="fa fa-exclamation-circle" aria-hidden="true"></i> },
      { title: 'Circulating Supply', value: this.state.detail.circulatingSupply, icon: <i class="fa fa-exclamation-circle" aria-hidden="true"></i> },
    ];

    const time = ['7d', '24h', '3h', '30d', '1y', '3m', '3y', '5y'];

    

    return(
      <>
        <div style={{textAlign:"center"}}>
          <h3 style={{color:'blue'}}>{this.state.detail.name} ({this.state.detail.slug}) Price</h3>
          <p>{this.state.detail.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </div>

        <div style={{marginLeft:'50px'}}>

          <Row>
            <select style={{width:'200px',margin:'10px',padding:'3px'}} value={this.state.timeperiod} onChange={this.handlechange}>
              {time.map((val)=>{
                return(
                  <option value={val}>{val}</option>
                )
              })}
            </select>
            <br/>
            <Linechart 
            coinHistory={this.state.coinHistory} 
            currentPrice={this.state.detail.price}
            coinName={this.state.detail.name}
            />

            
          </Row>
          <br/><br/>

          <Row>
            <Col>
              <h3>{this.state.detail.name} Value Statistics</h3>
              <p>An overview showing the statistics of {this.state.detail.name}</p>
          
              {stats.map(({title,value,icon})=>{
                return(
                <Col>
                  <Row style={{margin:'15px',fontSize:'17px'}}>
                    <Col>{icon} {title}</Col>
                    <Col><h5>{value}</h5></Col>
                  </Row>
                </Col>
                )
              })}
            </Col>

            <Col>
              <h3>Other Statistics</h3>
              <p>An overview showing the stats of all cryptocurrencies</p>
          
              {genericStats.map(({title,value,icon})=>{
                return(
                <Col>
                  <Row style={{margin:'15px',fontSize:'17px'}}>
                    <Col>{icon} {title}</Col>
                    <Col><h5>{value}</h5></Col>
                  </Row>
                </Col>
                )
              })}
            </Col>
          </Row>
          <br/>

          <Row>
            <Col>
              <h3>What is {this.state.detail.name}?</h3>
              {HTMLReactParser(""+this.state.detail.description)}
            </Col>
            <Col>
              <h3>{this.state.detail.name} Links</h3>
              {this.state.detail.links?.map((link)=>{
                return(
                <Row key={link.name} style={{margin:'25px',fontSize:'20px'}}>
                  <Col xs={4}>{link.type}</Col>
                  <Col><a href={link.url} target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>{link.name}</a></Col>
                  <br/>
                </Row>
              )})}
            </Col>
          </Row>

        </div>
      </>
    )
  }

}

export default CryptoDetail