import React from 'react'
import Left from './Left'
import { Outlet } from 'react-router-dom'
import '../styles/main.css'
import { FooterLinks } from './FooterLinks'
import Footer from './Footer'
const Main = () => {
  return (
    <>
    <div className='main'>
       <Left/>
       <Outlet/>

    </div>
           <FooterLinks/>
           <Footer/>
           </>
  )
}

export default Main