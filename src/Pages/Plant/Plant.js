import React, {useEffect, useState } from 'react'
import Select from 'react-select';
import dataService from "../../Service/dataService";

const Plant = () => {

  let [plantName,setPlantName] = useState('')
  let [location,setLocation] = useState('')
  let [machine,setMachine] = useState([])
  let [listMachine, setListMachine] = useState([])

  const submitform =(evevt) => {
    evevt.preventDefault()
    const postData =
    {
      plantName:plantName,
      location:location,
      machine:machine
    }
    console.log('PRINTING POSTDATA - ADD USER',postData);
    dataService.postexe("auth/plant",postData)
      .then(response => {
        console.log('USER ADDED SUCCESSFULLY',response.data);
      })
      .catch(error => {
        console.log('SOMETHING WRONG', error);
      })
  }

  const handleSelect = (e) => {
    console.log('ROLE',e);
    setMachine(Array.isArray(e) ? e.map(x => x.value):[]);
  }

  const initMachine = () => {

    const arr = [];
    const url = `/auth/machine`;    // uRL to get all operation
    dataService.getexe(url)
    .then(response => {
        console.log("Machine DATA",response.data);
        let result = response.data;
        result.map((opt)=>{
            return arr.push({value: opt.id, label: opt.machineName})
        })
        setListMachine(arr)
    })
    .catch(error => {
        console.log("ROLE DATA ERROR",error);
    })
}

useEffect(() => {
  initMachine();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
          {/*  Account details card */}
          <div className="card mb-4">
            <div className="card-header">Plant Details</div>
            <div className="card-body">
              <form onSubmit={submitform}>
                {/*  Form Group (username) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Plant Name </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    onChange={evevt => setPlantName(evevt.target.value)} >
                  </input>
                </div>
                {/*  Form Group (email address)--> */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Location </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="text"
                    placeholder="Enter your email address"
                    onChange={evevt => setLocation(evevt.target.value)} >
                  </input>
                </div>
                {/*  Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/*  Form Group (Role)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputRole">Machine</label>
                    <Select
                      options={listMachine}
                      isMulti
                      onChange={handleSelect}
                      // value={options.filter(obj => role.includes(obj.value))}
                      value={listMachine.filter(obj => machine.includes(obj.value))}
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

export default Plant