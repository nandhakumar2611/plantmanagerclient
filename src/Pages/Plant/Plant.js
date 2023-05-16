import React, {useEffect, useState } from 'react'
import Select from 'react-select';
import { useNavigate  } from 'react-router-dom';
import dataService from "../../Service/dataService";

const Plant = () => {

  let [plantName,setPlantName] = useState('')
  let [location,setLocation] = useState('')
  let [machine,setMachine] = useState([])
  let [listMachine, setListMachine] = useState([])

  const navigate = useNavigate();

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
        navigate('/plantview')
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
          {/*  Plant card */}
          <div className="card mb-4">
            <div className="card-header">Plant Details</div>
            <div className="card-body">
              <form onSubmit={submitform}>
                {/*  Form Group (Plant Name) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPlantName">Plant Name </label>
                  <input
                    className="form-control"
                    id="inputPlantName"
                    type="text"
                    placeholder="Enter Plant Name"
                    onChange={evevt => setPlantName(evevt.target.value)} >
                  </input>
                </div>
                {/*  Form Group (Location)--> */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputLocation">Location </label>
                  <input
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Enter Location"
                    onChange={evevt => setLocation(evevt.target.value)} >
                  </input>
                </div>
                {/*  Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/*  Form Group (Machine)--> */}
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
                <button className="btn btn-primary" type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plant