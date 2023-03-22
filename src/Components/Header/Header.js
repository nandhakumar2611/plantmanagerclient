import React from 'react'

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-primary topbar">
                <a className="navbar-brand d-block ms-1" href="/#">PLANT MANAGER</a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white me-4" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user border-1"></i> Nandhakumar
                            </a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="./Hero">Profile</a>
                                <a className="dropdown-item" href="./Hero">Logout</a>
                                <a className="dropdown-item" href="./Hero">Demo</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header