import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Select from 'react-select';
import dataService from "../../Service/dataService";

const BatchOrderAssgin = () => {

    let [addModel, setAddModel] = useState(false)
    let [editModel, setEditModel] = useState(false)
    let [deleteModel, setDeleteModel] = useState(false)
    let [description, setDescription] = useState('')
    let [specification, setSpecification] = useState('')
    let [standard, setStandard] = useState('')
    let [process, setProcess] = useState('')
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [quantity, setQuantity] = useState('')
    let [person, setPerson] = useState('')
    let [status, setStatus] = useState('')
    let [priority, setPriority] = useState('')
    let [batchorder, setBatchOrder] = useState([])
    let [listOperation, setListOperation] = useState([])
    let [listUser, setListUser] = useState([])
    let [taskList, setTaskList] = useState([])
    let [taskListId, setTaskListId] = useState('')
    let [batchorderId, setBatchOrderId] = useState('')

    const { id } = useParams();
    const url = `/auth/batchorder/${id}`

    const initBatchOrder = () => {

        dataService.getexe(url)
            .then(response => {
                console.log("USER DATA1", response.data);
                setBatchOrder(response.data)
                setBatchOrderId(response.data.item)
                // initOperation();
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }


    // const url = `/auth/machine/${id}`

    const initTaskList = () => {

        dataService.getexe(`/auth/batchorder/${id}/tasklists`)
            .then(response => {
                console.log("USER DATA", response.data);
                setTaskList(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    useEffect(() => {
        initBatchOrder();
        initTaskList();
        // initOperation();
    }, []);

    const ItemSet = (item) => {
        setTaskListId(item.id)
        setDescription(item.description)
        setSpecification(item.specification)
        setStandard(item.standard)
        setProcess(item.process)
        setStartDate(item.startDate)
        setEndDate(item.endDate)
        setQuantity(item.quantity)
        setPerson(item.person)
        console.log(item)
    }

    const SetItem = () => {
        initOperation();
        initUser();
    }

    const formatData = (data) => {

        const formattedData = moment(data).format("YYYY-MM-DD")
        return formattedData;
    }

    const deletemodel = () => {

        const remove = () => {

            console.log(taskListId);
            setDeleteModel(false)
            dataService.deleteexe(`/auth/tasklist/${taskListId}`)
                .then(response => {
                    console.log("DELETE ID", response.id);
                    // initBatchOrder()
                    initTaskList()
                })
                .catch(error => {
                    console.log("SOMETHINHG WRONG", error)
                })
        }

        return (
            <div className="modal fade show " style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" onClick={() => setDeleteModel(false)}>

                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setDeleteModel(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => remove()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const initOperation = () => {

        const arr = [];
        const url = `/auth/products/${batchorderId}/operation`;    // uRL to get all operation
        dataService.getexe(url)
            .then(response => {
                console.log("Operation DATAA", response.data);
                let result = response.data;
                result.map((opt) => {
                    return arr.push({ value: opt.operationName, label: opt.operationName })
                })
                setListOperation(arr)
            })
            .catch(error => {
                console.log("ROLE DATA ERROR", error);
            })
    }
    const initUser = () => {

        const arr = [];
        const url = `/auth/roles/3/users`;    // uRL to get all operation
        dataService.getexe(url)
            .then(response => {
                console.log("User DATAA", response.data);
                let result = response.data;
                result.map((opt) => {
                    return arr.push({ value: opt.username, label: opt.username })
                })
                setListUser(arr)
            })
            .catch(error => {
                console.log("ROLE DATA ERROR", error);
            })
    }

    const addmodel = () => {

        const submitform = (evevt) => {
            evevt.preventDefault()
            const postData =
            {
                description: description,
                specification: specification,
                standard: standard,
                process: process,
                startDate: startDate,
                endDate: endDate,
                quantity: quantity,
                person: person,
                status: "Not Started",
                priority: "1"
            }
            console.log('PRINTING POSTDATA - ADD USER', postData);
            setAddModel(false)
            dataService.postexe(`auth/batchorder/${id}/tasklist`, postData)
                .then(response => {
                    console.log('USER ADDED SUCCESSFULLY', response.data);
                    initTaskList();
                })
                .catch(error => {
                    console.log('SOMETHING WRONG', error);
                })
        }
        const options =[
            {value: 'admin', label: 'ADMIN'},
            {value: 'manager', label: 'MANAGER'},
            {value: 'user', label: 'USER'}
          ]

          const handleSelect = (event) => {
            console.log('ROLE',event);
            setDescription(event.value);
          }

          const handleSelect1 = (event) => {
            console.log('ROLE',event);
            setPerson(event.value);
          }
          
        return (<div className="modal show fade" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" onClick={() => SetItem()>setAddModel(false)}>

                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitform}>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Process Description</label>
                                    {/* <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Process Description"
                                        onChange={evevt => setDescription(evevt.target.value)} >
                                    </input> */}
                                    <Select
                                        options={listOperation}
                                        onChange={handleSelect}
                                        // isMulti
                                    />
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Specification</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Specification"
                                        onChange={evevt => setSpecification(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Standard</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Standard"
                                        onChange={evevt => setStandard(evevt.target.value)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Process</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Process"
                                        onChange={evevt => setProcess(evevt.target.value)} >
                                    </input>
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Start Date</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="Date"
                                        placeholder="Start Date"
                                        onChange={evevt => setStartDate(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">End Date</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="Date"
                                        placeholder="End Date"
                                        onChange={evevt => setEndDate(evevt.target.value)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Quantity</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Quantity"
                                        onChange={evevt => setQuantity(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Person</label>
                                    {/* <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Person"
                                        onChange={evevt => setPerson(evevt.target.value)} >
                                    </input> */}
                                    <Select
                                        options={listUser}
                                        onChange={handleSelect1}
                                        // isMulti
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setAddModel(false)}>Close</button>
                                <button className="btn btn-primary" type="submit">Save changes</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }

    const editmodel = () => {


        // const initTaskListById = () => {

        //     dataService.getexe(`/auth/tasklist/${taskListId}`)
        //         .then(response => {
        //             console.log("TaskList DATA", response.data);
        //             // setMachine(response.data)
        //             // setBatchOrder(response.data)
        //         })
        //         .catch(error => {
        //             console.log("SOMETHING WRONG", error);
        //         })
        // }



        const submitform = (evevt) => {
            evevt.preventDefault()
            const postData =
            {
                description: description,
                specification: specification,
                standard: standard,
                process: process,
                startDate: startDate,
                endDate: endDate,
                quantity: quantity,
                person: person,
                status: "Not Started",
                priority: "1"
            }
            console.log('PRINTING POSTDATA - ADD USER', postData);
            setAddModel(false)
            dataService.putexe(`auth/tasklist/${taskListId}`, postData)
                .then(response => {
                    console.log('USER ADDED SUCCESSFULLY', response.data);
                    initTaskList();
                })
                .catch(error => {
                    console.log('SOMETHING WRONG', error);
                })
        }
        return (<div className="modal show fade" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" onClick={() => setEditModel(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitform}>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Process Description</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Process Description"
                                        value={description}
                                        onChange={evevt => setDescription(evevt.target.value)} >
                                    </input>
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Specification</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Specification"
                                        value={specification}
                                        onChange={evevt => setSpecification(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Standard</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Standard"
                                        value={standard}
                                        onChange={evevt => setStandard(evevt.target.value)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Process</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Process"
                                        value={process}
                                        onChange={evevt => setProcess(evevt.target.value)} >
                                    </input>
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">Start Date</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="Date"
                                        placeholder="Start Date"
                                        value={formatData(startDate)}
                                        onChange={evevt => setStartDate(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Person)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputPassword">End Date</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="Date"
                                        placeholder="End Date"
                                        value={formatData(endDate)}
                                        onChange={evevt => setEndDate(evevt.target.value)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Quantity</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Quantity"
                                        value={quantity}
                                        onChange={evevt => setQuantity(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputContactNo">Person</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Person"
                                        value={person}
                                        onChange={evevt => setPerson(evevt.target.value)} >
                                    </input>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setEditModel(false)}>Close</button>
                                <button className="btn btn-primary" type="submit">Save changes</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <div>
            <div className="container-fluid">

                <div className="card shadow mb-4">
                    <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                        <h6 className="m-0 font-weight-bold text-primary">Assgin Batch Order</h6>
                        <div>
                            <a onClick={() => setAddModel(true)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fa fa-plus fa-sm text-white-50"></i> Assgin</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <tbody>
                                    <tr >
                                        <td className="text-xs">Company Name</td>
                                        <td className="text-xs">{batchorder.comapanyName}</td>
                                        <td className="text-xs">Person</td>
                                        <td className="text-xs">{batchorder.companyPerson}</td>
                                        <td className="text-xs">Item</td>
                                        <td className="text-xs">{batchorder.item}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs">Raw Material</td>
                                        <td className="text-xs">{batchorder.rawMaterial}</td>
                                        <td className="text-xs">Finsize</td>
                                        <td className="text-xs">{batchorder.finSize}</td>
                                        <td className="text-xs">Assembly</td>
                                        <td className="text-xs">{batchorder.assembly}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs">Purchase No</td>
                                        <td className="text-xs">{batchorder.purchaseNo}</td>
                                        <td className="text-xs">Purchase Date</td>
                                        <td className="text-xs">{formatData(batchorder.purchaseDate)}</td>
                                        <td className="text-xs">Purchase Qty</td>
                                        <td className="text-xs">{batchorder.purchaseQty}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs">Start Date</td>
                                        <td className="text-xs">{formatData(batchorder.startDate)}</td>
                                        <td className="text-xs">Delivery Date</td>
                                        <td className="text-xs">{formatData(batchorder.issueDate)}</td>
                                        <td className="text-xs">Production Qty</td>
                                        <td className="text-xs">{batchorder.productionQty}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Process Description</th>
                                        <th>Specification</th>
                                        <th>Standard</th>
                                        <th>Process</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Qty</th>
                                        <th>Person</th>
                                        <th>Finished Qty</th>
                                        <th>Remarks</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskList && taskList.length > 0 ? (
                                    taskList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-xs">{index + 1}</td>
                                                <td className="text-xs">{item.description}</td>
                                                <td className="text-xs">{item.specification}</td>
                                                <td className="text-xs">{item.standard}</td>
                                                <td className="text-xs">{item.process}</td>
                                                <td className="text-xs">{formatData(item.startDate)}</td>
                                                <td className="text-xs">{formatData(item.endDate)}</td>
                                                <td className="text-xs">{item.quantity}</td>
                                                <td className="text-xs">{item.person}</td>
                                                <td className="text-xs">{item.finishedQty}</td>
                                                <td className="text-xs">{item.remark}</td>
                                                <td>
                                                    <button className="btn btn-primary text-white btn-xs" onClick={() => ItemSet(item) > setEditModel(true)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger text-white btn-xs" onClick={() => ItemSet(item) > setDeleteModel(true)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })):(
                                        <tr>
                                        <td colSpan="13" className="text-center">
                                            {/* {plant ? 'No plants found': null} */}
                                            No Data
                                        </td>
                                    </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {addModel && addmodel()}
            {editModel && editmodel()}
            {deleteModel && deletemodel()}
        </div>

    )
}

export default BatchOrderAssgin
