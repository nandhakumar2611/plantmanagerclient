import React from 'react'
import Navbardata from './Navbardata'
import Navbar from './Navbar'

const MenuNavbar = () => {
  return (
    <div>
        <Navbar items = {Navbardata.menu()}/>
    </div>
  )
}

export default MenuNavbar