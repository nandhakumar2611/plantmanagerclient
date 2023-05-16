import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dataService from "../../Service/dataService";
import Select from 'react-select';
import moment from "moment";

const EditBatchOrder = () => {
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

  const handleSelect = (event) => {
    console.log('Item',event);
    setItem(event.value);
  }

  const defaultValue = { value: item, label: item}

  const initProduct = () => {

      const arr = [];
      const url = `/auth/product`;    // uRL to get all operation
      dataService.getexe(url)
      .then(response => {
          console.log("Product DATA",response.data);
          let result = response.data;
          result.map((opt)=>{
              return arr.push({value: opt.productName, label: opt.productName})
          })
          setListProduct(arr)
      })
      .catch(error => {
          console.log("PRODUCT DATA ERROR",error);
      })
  }

  const {id} = useParams();
  const url = `/auth/batchorder/${id}`

  const formatData= (data) => {

    const formattedData = moment(data).format("YYYY-MM-DD")
    return formattedData;
  } 

  const initBatchOrder = () => {

      dataService.getexe(url)
          .then(response => {
              console.log("USER DATA BY ID",response.data);
              setCompanyName(response.data.comapanyName)
              setCompanyPerson(response.data.companyPerson)
              setItem(response.data.item)
              setRawMaterial(response.data.rawMaterial)
              setFinsize(response.data.finSize)
              setAssembly(response.data.assembly)
              setPurchaseNo(response.data.purchaseNo)
              setPurchaseDate(response.data.purchaseDate)
              setPurchaseQty(response.data.purchaseQty)
              setproductionQty(response.data.productionQty)
              setStartDate(response.data.startDate)
              setIssueDate(response.data.issueDate)
              setPriority(response.data.priority)
          })
          .catch(error => {
              console.log("USER ERROR ", error);
          })
    }

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
      dataService.putexe(`auth/batchorder/${id}`,postData)
        .then(response => {
          console.log('USER ADDED SUCCESSFULLY',response.data);
          navigate('/batchorderview')
        })
        .catch(error => {
          console.log('SOMETHING WRONG', error);
        })
    }

    useEffect(() => {
      initBatchOrder();
      initProduct();
    }, []);

  return (
    <div className="container">
    <div className="row">
      <div className="col-xl-8">
        {/*  Batch Order card */}
        <div className="card mb-4">
          <div className="card-header">Batch Order Details</div>
          <div className="card-body">
            <form onSubmit={submitform}>
            <div className="row gx-3 mb-3">
                {/*  Form Group (Company Name)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputCompanyName">Company Name</label>
                  <input 
                    className="form-control" 
                    id="inputCompanyName" 
                    type="text" 
                    placeholder="Comapany Name"
                    value={comapanyName}
                    onChange={evevt => setCompanyName(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Person)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPerson">Person</label>
                  <input 
                    className="form-control"
                    id="inputPerson"
                    type="text"
                    placeholder="Person"
                    value={companyPerson}
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
                    value={defaultValue}
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
                  <label className="small mb-1" htmlFor="inputRawMaterial">Raw Material</label>
                  <input 
                    className="form-control"
                    id="inputRawMaterial"
                    type="text"
                    placeholder="Raw Material"
                    value={rawMaterial}
                    onChange={evevt => setRawMaterial(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Finsize No)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputFinSize">FinSize</label>
                  <input 
                    className="form-control" 
                    id="inputFinSize" 
                    type="text" 
                    placeholder="FInSize"
                    value={finsize}
                    onChange={evevt => setFinsize(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Assembly)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputAssembly">Assembly</label>
                  <input 
                    className="form-control"
                    id="inputAssembly"
                    type="text"
                    placeholder="Assembly"
                    value={assembly}
                    onChange={evevt => setAssembly(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Puchase No)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPurchaseNo">Purchase No</label>
                  <input 
                    className="form-control" 
                    id="inputPurchaseNo" 
                    type="text" 
                    placeholder="Purchase No"
                    value={purchaseNo}
                    onChange={evevt => setPurchaseNo(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Puchase Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPurchaseDate">Puchase Date</label>
                  <input 
                    className="form-control"
                    id="inputPurchaseDate"
                    type="Date"
                    placeholder="Purchase Date"
                    // value={purchaseDate}
                    // value={"2023-05-04"}
                    value={formatData(purchaseDate)}
                    onChange={evevt => setPurchaseDate(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Puchase Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPurchaseQty">Purchase Qty</label>
                  <input 
                    className="form-control" 
                    id="inputPurchaseQty" 
                    type="text" 
                    placeholder="Purchase Qty"
                    value={purchaseQty}
                    onChange={evevt => setPurchaseQty(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Production Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputProductionQty">Production Qty</label>
                  <input 
                    className="form-control"
                    id="inputProductionQty"
                    type="text"
                    placeholder="Production Qty"
                    value={productionQty}
                    onChange={evevt => setproductionQty(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Start Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputStartDate">Start Date</label>
                  <input 
                    className="form-control" 
                    id="inputStartDate" 
                    type="Date" 
                    placeholder="Start Date"
                    value={formatData(startDate)}
                    onChange={evevt => setStartDate(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Issue Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputIssueDate">Issue Date</label>
                  <input 
                    className="form-control"
                    id="inputIssueDate"
                    type="Date"
                    placeholder="Issue Date"
                    value={formatData(issueDate)}
                    onChange={evevt => setIssueDate(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                {/*  Form Group (Accurate Qty)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputAccurateQty">Accurate Qty</label>
                  <input 
                    className="form-control" 
                    id="inputAccurateQty" 
                    type="text" 
                    placeholder="Accurate Qty"
                    value={accurateQty}
                    onChange={evevt => setAccurateQty(evevt.target.value)} >    
                  </input>
                </div>
                {/*  Form Group (Rejected Date)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputRejectedQty">Rejected Qty</label>
                  <input 
                    className="form-control"
                    id="inputRejectedQty"
                    type="text"
                    placeholder="Rejected Qty"
                    value={rejectedQty}
                    onChange={evevt => setRejectedQty(evevt.target.value)} >    
                  </input>
                </div>
              </div>
              {/*  Form Row --> */}
              <div className="row gx-3 mb-3">
                {/*  Form Group (Priority)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPriority">Priority</label>
                  <input 
                    className="form-control" 
                    id="inputPriority" 
                    type="text" 
                    placeholder="Priority"
                    value={priority}
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

export default EditBatchOrder