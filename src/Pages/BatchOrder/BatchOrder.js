import React, { useEffect , useState } from 'react'
import Select from 'react-select';
import dataService from "../../Service/dataService";
import { useNavigate  } from 'react-router-dom';

const BatchOrder = () => {

    let [comapanyName, setCompanyName] = useState('')
    let [companyPerson, setCompanyPerson] = useState('')
    let [item,setItem] = useState('')
    let [rawMaterial,setRawMaterial] = useState('')
    let [finsize,setFinsize] = useState('')
    let [assembly,setAssembly] = useState('')
    let [purchaseNo,setPurchaseNo] = useState('')
    let [purchaseDate,setPurchaseDate] = useState('')
    let [purchaseQty,setPurchaseQty] = useState('')
    let [productionQty,setproductionQty] = useState('')
    let [startDate,setStartDate] = useState('')
    let [issueDate,setIssueDate] = useState('')
    let [accurateQty,setAccurateQty] = useState('')
    let [rejectedQty,setRejectedQty] = useState('')
    let [priority,setPriority] = useState('')
    let [listProduct, setListProduct] = useState([])

    const navigate = useNavigate();
    
  
    const submitform =(evevt) => {
      evevt.preventDefault()
      const postData =
      {
        comapanyName:comapanyName,
        companyPerson:companyPerson,
        item:item,
        rawMaterial:rawMaterial,
        finSize:finsize,
        assembly:assembly,
        purchaseQty:purchaseQty,
        purchaseNo:purchaseNo,
        purchaseDate:purchaseDate,
        startDate:startDate,
        priority:priority,
        productionQty:productionQty,
        issueDate:issueDate,
        accurateQty:accurateQty,    
        rejectedQty:rejectedQty
      }
      console.log('PRINTING POSTDATA - ADD USER',postData);
      dataService.postexe("auth/batchorder",postData)
        .then(response => {
          console.log('USER ADDED SUCCESSFULLY',response.data);
          navigate('/batchorderview')
        })
        .catch(error => {
          console.log('SOMETHING WRONG', error);
        })
    }
  
    const initOperation = () => {

      const arr = [];
      const url = `/auth/product`;    // uRL to get all operation
      dataService.getexe(url)
      .then(response => {
          console.log("Operation DATA",response.data);
          let result = response.data;
          result.map((opt)=>{
              return arr.push({value: opt.productName, label: opt.productName})
          })
          setListProduct(arr)
      })
      .catch(error => {
          console.log("ROLE DATA ERROR",error);
      })
  }

  useEffect(() => {
    initOperation();
  }, []);
  
    const handleSelect = (event) => {
      console.log('ROLE',event);
      setItem(event.value);
    }

  return (
    <div className="container">
    <div className="row">
      <div className="col-xl-8">
        {/*  Account details card */}
        <div className="card mb-4">
          <div className="card-header">Batch Order Details</div>
          <div className="card-body">
            <form onSubmit={submitform}>
            <div className="row gx-3 mb-3">
                {/*  Form Group (Company Name)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Company Name</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="Comapany Name"
                    onChange={evevt => setCompanyName(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Person)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Person</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Person"
                    onChange={evevt => setCompanyPerson(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Item)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputRole">Item</label>
                  <Select 
                   className="basic-single"
                   options={listProduct} 
                    filterOption={(option, searchText) =>
                        option.label.toLowerCase().includes(searchText.toLowerCase())}
                  placeholder={"Product"}
                  onChange={handleSelect} 
                //   value={options.filter(obj => role.includes(obj.value))}
                  />
                  {/* </Select> */}
                </div>
                {/*  Form Group (Raw Material)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Raw Material</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Raw Material"
                    onChange={evevt => setRawMaterial(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Finsize No)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">FinSize</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="FInSize"
                    onChange={evevt => setFinsize(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Assembly)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Assembly</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Assembly"
                    onChange={evevt => setAssembly(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Puchase No)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Puchase No</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="Purchase No"
                    onChange={evevt => setPurchaseNo(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Puchase Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Puchase Date</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="Date"
                    placeholder="Purchase Date"
                    onChange={evevt => setPurchaseDate(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Puchase Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Purchase Qty</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="Purchase Qty"
                    onChange={evevt => setPurchaseQty(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Production Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Production Qty</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Production Qty"
                    onChange={evevt => setproductionQty(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Start Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Start Date</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="Date" 
                    placeholder="Start Date"
                    onChange={evevt => setStartDate(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Issue Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Issue Date</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="Date"
                    placeholder="Issue Date"
                    onChange={evevt => setIssueDate(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Accurate Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Accurate Qty</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="Accurate Qty"
                    onChange={evevt => setAccurateQty(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Rejected Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPassword">Rejected Qty</label>
                  <input 
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Rejected Qty"
                    onChange={evevt => setRejectedQty(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              {/*  Form Row --> */}
              <div className="row gx-3 mb-3">
                {/*  Form Group (Priority)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputContactNo">Priority</label>
                  <input 
                    className="form-control" 
                    id="inputContactNo" 
                    type="text" 
                    placeholder="Priority"
                    onChange={evevt => setPriority(evevt.target.value)} >    
                  </input>
                </div>
              </div>

              {/*  Save changes button--> */}
              <button className="btn btn-primary" type="submit">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BatchOrder
