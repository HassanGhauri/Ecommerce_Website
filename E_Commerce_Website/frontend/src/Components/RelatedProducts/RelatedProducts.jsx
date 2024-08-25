/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'
const RelatedProducts = ({category}) => {
  const[related_products,setRelated_Product] = useState([]);

  useEffect(()=>{
    axios.post("http://localhost:4000/relatedproducts",{category})
    .then((data)=>{
      setRelated_Product(data.data);
    })
  },[])
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
        {related_products.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          } 
        )}
        </div>
    </div>
  )
}

export default RelatedProducts
