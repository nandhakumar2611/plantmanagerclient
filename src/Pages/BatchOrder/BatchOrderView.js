import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import $ from "jquery"
import "../Admin/style.css"

const BatchOrderView = () => {

    let [machine, setMachine] = useState([])
    let [batchorder, setBatchOrder] = useState([])
    let [deletModel,setDeleteModel]=useState(false)
    let [machineId, setMachineId] = useState('')
    let [batchOrderId, setBatchOrderId] = useState('')

    const { id } = useParams();

    const initBatchOrder = () => {

        dataService.getexe("/auth/batchorder")
            .then(response => {
                console.log("USER DATA", response.data);
                // setMachine(response.data)
                setBatchOrder(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const formatData= (data) => {

        const formattedData = moment(data).format("YYYY-MM-DD")
        return formattedData;
      } 

    const ItemSet = (item) => {
        // console.log("model")
        // setMachineId(item.id)
        setBatchOrderId(item.id)
        setDeleteModel(true)
    }

    const remove = () => {
        
        console.log(batchOrderId);
        setDeleteModel(false)
        dataService.deleteexe(`/auth/batchorder/${batchOrderId}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initBatchOrder()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    const initTable = () =>
    {
      $(document).ready( function () {
        setTimeout(function() {
            $('#example').DataTable();
            initBatchOrder();
        }, 2000);
      } );
    }

    useEffect(() => {
        initBatchOrder();
        initTable();
    }, []);

  return (
    <>
    <div>
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                    <h6 className="m-0 font-weight-bold text-primary">Sales Order Table</h6>
                    <a href="/batchorder" className="btn btn-sm btn-primary shadow-sm">
                        <i className="fa fa-plus fa-sm text-white-50"></i> Add Sales Order</a>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="example" className="display nowrap cell-border pt-2" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Company Name</th>
                                    <th>Item </th>
                                    <th>Production Qty </th>
                                    <th>Start Date </th>
                                    <th>Issue Date </th>
                                    <th>View </th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {batchorder && batchorder.length > 0 ? ( */}
                                {batchorder.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-xs">{item.id}</td>
                                            <td className="text-xs">{item.comapanyName}</td>
                                            <td className="text-xs">{item.item}</td>
                                            <td className="text-xs">{item.productionQty}</td>
                                            <td className="text-xs">{formatData(item.startDate)}</td>
                                            <td className="text-xs">{formatData(item.issueDate)}</td>
                                            <td>
                                                <Link to={`/BatchOrderAssgin/${item.id}/tasklist`} >
                                                    <button className="btn btn-primary text-white btn-xs">
                                                        <i className="fa fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/EditBatchOrder/${item.id}`} >
                                                    <button className="btn btn-primary text-white btn-xs">
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger text-white btn-xs" onClick={() => ItemSet(item)} >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                                // ):(
                                //     <tr>
                                //     <td colSpan="9" className="text-center">
                                //         {/* {plant ? 'No plants found': null} */}
                                //         No Data
                                //     </td>
                                // </tr>
                                // )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {deletModel && (
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
            </div>)}
    </div>
</>
  )
}

export default BatchOrderView