import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import { Pie } from "react-chartjs-2";

const Dashboard = () => {

    let [machine, setMachine] = useState(0)
    let [runningMachine, setRunningMachine] = useState(0)
    let [batchorder, setBatchOrder] = useState([])

    const initMachine = () => {

        dataService.getexe("auth/machine")
            .then(response => {
                console.log("USER DATA1", response.data);
                setBatchOrder(response.data)
                setMachine(response.data.length)
                // console.log(standard)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const initRunningMachine = () => {

        dataService.getexe("auth/runningmachine")
            .then(response => {
                console.log("USER DATA1", response.data);
                setRunningMachine(response.data.length)
                // console.log(standard)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    // const initBatchOrder = () => {

    //     dataService.getexe("/auth/batchorder")
    //         .then(response => {
    //             console.log("USER DATA", response.data);
    //             // setMachine(response.data)
    //             setBatchOrder(response.data)
    //         })
    //         .catch(error => {
    //             console.log("SOMETHING WRONG", error);
    //         })
    // }

    useEffect(() => {
        initMachine();
        initRunningMachine();
        // initBatchOrder();
    }, []);

    const state = {

        labels: ["Direct", "Referral", "Social"],
        datasets: [
            {
                data: [55, 30, 15],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }
        ],
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: false,
            },
            title: {
                display: true,
                text: 'Chart ',
            },
        },
    };

    return (
        <div>
            <div className="container-fluid">

                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fa fa-download fa-sm text-white-50"></i> Generate Report</a>
                </div>

                {/* <!-- Content Row --> */}
                <div className="row">

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-start border-0 border-5 shadow border-primary h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Earnings (Monthly)</div>
                                        <div className="h5 mb-0 font-weight-bold text-secondary">$40,000</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-calendar fa-2x text-secondary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-start border-0 border-5 shadow border-success h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Earnings (Annual)</div>
                                        <div className="h5 mb-0 font-weight-bold text-secondary">$215,000</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-dollar fa-2x text-secondary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-start border-0 border-5 shadow border-info h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div className="h5 mb-0 mr-3 font-weight-bold text-secondary">50%</div>
                                            </div>
                                            <div className="col">
                                                <div className="progress progress-sm mr-2">
                                                    <div className="progress-bar bg-info" role="progressbar"
                                                        style={{ width: " 50%" }} aria-valuenow="50" aria-valuemin="0"
                                                        aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-list fa-2x text-secondary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Pending Requests Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-start border-0 border-5 shadow border-warning h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Pending Requests</div>
                                        <div className="h5 mb-0 font-weight-bold text-secondary">18</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-comments fa-2x text-secondary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Content Row --> */}
            </div>
            <div className="container-fluid">
                <div className="row">

                    {/* <!-- Area Chart --> */}
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Machine Overview</h6>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                            <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Machine Name</th>
                                            {/* <th>Status</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                {/* {batchorder && batchorder.length > 0 ? ( */}
                                {batchorder.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-xs">{index+1}</td>
                                            <td className="text-xs">{item.machineName}</td>
                                            {/* <td className="text-xs"></td> */}
                                            </tr>);})}
                                            </tbody>
                                </table>   
                            </div>     
                            </div>
                        </div>
                    </div>

                    {/* <!-- Pie Chart --> */}
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Machine Sources</h6>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <div className="col mb-4">
                                    <div className="card border-start border-0 border-5 shadow border-primary h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Machine</div>
                                                    <div className="h5 mb-0 font-weight-bold text-secondary">{machine}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fa fa-industry fa-2x text-secondary"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col mb-4">
                                    <div className="card border-start border-0 border-5 shadow border-success h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Running Machine</div>
                                                    <div className="h5 mb-0 font-weight-bold text-secondary">{runningMachine}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fa fa-industry fa-2x text-secondary"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card border-start border-0 border-5 shadow border-danger h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                        Idle Machine</div>
                                                    <div className="h5 mb-0 font-weight-bold text-secondary">{machine - runningMachine}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fa fa-times fa-2x text-secondary"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Content Row --> */}
        </div>
    )
}

export default Dashboard