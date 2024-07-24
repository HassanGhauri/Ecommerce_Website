/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+ 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const[all_product,setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
    axios.get("http://localhost:4000/allproducts")
    .then((data)=>{
      setAll_Product(data.data);
    })
    if(localStorage.getItem('auth-token')){
      axios.post("http://localhost:4000/getcart",{body:""},{
        headers:{
          "auth-token":`${localStorage.getItem('auth-token')}`,
          "content-type":"application/json",
        }
      }).then((data)=>{
        setCartItems(data.data);
      })
    }
  },[]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      axios.post("http://localhost:4000/addtocart",JSON.stringify({"itemId":itemId}),{
        headers: {
          "auth-token":`${localStorage.getItem('auth-token')}`,
          "content-type":"application/json",
        }
      })
      .then((data)=>{
        console.log(data.data);
      })
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      axios.post("http://localhost:4000/removefromcart",JSON.stringify({"itemId":itemId}),{
        headers: {
          "auth-token":`${localStorage.getItem('auth-token')}`,
          "content-type":"application/json",
        }
      })
      .then((data)=>{
        console.log(data.data);
      })
    }


  
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
      
    }
    return totalAmount;
  };

  const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem+= cartItems[item];
        }
    }
    return totalItem;
  }

  const contextValue = {
    all_product,
    cartItems,
    getTotalCartAmount,
    getTotalCartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
