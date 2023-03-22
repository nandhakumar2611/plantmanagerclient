import React from 'react'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'
import MenuNavbar from '../Navbar/MenuNavbar'
// import Profile from '../../Pages/Profile/Profile'

const DefaultLayout = () => {
  return (
    <div>
        <Header/>
        <MenuNavbar/>
        <Content/>
        <Footer/>
        {/* <Profile/> */}
    </div>
  )
}

export default DefaultLayout