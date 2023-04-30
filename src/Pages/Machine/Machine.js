import React, {useEffect, useState } from 'react'
import Select from 'react-select';
import dataService from "../../Service/dataService";

const Machine = () => {

    let [machineName,setMachineName] = useState('')
    let [machinedesc,setMachineDesc] = useState('')
    let [operation,setOperation] = useState([])
    let [listoperation, setListOperation] = useState([])
  
    const submitform =(evevt) => {
      evevt.preventDefault()
      const postData =
      {

        machineName:machineName,
        machineDesc:machinedesc,
        operation:operation
      }
      console.log('PRINTING POSTDATA - ADD USER',postData);
      dataService.postexe("auth/machine",postData)
        .then(response => {
          console.log('USER ADDED SUCCESSFULLY',response.data);
        })
        .catch(error => {
          console.log('SOMETHING WRONG', error);
        })
    }
  
    const handleSelect = (e) => {
      console.log('OPEARTION',e);
      setOperation(Array.isArray(e) ? e.map(x => x.value):[]);
    }

    const initOperation = () => {

        const arr = [];
        const url = `/auth/operation`;    // uRL to get all operation
        dataService.getexe(url)
        .then(response => {
            console.log("Operation DATA",response.data);
            let result = response.data;
            result.map((opt)=>{
                return arr.push({value: opt.id, label: opt.operationName})
            })
            setListOperation(arr)
        })
        .catch(error => {
            console.log("ROLE DATA ERROR",error);
        })
    }

    useEffect(() => {
        initOperation();
      }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-8">
                    {/*  Account details card */}
                    <div className="card mb-4">
                        <div className="card-header">Machine Details</div>
                        <div className="card-body">
                            <form onSubmit={submitform}>
                                {/*  Form Group (username) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Machine name</label>
                                    <input
                                        className="form-control"
                                        id="inputUsername"
                                        type="text"
                                        placeholder="Enter your username"
                                        onChange={evevt => setMachineName(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (email address)--> */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Machine Description</label>
                                    <input
                                        className="form-control"
                                        id="inputEmailAddress"
                                        type="text"
                                        placeholder="Enter your email address"
                                        onChange={evevt => setMachineDesc(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Row--> */}
                                <div className="row gx-3 mb-3">
                                    {/*  Form Group (Role)--> */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputRole">Operation</label>
                                        <Select
                                            options={listoperation}
                                            isMulti
                                            onChange={handleSelect}
                                            value={listoperation.filter(obj => operation.includes(obj.value))}
                                            // value={options.filter(obj => role.includes(obj.value))} 
                                            />
                                        {/* </Select> */}
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

export default Machine