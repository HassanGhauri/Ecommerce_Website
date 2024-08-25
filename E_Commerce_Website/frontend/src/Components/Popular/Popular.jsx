/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import axios from 'axios'
const Popular = () => {
  const [data_product,setData_Product] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4000/popularinyouth")
    .then((data)=>{
      setData_Product(data.data);
    })
  },[])
  return (
    <div className='popular'>
        <h1>Popular in Youth</h1>
        <hr/>
        <div className='popular-item'>
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular
