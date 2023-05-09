import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import { Link, useParams } from "react-router-dom";

const UserView = () => {

    let [user, setUser] = useState([])
    let [deletModel,setDeleteModel]=useState(false)
    let [userId, setUserId] = useState('')

    const { id } = useParams();

    const initMachine = () => {

        dataService.getexe("/auth/user")
            .then(response => {
                console.log("USER DATA", response.data);
                setUser(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const ItemSet = (item) => {
        // console.log("model")
        setUserId(item.id)
        setDeleteModel(true)
    }

    const remove = () => {
        
        console.log(userId);
        setDeleteModel(false)
        dataService.deleteexe(`/auth/user/${userId}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initMachine()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    useEffect(() => {
        initMachine();
    }, []);
    return (
        <>
        <div>
            <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                    <a href="/user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fa fa-plus fa-sm text-white-50"></i> Add User</a>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user && user.length > 0 ? (
                                user.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-xs">{item.id}</td>
                                            <td className="text-xs">{item.username}</td>
                                            <td className="text-xs">{item.email}</td>
                                            <td className="text-xs">{item.contactNo}</td>
                                            <td>
                                                <Link to={`/EditUser/${item.id}`} >
                                                    <button className="btn btn-primary text-white btn-xs">
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger text-white btn-xs" onClick={() => ItemSet(item)} >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })):(
                                    <tr>
                                                <td colSpan="6" className="text-center">
                                                    {/* {plant ? 'No plants found': null} */}
                                                    No Data
                                                </td>
                                            </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            { deletModel && (
            <div className="modal fade show " style={{display: 'block'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteModel(false)}>
                    
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setDeleteModel(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => remove()}>Save changes</button>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        </>

        
    )
}

export default UserView