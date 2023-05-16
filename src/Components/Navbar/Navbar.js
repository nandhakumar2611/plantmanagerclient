import React from 'react'
// import { Navbardata } from './Navbardata'
import NavbarMenu from './NavbarMenu'

const Navbar = ({items}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="/#">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {items.map((item, index) => {
                                return <NavbarMenu items={item} key={index} />
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar