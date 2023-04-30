import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import dataService from "../../Service/dataService";

const Profile = () => {

  let [username, setUserName] = useState('')
  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')
  let [contact, setContact] = useState('')
  let [role, setRole] = useState([])

  const submitform = (evevt) => {
    evevt.preventDefault()
    const postData =
    {
      userName: username,
      password: password,
      email: email,
      contactNo: contact,
      role: role
    }
    console.log('PRINTING POSTDATA - ADD USER', postData);
    dataService.postexe("auth/signup", postData)
      .then(response => {
        console.log('USER ADDED SUCCESSFULLY', response.data);
      })
      .catch(error => {
        console.log('SOMETHING WRONG', error);
      })
  }

  const options = [
    { value: 'admin', label: 'ADMIN' },
    { value: 'manager', label: 'MANAGER' },
    { value: 'user', label: 'USER' }
  ]

  const handleSelect = (e) => {
    console.log('ROLE', e);
    setRole(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
          {/*  Account details card */}
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form onSubmit={submitform}>
                {/*  Form Group (username) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={dataService.getUser().username}
                    onChange={evevt => setUserName(evevt.target.value)} >
                  </input>
                </div>
                {/*  Form Row --> */}
                <div className="row gx-3 mb-3">
                  {/*  Form Group (Contact No)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputContactNo">Contact No</label>
                    <input
                      className="form-control"
                      id="inputContactNo"
                      type="text"
                      placeholder="Enter your Contact No"
                      value={dataService.getUser().phonenumber}
                      onChange={evevt => setContact(evevt.target.value)} >
                    </input>
                  </div>
                  {/*  Form Group (email address)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value={dataService.getUser().email}
                      onChange={evevt => setEmail(evevt.target.value)} >
                    </input>
                  </div>
                </div>
                {/*  Save changes button--> */}
                <button className="btn btn-primary" type="submit">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile