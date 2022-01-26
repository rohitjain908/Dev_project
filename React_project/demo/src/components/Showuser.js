import React from 'react';
import { Card, CardText, CardBody,CardTitle } from 'reactstrap';


function Showuser(props){
  return(
    <div style={{marginLeft:'530px'}}>
      <Card  style={{width:'200px', borderColor: '#333' }}>
        <CardBody>
          <CardTitle tag="h5">{props.username}</CardTitle>
          <CardText>{props.email}</CardText>
        </CardBody>
      </Card>
      <br></br>
    </div>
  );
}

export default Showuser


