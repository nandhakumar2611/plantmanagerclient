import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import dataService from "../../Service/dataService";

const EditOperation = () => {

    let [operationName, setoperationName] = useState('') 
    let [operationDesc, setoperationDesc] = useState('')

    const navigate = useNavigate();

    const {id} = useParams();
    const url = `/auth/operation/${id}`

    const initMachine = () => {

        dataService.getexe(url)
            .then(response => {
                console.log("USER DATA BY ID",response.data);
                setoperationName(response.data.operationName)
                setoperationDesc(response.data.operationDesc)
            })
            .catch(error => {
                console.log("USER ERROR ", error);
            })
      }

      const submitform =(evevt) => {
        evevt.preventDefault()
        const postData =
        {
          operationName:operationName,
          operationDesc:operationDesc
        }
        console.log('PRINTING POSTDATA - ADD USER',postData);
        dataService.putexe(`auth/operation/${id}`,postData)
          .then(response => {
            console.log('USER ADDED SUCCESSFULLY',response.data);
            navigate('/Operationview')
          })
          .catch(error => {
            console.log('SOMETHING WRONG', error);
          })
      }

      useEffect(() => {
        initMachine();
      }, []);

  return (
    <div>
    <div className="container">
        <div className="row">
            <div className="col-xl-8">
                {/* <!--  card--> */}
                <div className="card mb-4">
                    <div className="card-header">Operation Details</div>
                    <div className="card-body">
                        <form onSubmit={submitform}>
                            {/* <!-- Form Group (username)--> */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername">Operation Name</label>
                                <input
                                    className="form-control"
                                    id="inputUsername"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={operationName}
                                    onChange={evevt => setoperationName(evevt.target.value)}>
                                </input>
                            </div>
                            {/* <!-- Form Group (email address)--> */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Operation Description</label>
                                <input
                                    className="form-control"
                                    id="inputEmailAddress"
                                    type="text"
                                    placeholder="Enter your email address"
                                    value={operationDesc}
                                    onChange={evevt => setoperationDesc(evevt.target.value)}>
                                </input>
                            </div>
                            {/* <!-- Save changes button--> */}
                            <button className="btn btn-primary" type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditOperation