/* eslint-disable no-unused-vars */
import React from 'react'
import './Hero.css'
import { PiHandWaving } from "react-icons/pi";
import { FaArrowAltCircleRight } from "react-icons/fa";
import hero_img from '../Assets/hero_img.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>New Arrivals Only</h2>
            <div>
                <div className='hero-hand-icon'>
                    <p>new</p>
                    <span><PiHandWaving/></span>
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className='hero-latest-btn'>
                <div>Latest Collection</div>
                <span><FaArrowAltCircleRight/></span>
            </div>
        </div>
        <div className='hero-right'>
            <img src={hero_img} alt='hero_img' />
        </div>
    </div>
  )
}

export default Hero