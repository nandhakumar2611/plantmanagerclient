import React, { useState } from 'react'
import Select from 'react-select';
// import dataService from "../Service/dataService";
import { ToastContainer, toast } from 'react-toastify';


const UseUpdate = () => {

    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    return (
        <div className="container">
            <button onClick={showToastMessage}>Notify</button>
            <ToastContainer />
        </div>
    )
}

export default UseUpdate