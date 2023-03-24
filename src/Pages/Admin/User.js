import React, { useState } from 'react'
import Select from 'react-select';
import image1 from '../../Assets/image/girl1.png'
import dataService from "../../Service/dataService";

const User = () => {

  let [username,setUserName] = useState('')
  let [password,setPassword] = useState('')
  let [email,setEmail] = useState('')
  let [contact,setContact] = useState('')
  let [role,setRole] = useState([])

  const submitform =(evevt) => {
    evevt.preventDefault()
    const postData =
    {
      userName:username,
      password:password,
      email:email,
      contactNo:contact,
      role:role
    }
    console.log('PRINTING POSTDATA - ADD USER',postData);
    dataService.exe("auth/signup",postData)
      .then(response => {
        console.log('USER ADDED SUCCESSFULLY',response.data);
      })
      .catch(error => {
        console.log('SOMETHING WRONG', error);
      })
  }

  const options =[
    {value: 'admin', label: 'ADMIN'},
    {value: 'manager', label: 'MANAGER'},
    {value: 'user', label: 'USER'}
  ]

  const handleSelect = (e) => {
    console.log('ROLE',e);
    setRole(Array.isArray(e) ? e.map(x => x.value):[]);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img className="img-account-profile rounded-circle mb-2" src={image1} height={"20%"} width={"20%"} alt=""></img>
              {/* <!-- Profile picture help block--> */}
              <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
              {/* <!-- Profile picture upload button--> */}
              <button className="btn btn-primary" type="button">Upload new image</button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form onSubmit={submitform}>
                {/* <!-- Form Group (username)--> */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                  <input 
                    className="form-control" 
                    id="inputUsername" 
                    type="text" 
                    placeholder="Enter your username"
                    onChange={evevt => setUserName(evevt.target.value)} > 
                  </input>
                </div>
                {/* <!-- Form Group (email address)--> */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                  <input 
                    className="form-control" 
                    id="inputEmailAddress" 
                    type="email" 
                    placeholder="Enter your email address"
                    onChange={evevt => setEmail(evevt.target.value)} >   
                  </input>
                </div>
                {/* <!-- Form Row --> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (Contact No)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputContactNo">Contact No</label>
                    <input 
                      className="form-control" 
                      id="inputContactNo" 
                      type="text" 
                      placeholder="Enter your Contact No"
                      onChange={evevt => setContact(evevt.target.value)} >    
                    </input>
                  </div>
                  {/* <!-- Form Group (Password)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPassword">Password</label>
                    <input 
                      className="form-control"
                      id="inputLocation"
                      type="text"
                      placeholder="Enter your Password"
                      onChange={evevt => setPassword(evevt.target.value)} >    
                    </input>
                  </div>
                </div>
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (Role)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputRole">Role</label>
                    <Select 
                    options={options} 
                    isMulti 
                    onChange={handleSelect} 
                    value={options.filter(obj => role.includes(obj.value))}/>
                    {/* </Select> */}
                  </div>
                </div>
                {/* <!-- Save changes button--> */}
                <button className="btn btn-primary" type="submit">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User