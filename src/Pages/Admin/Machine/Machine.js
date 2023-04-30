import React, { useEffect, useState } from 'react'
import dataService from "../../../Service/dataService";
import { Link, useParams } from "react-router-dom";
import $ from "jquery"
const Machine = () => {

  let [machine, setMachine] = useState([])

  const {id} = useParams();

  // JQuery for DataTable
  const initTable = () => {
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }

  // Endpoint to get all Machine 
  const initMachine = () => {

    const url = `machine/machine`;
    dataService.getexe(url)
      .then(response => {
        console.log("MACHINE DATA", response.data);
        setMachine(response.data)
      })
      .catch(error => {
        console.log("MACHINE DATA ERROR", error);
      })
  }

  useEffect(() => {
    initTable();
    initMachine();
    setTimeout(() => {
      $('#example').DataTable().destroy();
    });
  }, []);

  return (
    <div>
      <div className="container-fluid table-responsive-sm">
        <div className="table p-0 pb-2">
          <table id="example" className="table align-items-center justify-content-center mb-0 ">
            <thead>
              <tr>
                <td className="text-uppercase">S.No</td>
                <td className="text-uppercase">Machine Name</td>
                <td className="text-uppercase">Machine Description</td>
                <td className="text-uppercase">Edit</td>
                <td className="text-uppercase">Delete</td>
              </tr>
            </thead>
            <tbody>
              {machine.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-xs">{index+1}</td>
                    <td className="text-xs">{item.machineName}</td>
                    <td className="text-xs">{item.machineDesc}</td>
                    <td>
                      <Link to={`api/${item.id}`}>
                        <button className="btn btn-primary text-white btn-xs">
                          <i className="fa fa-pencil"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button className="btn btn-danger text-white btn-xs">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="model fade" id="edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="model-content">
            <div className="model-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure want to delete this item?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Machine