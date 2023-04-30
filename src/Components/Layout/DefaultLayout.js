import React from 'react'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'
import MenuNavbar from '../Navbar/MenuNavbar'

const DefaultLayout = () => {
  return (
    <div className="d-flex flex-column">
        <Header/>
        <div>
          <MenuNavbar/>
          <div className="body pt-1 pb-5 bg-light">
            <Content/>
          </div>
          <Footer/>
        </div>
    </div>
  )
}

export default DefaultLayout