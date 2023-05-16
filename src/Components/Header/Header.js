import React from 'react'
import dataService from "../../Service/dataService";

const Header = () => {

    const currentUser = dataService.getUser()

    const ChangeRole = (role) => {
        const getuserdata = dataService.getUser();
        dataService.setCurrentRole(getuserdata.roles[role])
        const currentRole = dataService.getCurrentRole()
        if(currentRole === "ADMIN") {
            window.history.pushState("","Dashboard", "/admindashboard");
            window.location.reload();
        }
        else if(currentRole === "MANAGER") {
            window.history.pushState("","DashboardManager", "/managerdashboard");
            window.location.reload();
        }
        else {
            window.history.pushState("","DashboardUser", "/userdashboard");
            window.location.reload();
        }

    }

    const handlelogout = () => {
        dataService.logout();
        window.location.href='/'
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-primary topbar">
                <a className="navbar-brand d-block ms-1" href="/#">MIND MRP</a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white me-4" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user border-1"></i> {dataService.getUser().username}
                            </a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="./profile">Profile</a>
                                <a className="dropdown-item" href="/login" onClick={() => handlelogout()}>Logout</a>
                                <a className="dropdown-item" href="./Hero">Demo</a>
                                <button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModall">changes</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="modal fade" id="exampleModall" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Woohoo, you're reading this text in a modal!</p>
                            {currentUser.roles && currentUser.roles.map((role, index) => 
                            <button  type="button" className="btn btn-secondary" onClick={ () => ChangeRole(index)} data-bs-dismiss="modal" key={index}>{role}</button>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header)