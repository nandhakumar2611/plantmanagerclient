import React, {useEffect, useState } from 'react'
import Select from 'react-select';
import { useNavigate  } from 'react-router-dom';
import dataService from "../../Service/dataService";

const Product = () => {

    let [productName,setProductName] = useState('')
    let [productdesc,setProductDesc] = useState('')
    let [operation,setOperation] = useState([])
    let [listoperation, setListOperation] = useState([])

    const navigate = useNavigate();
  
    const submitform =(evevt) => {
      evevt.preventDefault()
      const postData =
      {

        productName:productName,
        productdesc:productdesc,
        operation:operation
      }
      console.log('PRINTING POSTDATA - ADD USER',postData);
      dataService.postexe("auth/product",postData)
        .then(response => {
          console.log('USER ADDED SUCCESSFULLY',response.data);
          navigate('/productview')
        })
        .catch(error => {
          console.log('SOMETHING WRONG', error);
        })
    }
  
    const handleSelect = (e) => {
      console.log('OPEARTION',e);
      setOperation(Array.isArray(e) ? e.map(x => x.value):[]);
    }

    const initOperation = () => {

        const arr = [];
        const url = `/auth/operation`;    // uRL to get all operation
        dataService.getexe(url)
        .then(response => {
            console.log("Operation DATA",response.data);
            let result = response.data;
            result.map((opt)=>{
                return arr.push({value: opt.id, label: opt.operationName})
            })
            setListOperation(arr)
        })
        .catch(error => {
            console.log("ROLE DATA ERROR",error);
        })
    }

    useEffect(() => {
        initOperation();
      }, []);

  return (
    <div className="container">
            <div className="row">
                <div className="col-xl-8">
                    {/*  Product card */}
                    <div className="card mb-4">
                        <div className="card-header">Product Details</div>
                        <div className="card-body">
                            <form onSubmit={submitform}>
                                {/*  Form Group (product name) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputProductName">Product Name</label>
                                    <input
                                        className="form-control"
                                        id="inputProductName"
                                        type="text"
                                        placeholder="Enter Product Name"
                                        onChange={evevt => setProductName(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Group (product description)--> */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputProductDesc">Product Description</label>
                                    <input
                                        className="form-control"
                                        id="inputProductDesc"
                                        type="text"
                                        placeholder="Enter Product Description"
                                        onChange={evevt => setProductDesc(evevt.target.value)} >
                                    </input>
                                </div>
                                {/*  Form Row--> */}
                                <div className="row gx-3 mb-3">
                                    {/*  Form Group (Operation)--> */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputRole">Operation</label>
                                        <Select
                                            options={listoperation}
                                            isMulti
                                            onChange={handleSelect}
                                            value={listoperation.filter(obj => operation.includes(obj.value))}
                                            // value={options.filter(obj => role.includes(obj.value))} 
                                            />
                                        {/* </Select> */}
                                    </div>
                                </div>
                                {/*  Save changes button--> */}
                                <button className="btn btn-primary" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Product