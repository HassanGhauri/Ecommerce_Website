/* eslint-disable no-unused-vars */
import React,{useContext, useState} from 'react'
import './Navbar.css'
import { FaShoppingCart } from "react-icons/fa";
import { FaShopify } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <span><FaShopify/></span>
            <p>Shop Inn</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop {menu==="shop" ? <hr/>:<></>}</Link></li>
            <li onClick={()=>{setMenu("clothing")}}><Link to='clothing' style={{textDecoration:'none'}}>Clothing & Fashion {menu==="clothing" ? <hr/>:<></>}</Link>  </li>
            <li onClick={()=>{setMenu("devices")}}><Link to='devices' style={{textDecoration:'none'}}>Electronic Devices {menu==="devices" ? <hr/>:<></>}</Link></li>
            <li onClick={()=>{setMenu("home")}}><Link to='home' style={{textDecoration:'none'}}>Home & Lifestyle {menu==="home" ? <hr/>:<></>}</Link></li>
        </ul>
        <div className='nav-login-cart'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><span><FaShoppingCart/></span></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>

        </div>
    </div>
  )
}

export default Navbar