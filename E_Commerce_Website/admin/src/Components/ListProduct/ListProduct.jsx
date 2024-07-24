/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import axios, { all } from 'axios'
import { RxCross2 } from "react-icons/rx";
const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await axios.get("http://localhost:4000/allproducts")
    .then((res)=>{
      setAllProducts(res.data);
      console.log(allproducts)
  })
  }

  useEffect(()=>{
    fetchInfo()
  },[]);

  const remove_product = async(id)=>{
    await axios.post("http://localhost:4000/removeproduct",JSON.stringify({id:id}),{
      headers: {
      "content-type": "application/json", // do not forget this
    }})
    await fetchInfo();
  }


  return (
    <div className='list-product'>
      <h1>All products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
        <div className='listproduct-allproducts'>
          <hr/>
            {allproducts.map((product,index)=>{
                return <>
                        <div key={index} className='listproduct-format-main listproduct-format'>
                          <img src={product.image} alt='' className='listproduct-product-icon'/>
                          <p>{product.name}</p>
                          <p>Rs.{product.old_price}</p>
                          <p>Rs.{product.new_price}</p>
                          <p>{product.category}</p>
                          <span className='listproduct-remove-icon' onClick={()=>{remove_product(product.id)}}><RxCross2 /></span>
                        </div>
                        <hr/>
                      </>
            })}
        </div>
    </div>
  )
}

export default ListProduct