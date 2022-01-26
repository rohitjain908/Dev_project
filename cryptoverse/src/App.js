import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import News from './components/News';
import CryptoDetail from './components/CryptoDetail';
import Cryptocurrencies from './components/Cryptocurrencies';
import './style/Navbar.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/cryptocurrencies" component={Cryptocurrencies}/>
          <Route exact path="/news" component={News}/>
          <Route exact path="/detail/:id" component={CryptoDetail}/>
        </Switch>
      </div>
    </BrowserRouter>
  )

}

export default App