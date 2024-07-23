/* eslint-disable no-unused-vars */
import React from 'react'
import './Offers.css'
import offerimg2 from '../Assets/offerimg2.png'
const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLING PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className='offers-right'>
            <img src={offerimg2} alt='' />
        </div>
    </div>
  )
}

export default Offers