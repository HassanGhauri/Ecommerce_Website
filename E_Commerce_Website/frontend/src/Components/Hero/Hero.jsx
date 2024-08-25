/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Hero.css'

import { FaArrowAltCircleRight } from "react-icons/fa";
import hero_img from '../Assets/hero_img.png'
const Hero = () => {
    const clickhandler = ()=>{
        window.scrollTo(500,2100)
    }
  return (
    <div className='hero'>
        <div className='hero-right'>
            <img src={hero_img} alt='hero_img' />
        </div>
        <div className='hero-left'>
            <div>
                <div className='hero-hand-icon'>
                    <p>Welcome</p>
                    <span></span>
                </div>
                <p>To ShopInn!</p>
                <p></p>
            </div>
            <h3>We offer products ranging from:</h3>
            <h3>Clothing & Fashion to Home & lifstyle</h3>
            <h3>Feel free to explore our e-store to your heart's liking.</h3>
            <div className='hero-latest-btn' onClick={clickhandler}>
                <div>Latest Collection</div>
                <span><FaArrowAltCircleRight/></span>
            </div>
        </div>
        
    </div>
  )
}

export default Hero
