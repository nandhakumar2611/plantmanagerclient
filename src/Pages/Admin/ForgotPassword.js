import React, { useState } from 'react'
import dataService from "../../Service/dataService";

const ForgotPassword = () => {

    let [loginAlert, setLoginAlert] = useState(false)
    let [errorAlert, setErrorAlert] = useState(false)
    let [username, setUserName] = useState('')
    let [Password, setPassword] = useState('')



    const submitform = (event) => {
        event.preventDefault()
        const postData =
        {
            password: Password
        }
        console.log('PRINTING POSTDATA - LOGIN', postData);
        dataService.putexe(`/auth/user/forgotpassword/${username}`, postData)
            .then(response => {
                console.log('LOGIN SUCCESSFULLY', response.data);
                setLoginAlert(true)
            })
            .catch(error => {
                console.error('SOMETHING WRONG', error);
                setErrorAlert(true)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-5 mx-auto">
                        {/* Login Card  */}
                        <div className="card border-0 shadow-lg rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">Forgot Password</h5>
                                <form onSubmit={submitform}>
                                {errorAlert && (
                             
                             <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                          email is wrong !...
                                        <button 
                                            type="button" 
                                            className="btn-close" 
                                            data-bs-dismiss="alert" 
                                            aria-label="Close" 
                                            onClick={()=>setLoginAlert(false)}>
                                        </button>
                                        </div>
                                    )}
                                    {/* Form Group (username)  */}
                                    <div className="mb-3"> 
                                        <label className="mb-2" htmlFor="inputUsername">Email</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="inputUsername"
                                            placeholder="Enter email"
                                            required
                                            onChange={event => setUserName(event.target.value)}>
                                        </input>
                                    </div>
                                    {/* Form Group Password */}
                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="inputPassword">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="inputPassword"
                                            placeholder="Enter Password"
                                            required
                                            onChange={event => setPassword(event.target.value)}>
                                        </input>
                                    </div>
                                    <br></br>
                                    {/* submit Button  */}
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary btn-lg" type="submit">Continue</button>
                                    </div>
                                </form>
                                {loginAlert && (
                                    <div className="alert alert-warning alert-dismissible fade show mt-5" role="alert">
                                        <p>Your Password is successfully changed...</p>
                                        <a href='./login' className="text-decoration-none fst-normal"><h6>Click here to login.</h6></a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword