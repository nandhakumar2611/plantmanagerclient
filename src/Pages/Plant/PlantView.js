import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import { Link, useParams } from "react-router-dom";

const PlantView = () => {

    let [plant, setPlant] = useState([])
    let [deletModel,setDeleteModel]=useState(false)
    let [plantId, setPlantId] = useState('')

    const { id } = useParams();

    const initPlant = () => {

        dataService.getexe("/auth/plant")
            .then(response => {
                console.log("USER DATA", response.data);
                setPlant(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const ItemSet = (item) => {
        // console.log("model")
        setPlantId(item.id)
        setDeleteModel(true)
    }

    const remove = () => {
        
        console.log(plantId);
        setDeleteModel(false)
        dataService.deleteexe(`/auth/plant/${plantId}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initPlant()
            })
            .catch(error => {
                console.log("SOMETHINHG WRONG", error)
            })
    }

    useEffect(() => {
        initPlant();
    }, []);

    return (
        <>
            <div>
                <div className="container-fluid">

                    <div className="card shadow mb-4">
                        <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                            <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                            <a href="/plant" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fa fa-plus fa-sm text-white-50"></i> Add plant</a>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>PlantName</th>
                                            <th>Location</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plant && plant.length > 0 ? (
                                        plant.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-xs">{item.id}</td>
                                                    <td className="text-xs">{item.plantName}</td>
                                                    <td className="text-xs">{item.location}</td>
                                                    <td>
                                                        <Link to={`/EditPlant/${item.id}`} >
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
                                        })):(
                                            <tr>
                                                <td colSpan="5" className="text-center">
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

export default PlantView