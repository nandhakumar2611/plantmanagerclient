import React,{useState} from 'react'
import dataService from "../../Service/dataService";

const Login = () => {

    let [loginAlert,setLoginAlert]=useState(false)
    let [username,setUserName]=useState('')
    let [Password,setPassword]=useState('')

    const submitform =(event)=>{
        event.preventDefault()
        const postData =
        {
            username:username,
            password:Password
        }
        console.log('PRINTING POSTDATA - LOGIN', postData);
        dataService.postexe("/auth/signin",postData)
            .then(response => {
              console.log('LOGIN SUCCESSFULLY', response.data);
              initLogin(response.data)
            })
            .catch(error => {
                setLoginAlert(true)
              console.error('SOMETHING WRONG', error);
            })
    }

    const initLogin=(data)=>{

        if(data != null){
          dataService.setUser(data)
          dataService.setCurrentRole(data.roles[0])
          dataService.setAccessToken(data.accessToken)
          window.location.href='/'
        }
        else {
            setLoginAlert(true)
          console.error("ERROR")
        }
    }

    const clearLogin=()=>{
        dataService.logout()
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-5 mx-auto">
                        {/* Login Card  */}
                        <div className="card border-0 shadow-lg rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">Log in to your account</h5>
                                <form onSubmit={submitform}>
                                    {loginAlert && (
                                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                         username and Password is Wrong...
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
                                        <label className="mb-2" htmlFor="inputUsername">Username</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="inputUsername"
                                            placeholder="Enter Username"
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
                                            onChange={event => setPassword(event.target.value)}>
                                        </input>
                                    </div>
                                    <div className=" mt-4">
                                        <a href='./forgotpassword' className="text-decoration-none fst-normal"><h6>Forgot Password?</h6></a>
                                    </div>
                                    <br></br>
                                    {/* submit Button  */}
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary btn-lg" type="submit">Continue</button>
                                    </div>
                                </form>
                                <br></br>
                                <hr></hr>
                                <div className="text-center mt-4">
                                    <a href='./hero' className="text-decoration-none fst-normal"><h6>Can't log in? Sign up for an account</h6></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {clearLogin()}
        </div>
    )
}

export default Login