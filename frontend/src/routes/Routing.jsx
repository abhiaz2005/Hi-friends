import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Orders from '../components/Orders'
import Profile from '../components/Profile'
import Login from '../components/partials/Login'
import Signup from '../components/partials/Signup'
import Contact from '../components/partials/Contact'
import Factory from '../components/partials/Factory'
import AddProduct from '../components/partials/AddProduct'
import MyCart from '../components/MyCart'
import About from '../components/partials/About'


const Routing = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/factory" element={<Factory />} />
            <Route path="/about" element={<About />} />
            <Route path="/factory/add" element={<AddProduct />} />
        </Routes>
    </>
  )
}

export default Routing