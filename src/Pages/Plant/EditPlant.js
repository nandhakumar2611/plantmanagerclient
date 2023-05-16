import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dataService from "../../Service/dataService";
import Select from 'react-select';

const EditPlant = () => {
    let [user, setUser] = useState([])
    let [plantName, setPlantName] = useState('')
    let [location, setLocation] = useState('')
    let [machine, setMachine] = useState([])
    let [selectedRoles, setSelectedRoles] = useState([])
    let [listMachine, setListmachine] = useState([])

    const navigate = useNavigate();

    const handleSelect = (selectedOptions) => {
        console.log('Operation', selectedOptions);
        const operations = selectedOptions.map((option) => ({ id: option.value }));
        setMachine(operations);
        setSelectedRoles(selectedOptions)
    }

    const initRole = () => {

        const arr = [];
        const url = `/auth/machine`;    // uRL to get all operation
        dataService.getexe(url)
            .then(response => {
                console.log("Operation DATA", response.data);
                let result = response.data;
                result.map((opt) => {
                    return arr.push({ value: opt.id, label: opt.machineName })
                })
                setListmachine(arr)
            })
            .catch(error => {
                console.log("ROLE DATA ERROR", error);
            })
    }

    const { id } = useParams();
    const url = `/auth/plant/${id}`

    const initMachine = () => {

        dataService.getexe(url)
            .then(response => {
                console.log("USER DATA BY ID", response.data);
                // setUser(response.data.roles)
                // setUserName(response.data.username)
                // setEmail(response.data.email)
                // setContact(response.data.contactNo)
                setUser(response.data.machines)
                setPlantName(response.data.plantName)
                setLocation(response.data.location)
                // setUserName(response.data.roles)
            })
            .catch(error => {
                console.log("USER ERROR ", error);
            })
    }

    const remove = (item) => {

        console.log(item.id);
        console.log(id);

        dataService.deleteexe(`/auth/plant/${id}/machine/${item.id}`)
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
            plantName: plantName,
            location: location,
            machines: machine
        }
        console.log('PRINTING POSTDATA - ADD USER', postData);
        dataService.putexe(`auth/plant/${id}`, postData)
            .then(response => {
                console.log('USER ADDED SUCCESSFULLY', response.data);
                navigate('/plantview')
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
                        {/* <!--Plant card--> */}
                        <div className="card mb-4">
                            <div className="card-header">Plant Details</div>
                            <div className="card-body">
                                <form onSubmit={submitform}>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputPlantName">Plant Name</label>
                                        <input
                                            className="form-control"
                                            id="inputPlantName"
                                            type="text"
                                            placeholder="Enter Plant Name"
                                            value={plantName}
                                            onChange={evevt => setPlantName(evevt.target.value)}>
                                        </input>
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                        <input
                                            className="form-control"
                                            id="inputLocation"
                                            type="text"
                                            placeholder="Enter Location"
                                            value={location}
                                            onChange={evevt => setLocation(evevt.target.value)}>
                                        </input>
                                    </div>

                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputRole">Add Machine</label>
                                        <Select
                                            options={listMachine}
                                            isMulti
                                            // value={listrole.filter(obj => role.includes(obj.value))}
                                            value={selectedRoles}
                                            onChange={handleSelect} />
                                    </div>
                                    {/* <!-- Save changes button--> */}
                                    <button className="btn btn-primary" type="submit">Save changes</button>
                                </form>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputRole">Machines</label>
                                    <div className="container-fluid table-responsive-sm">
                                        <div className="table p-0 pb-2">
                                            <table className="table table-bordered align-items-center justify-content-center mb-0 ">
                                                <thead>
                                                    <tr>
                                                        <td className="text-uppercase">S.No</td>
                                                        <td className="text-uppercase">Machine Name</td>
                                                        <td className="text-uppercase">Delete</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {user.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-xs">{index+1}</td>
                                                                <td className="text-xs">{item.machineName}</td>
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

export default EditPlant