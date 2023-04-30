import React,{useEffect, useState} from 'react'
import Select from 'react-select';
import dataService from "../../../Service/dataService";
import $ from "jquery"
import { useParams } from 'react-router-dom';

const EditMachine = () => {

  let [machineName, setMachineName] = useState('')
  let [machineDesc, setMachineDesc] = useState('')
  let [operation, setOperation] = useState([])
  let [listOperation, setListOperation] = useState([])

  const {id} = useParams();
  const url  = `/api/${id}`;

  const handleSelect = (e) => {
      setOperation(Array.isArray(e) ? e.map(x => x.value):[]);
  }

  const options =[
    {id: 1, value: 'Cutting', label: 'CUTTING'},
    {id: 2, value: 'DRILLING', label: 'DRILLING'},
    {id: 3, value: 'Milling', label: 'MILLING'},
    {id: 4, value: 'Turning', label: 'TURNING'}
  ]

  const submitform =(evevt) => {
    evevt.preventDefault()
    const postData =
    {
      machineName:machineName,
      machineDesc:machineDesc
    }
    console.log('PRINTING POSTDATA - ADD USER',postData);
    dataService.postexe("auth/signup",postData)
      .then(response => {
        console.log('MACHINE ADDED SUCCESSFULLY',response.data);
      })
      .catch(error => {
        console.log('MACHINE NOT ADDED', error);
      })
  }

  // Endpoint to get all Operation 
  const initOperation = () => {
      
      const url = ``;
      dataService.getexe(url)
      .then(response => {
          console.log("OPERATION DATA",response.data);
          setListOperation(response.data)
      })
      .catch(error => {
          console.log("OPERATION DATA ERROR",error);
      })
  }

  useEffect(() => {
      initOperation();
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {/* New Machine Add form */}
          <div className="card mb-4">
            <div className="card-header">Machine Details</div>
            <div className="card-body">
              <form onSubmit={submitform}>
                {/* Machien Name */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputMachineName">Machine Name</label>
                  <input
                    className="form-control"
                    id="inputMachineName"
                    type="text"
                    placeholder="Enter Machine Name"
                    onChange={event => setMachineName(event.target.value)}>
                  </input>
                </div>
                {/* Machien Description */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputMachineDesc">Machine Name</label>
                  <input
                    className="form-control"
                    id="inputMachineDesc"
                    type="text"
                    placeholder="Enter Machine DEscription"
                    onChange={event => setMachineDesc(event.target.value)}>
                  </input>
                </div>
                {/*Operation List */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputMachineDesc">Machine Name</label>
                  <Select
                    isMulti
                    options={listOperation}
                    value={listOperation.filter(obj => operation.includes(obj.value))}
                    onChange={handleSelect}>
                  </Select>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputRole">Role</label>
                  <div className="container-fluid table-responsive-sm">
                    <div className="table p-0 pb-2">
                      <table id="example" className="table align-items-center justify-content-center mb-0 ">
                        <thead>
                          <tr>
                            <td className="text-uppercase">S.No</td>
                            <td className="text-uppercase">Operation Name</td>
                            <td className="text-uppercase">Delete</td>
                          </tr>
                        </thead>
                        <tbody>
                          {options.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-xs">{item.id}</td>
                                <td className="text-xs">{item.label}</td>
                                <td className="text-xs">DELETE</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMachine