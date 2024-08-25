/* eslint-disable no-unused-vars */
import React from 'react'
import './Footer.css'
import { FaShopify } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
const Footer = () => {
  return (
    <div className='footer'>
        
        <div className='footer-logo'>
            <span><FaShopify/></span>
            <p>SHOP INN</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <span><AiFillInstagram/></span>
            </div>
            <div className='footer-icons-container'>
                <span><FaPinterest/></span>
            </div>
            <div className='footer-icons-container'>
                <span><IoLogoWhatsapp/></span>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>Copyright @ 2024 - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
