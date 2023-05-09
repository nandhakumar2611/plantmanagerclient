import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dataService from "../../Service/dataService";
import Select from 'react-select';

const EditMachine = () => {

    let [user, setUser] = useState([])
    let [machineName, setMachineName] = useState('')
    let [machineDesc, setMachineDesc] = useState('')
    let [operation, setOperation] = useState([])
    let [selectedRoles, setSelectedRoles] = useState([])
    let [listoperation, setListOperation] = useState([])

    const navigate = useNavigate();

    const handleSelect = (selectedOptions) => {
        console.log('Operation', selectedOptions);
        const operations = selectedOptions.map((option) => ({ id: option.value }));
        setOperation(operations);
        setSelectedRoles(selectedOptions)
    }

    const initRole = () => {

        const arr = [];
        const url = `/auth/operation`;    // uRL to get all operation
        dataService.getexe(url)
            .then(response => {
                console.log("Operation DATA", response.data);
                let result = response.data;
                result.map((opt) => {
                    return arr.push({ value: opt.id, label: opt.operationName })
                })
                setListOperation(arr)
            })
            .catch(error => {
                console.log("ROLE DATA ERROR", error);
            })
    }

    const { id } = useParams();
    const url = `/auth/machine/${id}`

    const initMachine = () => {

        dataService.getexe(url)
            .then(response => {
                console.log("USER DATA BY ID", response.data);
                setUser(response.data.operations)
                setMachineName(response.data.machineName)
                setMachineDesc(response.data.machineDesc)
            })
            .catch(error => {
                console.log("USER ERROR ", error);
            })
    }

    const remove = (item) => {

        console.log(item.id);
        console.log(id);

        dataService.deleteexe(`/auth/machine/${id}/operation/${item.id}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initMachine()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    const submitform = (evevt) => {
        evevt.preventDefault()
        const postData =
        {
            machineName: machineName,
            machineDesc: machineDesc,
            operations: operation
        }
        console.log('PRINTING POSTDATA - ADD USER', postData);
        dataService.putexe(`auth/machine/${id}`, postData)
            .then(response => {
                console.log('USER ADDED SUCCESSFULLY', response.data);
                navigate('/machineview')
            })
            .catch(error => {
                console.log('SOMETHING WRONG', error);
            })
    }

    useEffect(() => {
        initMachine();
        initRole();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        {/* <!--  card--> */}
                        <div className="card mb-4">
                            <div className="card-header">Machine Details</div>
                            <div className="card-body">
                                <form onSubmit={submitform}>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername">Machine Name</label>
                                        <input
                                            className="form-control"
                                            id="inputUsername"
                                            type="text"
                                            placeholder="Enter your username"
                                            value={machineName}
                                            onChange={evevt => setMachineName(evevt.target.value)}>
                                        </input>
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Machine Desc</label>
                                        <input
                                            className="form-control"
                                            id="inputEmailAddress"
                                            type="text"
                                            placeholder="Enter your email address"
                                            value={machineDesc}
                                            onChange={evevt => setMachineDesc(evevt.target.value)}>
                                        </input>
                                    </div>
                                    {/* <!-- Save changes button--> */}
                                    <button className="btn btn-primary" type="submit">Save changes</button>
                                </form>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputRole">Add Operation</label>
                                    <Select
                                        options={listoperation}
                                        isMulti
                                        // value={listrole.filter(obj => role.includes(obj.value))}
                                        value={selectedRoles}
                                        onChange={handleSelect} />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputRole">Operations</label>
                                    <div className="container-fluid table-responsive-sm">
                                        <div className="table p-0 pb-2">
                                            <table className="table table-bordered align-items-center justify-content-center mb-0 ">
                                                <thead>
                                                    <tr>
                                                        <td className="text-uppercase">S.No</td>
                                                        <td className="text-uppercase">Operation Name</td>
                                                        <td className="text-uppercase">Delete</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {user.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-xs">{item.id}</td>
                                                                <td className="text-xs">{item.operationName}</td>
                                                                <td>
                                                                    <a className="btn btn-danger text-white btn-xs" onClick={() => remove(item)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMachine