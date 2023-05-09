import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import moment from "moment";

const TaskTime = () => {

    let [machine, setMachine] = useState([])

    const formatData= (data) => {

        const formattedData = moment(data).format("YYYY-MM-DD HH:mm:ss")
        return formattedData;
      } 

    const calculateHour = (date1, date2) => {

        var from = new Date(date1);
        var to = new Date(date2);
        if(to < from) {
            to.setDate(to.getDate()+1);
        }
        var diff = to-from;
        var hours = Math.floor(diff /1000/60/60);
        var minutes = Math.floor(diff / 6000) % 60;
        var hours_minutes = hours+":"+minutes;
        return (hours_minutes)
    } 
    

    const initMachine = () => {

        dataService.getexe("/auth/tasktimes")
            .then(response => {
                console.log("USER DATA", response.data);
                setMachine(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    useEffect(() => {
        initMachine();
    }, []);
    return (
        <div>
            <div className="container-fluid">

                <div className="card shadow mb-4">
                    <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                        <h6 className="m-0 font-weight-bold text-primary">Timing</h6>
                        {/* <a href="/machine" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                            <i className="fa fa-plus fa-sm text-white-50"></i> Add Machine</a> */}
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>User</th>
                                        <th>Total Hour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {machine.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-xs">{item.id}</td>
                                                <td className="text-xs">{formatData(item.startTime)}</td>
                                                <td className="text-xs">{formatData(item.endTime)}</td>
                                                <td className="text-xs">{item.user}</td>
                                                <td className="text-xs">{calculateHour(formatData(item.startTime),formatData(item.endTime))}</td>
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
    )
}

export default TaskTime
