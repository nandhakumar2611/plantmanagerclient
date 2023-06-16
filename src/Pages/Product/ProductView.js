import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";
import { Link, useParams } from "react-router-dom";
import $ from "jquery"
import "../Admin/style.css"

const ProductView = () => {
    let [product, setProduct] = useState([])
    let [deletModel,setDeleteModel]=useState(false)
    let [productId, setproductId] = useState('')

    const { id } = useParams();

    const initProduct = () => {

        dataService.getexe("/auth/product")
            .then(response => {
                console.log("PRODUCT DATA", response.data);
                setProduct(response.data)
            })
            .catch(error => {
                console.log("SOMETHING WRONG", error);
            })
    }

    const ItemSet = (item) => {
        // console.log("model")
        setproductId(item.id)
        setDeleteModel(true)
    }

    const remove = () => {
        
        console.log(productId);
        setDeleteModel(false)
        dataService.deleteexe(`/auth/product/${productId}`)
            .then(response => {
                console.log("DELETE ID", response.id);
                initProduct()
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
            initProduct();
        }, 2000);
      } );
    }

    useEffect(() => {
        initProduct();
        initTable();
    }, []);

  return (
    <>
    <div>
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header d-flex flex-row align-items-center justify-content-between py-3 bg-light">
                    <h6 className="m-0 font-weight-bold text-primary">Product Table</h6>
                    <a href="/product" className="btn btn-sm btn-primary shadow-sm">
                        <i className="fa fa-plus fa-sm text-white-50"></i> Add Product</a>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="example" className="display nowrap cell-border pt-2" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product Name</th>
                                    <th>Product Description</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {product && product.length > 0 ? ( */}
                                {product.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-xs">{index+1}</td>
                                            <td className="text-xs">{item.productName}</td>
                                            <td className="text-xs">{item.productdesc}</td>
                                            <td>
                                                <Link to={`/EditProduct/${item.id}`} >
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
                                //                 <td colSpan="5" className="text-center">
                                //                     {/* {plant ? 'No plants found': null} */}
                                //                     No Data
                                //                 </td>
                                //             </tr>
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

export default ProductView