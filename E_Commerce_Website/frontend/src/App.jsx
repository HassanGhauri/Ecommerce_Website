/* eslint-disable no-unused-vars */

import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import sale_banner from './Components/Assets/sale_banner.jpg'

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/clothing' element={<ShopCategory banner={sale_banner} category="clothing" />}/>
          <Route path='/devices' element={<ShopCategory banner={sale_banner} category="devices" />}/>
          <Route path='/home' element={<ShopCategory banner={sale_banner} category="home" />}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
