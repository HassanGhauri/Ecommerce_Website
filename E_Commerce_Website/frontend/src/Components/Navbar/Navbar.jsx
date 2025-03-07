/* eslint-disable no-unused-vars */
import React,{useContext, useRef, useState} from 'react'
import './Navbar.css'
import { FaShoppingCart } from "react-icons/fa";
import { FaShopify } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import image from '../Assets/chevron.png';
const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <span><FaShopify/></span>
            <p>Shop Inn</p>
        </div>
        <img src={image} alt='' className='nav-dropdown' onClick={dropdown_toggle}/>
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop {menu==="shop" ? <hr/>:<></>}</Link></li>
            <li onClick={()=>{setMenu("clothing")}}><Link to='clothing' style={{textDecoration:'none'}}>Clothing & Fashion {menu==="clothing" ? <hr/>:<></>}</Link>  </li>
            <li onClick={()=>{setMenu("devices")}}><Link to='devices' style={{textDecoration:'none'}}>Electronic Devices {menu==="devices" ? <hr/>:<></>}</Link></li>
            <li onClick={()=>{setMenu("home")}}><Link to='home' style={{textDecoration:'none'}}>Home & Lifestyle {menu==="home" ? <hr/>:<></>}</Link></li>
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.reload('/')}}>Logout</button>:
            <Link to='/login'><button>Login</button></Link>
            }
            
            <Link to='/cart'><span><FaShoppingCart/></span></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>

        </div>
    </div>
  )
}

export default Navbar
