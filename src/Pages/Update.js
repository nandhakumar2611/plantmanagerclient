import React, { useState } from 'react';
import Select from 'react-select';

const Update = () => {

    const [showModal, setShowModal] = useState(false);

    // Function to handle the button click and show the modal
    const handleClick = () => {
      // Perform your desired function here
  
      // Set showModal state to true to show the modal
      setShowModal(true);
    };
  
    // Function to handle closing the modal
    const handleClose = () => {
      setShowModal(false);
    };

  return (

        <div className="container">
      <h1>Welcome to My React Application</h1>
      <button className="btn btn-primary" onClick={handleClick}>
        Open Modal
      </button>

      {showModal && (
        <div className="modal fade" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal Title</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Modal Content</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClose}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Update