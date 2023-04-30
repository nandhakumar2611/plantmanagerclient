import React,{useEffect, useState} from 'react'
import Select from 'react-select';
import dataService from "../../../Service/dataService";

const AddMachine = () => {

    let [machineName, setMachineName] = useState('')
    let [machineDesc, setMachineDesc] = useState('')
    let [operation, setOperation] = useState([])
    let [listOperation, setListOperation] = useState([])


    const handleSelect = (e) => {
        console.log('OPERATION',e);
        setOperation(Array.isArray(e) ? e.map(x => x.value):[]);
    }

    // Endpoint to get all Operation 
    const initOperation = () => {

        const arr = [];
        const url = `/operation/operation`;    // uRL to get all operation
        dataService.getexe(url)
        .then(response => {
            console.log("OPERATION DATA",response.data);
            let result = response.data;
            result.map((opt)=>{
                return arr.push({value: opt.id, label: opt.operationName})
            })

            setListOperation(arr)
        })
        .catch(error => {
            console.log("OPERATION DATA ERROR",error);
        })
    }

    useEffect(() => {
        initOperation();
    }, [])

    // End Point to save machine
    const submitform =(evevt) => {
        evevt.preventDefault()
        const postData =
        {
            machineName:machineName,
            machineDesc:machineDesc,
            operation:operation
        }
        console.log('PRINTING POSTDATA - ADD USER',postData);
        dataService.postexe("machine/createmachine",postData)
          .then(response => {
            console.log('MACHINE ADDED SUCCESSFULLY',response.data);
          })
          .catch(error => {
            console.log('MACHINE NOT ADDED', error);
          })
      }

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
                                        options={listOperation}
                                        isMulti
                                        value={listOperation.filter(obj => operation.includes(obj.value))}
                                        onChange={handleSelect}>
                                    </Select>
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

export default AddMachine