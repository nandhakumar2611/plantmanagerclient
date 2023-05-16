import React, { useState } from 'react'
import Select from 'react-select';  
import { useNavigate  } from 'react-router-dom';
import dataService from "../../Service/dataService";

const Operation = () => {

    let [operationName,setOperationName] = useState('')
    let [operationDesc,setOperationDesc] = useState('')

    const navigate = useNavigate();
  
    const submitform =(evevt) => {
      evevt.preventDefault()
      const postData =
      {
        operationName:operationName,
        operationDesc:operationDesc,
      }
      console.log('PRINTING POSTDATA - ADD USER',postData);
      dataService.postexe("auth/operation",postData)
        .then(response => {
          console.log('OPERATION ADDED SUCCESSFULLY',response.data);
          navigate('/operationview')
        })
        .catch(error => {
          console.log('SOMETHING WRONG', error);
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-8">
                    {/*  Operation card */}
                    <div className="card mb-4">
                        <div className="card-header">Operation Details</div>
                        <div className="card-body">
                            <form onSubmit={submitform}>
                                {/*  Form Group (operation Name) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputOperationname">Operation Name</label>
                                    <input
                                        className="form-control"
                                        id="inputOperationname"
                                        type="text"
                                        placeholder="Enter Operation Name"
                                        onChange={evevt => setOperationName(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (operation Description )--> */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputoperationDesc">Operation Description</label>
                                    <input
                                        className="form-control"
                                        id="inputoperationDesc"
                                        type="text"
                                        placeholder="Enter Operation Description"
                                        onChange={evevt => setOperationDesc(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Save changes button--> */}
                                <button className="btn btn-primary" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Operation