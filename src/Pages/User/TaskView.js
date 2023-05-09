import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import moment from "moment";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import dataService from "../../Service/dataService";

const TaskView = () => {
    let [machine, setMachine] = useState([])
    let [batchorder, setBatchOrder] = useState([])
    let [deletModel, setDeleteModel] = useState(false)
    let [editModel, setEditModel] = useState(false)
    let [machineId, setMachineId] = useState('')
    let [batchOrderId, setBatchOrderId] = useState('')
    let [addModel, setAddModel] = useState(false)
    let [description, setDescription] = useState('')
    let [specification, setSpecification] = useState('')
    let [standard, setStandard] = useState('')
    let [process, setProcess] = useState('')
    let [startDate, setStartDate] = useState('')
    let [startTime, setStartTime] = useState('')
    let [endDate, setEndDate] = useState('')
    let [endTime, setEndTime] = useState('')
    let [quantity, setQuantity] = useState('')
    let [person, setPerson] = useState('')
    let [status, setStatus] = useState('')
    let [priority, setPriority] = useState('')
    // let [batchorder, setBatchOrder] = useState([])
    let [listOperation, setListOperation] = useState([])
    let [taskList, setTaskList] = useState([])
    let [taskListId, setTaskListId] = useState('')
    let [finishedQty, setFinishedQty] = useState('')
    let [remark, setRemark] = useState('')

    const { id } = useParams();

    const username = dataService.getUser().username

    const initBatchOrder = () => {

        dataService.getexe(`auth/tasklist/${username}`)
            .then(response => {
                console.log("USER DATA", response.data);
                // setMachine(response.data)
                setBatchOrder(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

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

    const formatData = (data) => {

        const formattedData = moment(data).format("YYYY-MM-DD")
        return formattedData;
    }

    const ItemSet = (item) => {
        // console.log("model")
        // setMachineId(item.id)
        setTaskListId(item.id)
        initTaskListById()
    }

    const remove = () => {

        console.log(batchOrderId);
        setDeleteModel(false)
        dataService.deleteexe(`/auth/batchorder/${taskListId}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initBatchOrder()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    const initTaskListById = () => {

        dataService.getexe(`/auth/tasklist/id/${taskListId}`)
            .then(response => {
                console.log("TaskList DATA", response.data);
                // setMachine(response.data)
                // setBatchOrder(response.data)
                setTaskList(response.data)
                setDescription(response.data.description)
                setSpecification(response.data.specification)
                setFinishedQty(response.data.finishedQty)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const editmodel = () => {

        const options = [
            { value: 'Started', label: 'Started' },
            { value: 'On Going', label: 'On Going' },
            { value: 'Finished', label: 'Finished' }
        ]

        const handleSelect = (event) => {
            console.log('Status', event);
            setStatus(event.value);
        }

        const submitform = (event) => {
            event.preventDefault();
            handlePostSubmit(event);
            handlePutSubmit(event);
        }

        const handlePostSubmit = (evevt) => {
            evevt.preventDefault()
            const postData =
            {
                startTime: moment(startTime).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
                endTime: moment(endTime).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
                user: username
            }
            console.log('PRINTING POSTDATA - ADD USER', postData);
            setEditModel(false)
            dataService.postexe(`auth/tasklist/${taskListId}/tasktime`, postData)
                .then(response => {
                    console.log('USER ADDED SUCCESSFULLY', response.data);
                })
                .catch(error => {
                    console.log('SOMETHING WRONG', error);
                })
        }

        const handlePutSubmit = (evevt) => {
            evevt.preventDefault()
            const postData =
            {
                finishedQty: finishedQty,
                status: status,
                remark: remark
            }
            console.log('PRINTING POSTDATA - ADD USER', postData);
            setEditModel(false)
            // dataService.putexe(`auth/tasklist/user/${taskListId}`, postData)
            //     .then(response => {
            //         console.log('USER ADDED SUCCESSFULLY', response.data);
            //     })
            //     .catch(error => {
            //         console.log('SOMETHING WRONG', error);
            //     })
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
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputContactNo">Process Description</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Process Description"
                                        value={taskList.description}
                                        onChange={evevt => setDescription(evevt.target.value)}
                                        readOnly disabled>
                                    </input>
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputPassword">Assgined Qty</label>
                                    <input
                                        className="form-control"
                                        id="inputLocation"
                                        type="text"
                                        placeholder="Specification"
                                        value={taskList.specification}
                                        onChange={evevt => setSpecification(evevt.target.value)}
                                        readOnly disabled>
                                    </input>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputContactNo">Finished Qty</label>
                                    <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="finished Qty"
                                        onChange={evevt => setFinishedQty(evevt.target.value)} >
                                    </input>
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputPassword">Sataus</label>
                                    <Select
                                        className="basic-single"
                                        options={options}
                                        onChange={handleSelect}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputContactNo">Start Time</label>
                                    {/* <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="time"
                                        placeholder="finished Qty"
                                        onChange={evevt => setStartTime(evevt.target.value)} >
                                    </input> */}
                                    <DatePicker
                                        value={startTime}
                                        selected={startTime}
                                        onSelect={(date) => setStartTime(date)}
                                        onChange={(date) => setStartTime(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        injectTimes={[
                                            setHours(setMinutes(new Date(), 1), 0),
                                            setHours(setMinutes(new Date(), 5), 12),
                                            setHours(setMinutes(new Date(), 59), 23),
                                        ]}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {/* Form Group (Person)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputContactNo">Finished Time</label>
                                    {/* <input
                                        className="form-control"
                                        id="inputContactNo"
                                        type="time"
                                        placeholder="finished Qty"
                                        onChange={evevt => setEndTime(evevt.target.value)} >
                                    </input> */}
                                    <DatePicker
                                        
                                        value={endTime}
                                        selected={endTime}
                                        onSelect={(date) => setEndTime(date)}
                                        onChange={(date) => setEndTime(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        injectTimes={[
                                            setHours(setMinutes(new Date(), 1), 0),
                                            setHours(setMinutes(new Date(), 5), 12),
                                            setHours(setMinutes(new Date(), 59), 23),
                                        ]}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                {/*  Form Group (Company Name)--> */}
                                <div className="col-md-12">
                                    <label className="small mb-1" htmlFor="inputContactNo">Remarks</label>
                                    <textarea
                                        className="form-control"
                                        id="inputContactNo"
                                        type="text"
                                        placeholder="Quantity"
                                        onChange={evevt => setRemark(evevt.target.value)} >
                                    </textarea>
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

    useEffect(() => {
        initBatchOrder();
    }, []);

    return (
        <>
            <div>
                <div className="container-fluid">

                    <div className="card shadow mb-4">
                        <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                            <h6 className="m-0 font-weight-bold text-primary">Task Example</h6>
                            {/* <a href="/batchorder" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fa fa-plus fa-sm text-white-50"></i> Add BatchOrder</a> */}
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Process Description</th>
                                            <th>Standard </th>
                                            <th>Start Date </th>
                                            <th>Issue Date </th>
                                            <th>Production Qty</th>
                                            <th>Finished Qty</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batchorder.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-xs">{item.id}</td>
                                                    <td className="text-xs">{item.description}</td>
                                                    <td className="text-xs">{item.standard}</td>
                                                    <td className="text-xs">{formatData(item.startDate)}</td>
                                                    <td className="text-xs">{formatData(item.issueDate)}</td>
                                                    <td className="text-xs">{item.quantity}</td>
                                                    <td className="text-xs">{item.finishedQty}</td>
                                                    <td>
                                                        <button className="btn btn-primary text-white btn-xs" onClick={() => ItemSet(item) > setEditModel(true)}>
                                                            <i className="fa fa-pencil"></i>
                                                        </button>
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
            {editModel && editmodel()}
        </>
    )
}

export default TaskView