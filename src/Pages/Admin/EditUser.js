import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import dataService from "../../Service/dataService";
import Select from 'react-select';

const EditUser = () => {

    let [user, setUser] = useState([]) 
    let [userName, setUserName] = useState('')
    let [email, setEmail] = useState('')
    let [contact, setContact] = useState('')
    let [column, setColumn] = useState('')
    let [role, setRole] = useState([])
    let [selectedRoles, setSelectedRoles] = useState([])
    let [listrole, setListRole] = useState([])

    const navigate = useNavigate();

    const handleSelect = (selectedOptions) => {
        console.log('ROLE', selectedOptions);
        const roles = selectedOptions.map((option) => ({role : option.label}));
        setRole(roles);
        setSelectedRoles(selectedOptions)
    }

    const initRole = () => {

        const arr = [];
        const url = `/auth/role`;    // uRL to get all operation
        dataService.getexe(url)
        .then(response => {
            console.log("ROLE DATA",response.data);
            let result = response.data;
            result.map((opt)=>{
                return arr.push({value: opt.id, label: opt.role})
            })
            setListRole(arr)
        })
        .catch(error => {
            console.log("ROLE DATA ERROR",error);
        })
    }

    const {id} = useParams();
    const url = `/auth/user/${id}`

    const initMachine = () => {

        dataService.getexe(url)
            .then(response => {
                console.log("USER DATA BY ID",response.data);
                setUser(response.data.roles)
                setUserName(response.data.username)
                setEmail(response.data.email)
                setContact(response.data.contactNo)
                // setUserName(response.data.roles)
            })
            .catch(error => {
                console.log("USER ERROR ", error);
            })
      }

      const remove = (item) => {
        
        dataService.deleteexe(`/auth/user/${id}/role/${item.id}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initMachine()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    const submitform =(evevt) => {
        evevt.preventDefault()
        const postData =
        {
          username:userName,
          email:email,
          contactNo:contact,
          roles:role
        }
        console.log('PRINTING POSTDATA - ADD USER',postData);
        dataService.putexe(`auth/usersrole/${id}`,postData)
          .then(response => {
            console.log('USER ADDED SUCCESSFULLY',response.data);
            navigate('/userview')
          })
          .catch(error => {
            console.log('SOMETHING WRONG', error);
          })
      }

      useEffect(() => {
        initMachine();
        initRole();
      }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        {/* <!--  card--> */}
                        <div className="card mb-4">
                            <div className="card-header">Machine Details</div>
                            <div className="card-body">
                                <form onSubmit={submitform}>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername">User Name</label>
                                        <input
                                            className="form-control"
                                            id="inputUsername"
                                            type="text"
                                            placeholder="Enter your username"
                                            value={userName}
                                            onChange={evevt => setUserName(evevt.target.value)}>
                                        </input>
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">email</label>
                                        <input
                                            className="form-control"
                                            id="inputEmailAddress"
                                            type="text"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={evevt => setEmail(evevt.target.value)}>
                                        </input>
                                    </div>
                                    {/* <!-- Form Row --> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (Contact No)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputContactNo">contact</label>
                                            <input
                                                className="form-control"
                                                id="inputContactNo"
                                                type="text"
                                                placeholder="Enter your Contact No"
                                                value={contact}
                                                onChange={evevt => setContact(evevt.target.value)}>
                                            </input>
                                        </div>
                                    </div>
                                    {/* <!-- Save changes button--> */}
                                    <button className="btn btn-primary" type="submit">Save changes</button>
                                </form>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputRole">Add Role</label>
                                    <Select
                                        options={listrole}
                                        isMulti 
                                        // value={listrole.filter(obj => role.includes(obj.value))}
                                        value={selectedRoles}
                                        onChange={handleSelect}/>
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputRole">Role</label>
                                    <div className="container-fluid table-responsive-sm">
                                        <div className="table p-0 pb-2">
                                            <table className="table table-bordered align-items-center justify-content-center mb-0 ">
                                                <thead>
                                                    <tr>
                                                        <td className="text-uppercase">S.No</td>
                                                        <td className="text-uppercase">Operation Name</td>
                                                        <td className="text-uppercase">Delete</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {user.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-xs">{item.id}</td>
                                                                <td className="text-xs">{item.role}</td>
                                                                <td>
                                                                    <a className="btn btn-danger text-white btn-xs" onClick={() => remove(item)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser