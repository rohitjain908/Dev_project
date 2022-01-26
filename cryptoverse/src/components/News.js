import React, { Component } from 'react';
import axios from 'axios';
import {Card,CardBody,CardImg,Row,Col} from 'reactstrap';
import moment from 'moment';

const demoimg='https://www.bing.com/th?id=OVFT.4kErwBMOSS4raIMw952HDy&pid=News';




class News extends Component {
  constructor(props){
    super(props);

    this.state={
      News:[],
      category:'cryptocurrency',
      cryptos:[]
    }
  }


  refresh=()=>{
    const count=this.props?.simplified?6:20;

    axios({
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: this.state.category, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off',count:`${count}`},
      headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '42ae9fba0cmsh8174364b68e3119p12f6a2jsnffc51f5a4b69'
      }
    }).then((response)=>{
      console.log(response.data.value)
      this.setState({
        News:response.data.value
      })
    })

  }

  




  componentDidMount(){
    this.refresh();


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
        cryptos:response.data.data.coins
      })
    )


  }

  handlechange=(event)=>{
    this.setState({
      category:event.target.value
    },()=>this.refresh())


  }

  
  render() {

    return (
      <div>
        {!this.props?.simplified&&
          <select value={this.state.category} onChange={this.handlechange} style={{marginTop:'10px',marginLeft:'10px',marginBottom:'10px',padding:'3px'}}>
            <option selected value="cryptocurrency" >Seacrh a crytpo news</option>
            {this.state.cryptos.map((coin)=>{
              return(
                <option value={coin.name}>{coin.name}</option>
              )
            })}
          </select>
        }

        <Row xs={2} md={3} className="g-7" style={{marginRight:'0px'}}>
          {this.state.News.map((news)=>{
            return(
            <Col className="py-2 px-3">
              <Card id="news-card">
                <CardBody>
                  <Row>
                    <Col xs={8}><h5>{news.name}</h5></Col>
                    <Col><CardImg src={news?.image?.thumbnail?.contentUrl||demoimg}/></Col>
                  </Row>
                  <hr/>
                  <p>
                    {`${news.description.substr(0,100)}`}
                    <a href={news.url} target="_blank"style={{textDecoration:'none'}}> Read More</a>...
                  </p>
                  <Row>
                    <Col xs={7} style={{textShadow:'inherit',fontStyle:'oblique'}}>
                    {news.provider[0]?.name} 
                    </Col> 
                    <Col>{moment(news.datePublished).startOf('ss').fromNow()}</Col> 
                    </Row>       
                </CardBody>
              </Card>
            </Col>
          )})}
        </Row>
        
      </div>
    )
  }
}


export default (News)
