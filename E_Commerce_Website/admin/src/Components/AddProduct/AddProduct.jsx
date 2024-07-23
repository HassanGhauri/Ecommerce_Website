/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './AddProduct.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"clothing",
        new_price:"",
        old_price:""
    })
    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product',image);
        await axios.post("http://localhost:4000/upload",formData, {
            headers: {
             'content-type': 'multipart/form-data' // do not forget this 
            }}).then((data)=>{responseData=data})
            console.log(responseData.data.image_url)
        if(responseData.data.success===1){
            product.image = `${responseData.data.image_url}`;
            console.log(product);
        }
    }
  return (
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here'/>
        </div>
        <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className='addproduct-itemfield'>
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                <option value="clothing">Clothing & Fashion</option>
                <option value="devices">Electronic Devices</option>
                <option value="home">Home & Lifestyle</option>
            </select>
        </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
            {image ?
                <img className='addproduct-thumbnail-img' alt='' src={URL.createObjectURL(image)}/>
                :
                <div className='addproduct-thumbnail-span'>
                        <span ><FaCloudUploadAlt/></span>
                        <p>Upload</p>
                    </div>   
                    }
                    
                
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct