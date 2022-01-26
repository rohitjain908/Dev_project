import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import { IconContext } from 'react-icons';

import icon from '../images/cryptocurrency.png';




function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className="nav-menu active">
          <ul className='nav-menu-items'>
            <li id="head">
              <img src={icon}/> 
                 <span>Cryptoverse</span>
              </li>
            <li className="nav-text">
                <Link to="/home"><i class="fa fa-home" aria-hidden="true"></i> <span>Home</span></Link>
            </li>
            <li className="nav-text">
                <Link to="/cryptocurrencies"><i class="fa fa-btc" aria-hidden="true"></i> <span>Cryptocurrencies</span></Link>
            </li>
            <li className="nav-text">
                <Link to="#"><i class="fa fa-money" aria-hidden="true"></i> <span>Exchanges</span></Link>
            </li>
            <li className="nav-text">
                <Link to="/news"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> <span>News</span></Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>

    </>
  );
}

export default Navbar;