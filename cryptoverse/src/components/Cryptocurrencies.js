import React, { Component } from 'react'
import axios from 'axios';
import {Card,CardText,CardBody,CardImg,Row,Col,Input} from 'reactstrap';
import millify from 'millify'
class Cryptocurrencies extends Component {

  constructor(props){
    super(props);

    this.state={
      cryptos:[],
      list:[],
    }
  }

  refresh=()=>{
    
  }

  componentDidMount(){
    const count=this.props?.simplified?10:50;
    axios({
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '42ae9fba0cmsh8174364b68e3119p12f6a2jsnffc51f5a4b69'
  }
    }).then((response)=>

      // console.log(response.data.data.coins),
      this.setState({
        cryptos:response.data.data.coins,
        list:response.data.data.coins
      })
    )


  }

  nextPath=(path)=>{
    this.props.history.push(path);
  }

  handleclick=(event,id)=>{
    this.nextPath(`/detail/${id}`);
  }

  handlechange=(event)=>{
    console.log(event.target.value)

    const filter_list=this.state.cryptos.filter((currency)=>{
      const name=currency.name.toLowerCase();
      const query=event.target.value.toLowerCase();
      return name.includes(query)
    })

    this.setState({
      list:filter_list
    })

  }

  



  render() {


    return (
      <>
      {!this.props?.simplified&&
      <Input type="text" placeholder="search cryptocurrency" onChange={this.handlechange}
      style={{width:'20%',textAlign:'center',marginLeft:'400px',marginTop:'30px',marginBottom:'20px'}}/>
      }

      
      <Row xs={2} md={3} className="g-4" style={{marginRight:'0px'}}>
        {this.state.list.map((currency,index)=>{
          return(
          
            <Col className="py-2 px-3">
              <div onClick={(e)=>this.handleclick(e,currency.id)}>
                <Card key={currency.id} id="crypto-card">
                  <Row style={{marginTop:'10px'}}>
                    <Col xs={8} style={{marginLeft:'10px',fontWeight:'bolder'}}>{index+1}.{currency.name}</Col>
                    <Col><CardImg src={currency.iconUrl} style={{width:'28px',marginLeft:'50px'}} alt="Card image" /></Col>
                  </Row>
                  <hr/>

                  <CardBody style={{marginLeft:'30px'}}>
                    <CardText>Price:{millify(currency.price)}</CardText>
                    <CardText>Market cap:{millify(currency.marketCap)}</CardText>
                    <CardText>Daily change:{millify(currency.change)}</CardText>
                  </CardBody>
                </Card>
              </div>
            </Col>
          )
        })}
        
      </Row>
      </>
    )
  }
}

export default Cryptocurrencies
