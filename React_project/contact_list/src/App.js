import React,{useState,useEffect} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import List from './components/List';
import axios from 'axios';

const BASE_URL="https://dummyapi.io/data/v1";
const API_ID="61597b1865d5e575f843a50c"


function App(){
  const [contact,setcontact]=useState([]);
  const [loading,setloading]=useState(true)

  // useEffect(()=>{
  //   axios.get('https://dummyapi.io/data/v1/user?page=1&limit=10')
  //   .then((response)=>{
  //     setcontact(response.data)
  //     console.log(contact)
  //   })
  // })
  useEffect(()=>{
    setloading(true)
    axios.get(
      'https://dummyapi.io/data/v1/user?page=1&limit=10',
      {headers:{"api-id":API_ID}})
      .then(({data})=>
      setcontact(data))
      .catch(console.error)
      .finally(()=>setloading(false))
  },[])


  return(
    <div>
      <Header/>
      <Footer/>
      <List contact={contact} loading={loading}/>
    
    </div>
  )
}

export default App