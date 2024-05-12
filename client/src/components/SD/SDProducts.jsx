import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsXSquareFill, BsTrashFill, BsViewList } from "react-icons/bs";
import Switch from "react-switch";
import { MDBDataTable } from 'mdbreact';
import {getProducts,getInitialProducts,toggleActive,removeProduct} from "../../services/dashboardService"
import { Spinner } from 'react-bootstrap';
import Alert from '../Alert/Alert';
import SellNowProd from './SDProduct/SellNowProd';
import Swal from 'sweetalert2';

function SDProducts() {
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert]= useState({
      msg:"",
      type:"",
      refresh:true
  })
  const [addNewSellProd, setAddNewSellProd] = useState({
    active:false,
    id:""
  })
    const [refresh, setRefresh] = useState(true);
    const [addProdPop, setAddProdPop] = useState(false);
    const [prodRows,setProdRows] = useState([]);
      const [prods, setProds] = useState([]);
  const [initialProds, setInitialProds] = useState([]);
const [initialProdRows,setInitialProdRows] = useState([]);
  const data = {
    columns: [
      {
        label: 'Ref',
        field: 'ref',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'img',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Status',
        field: 'enabled',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
        width: 100
      }
    ],
    rows:prodRows
  };
  const initialData = {
    columns: [
      {
        label: 'Ref',
        field: 'ref',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'img',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Sell',
        field: 'used',
        sort: 'asc',
        width: 150
      },
    ],
    rows:initialProdRows
  };
  const handleChangeActive = async(c,e,id)=>{
    setLoading(true);
    await toggleActive(id)
    .then(updatedData => {
      setRefresh(!refresh);
      setAlert({msg:"Updated !",type:"success",refresh:!alert.refresh})
    })
    .catch(error => {
      setAlert({msg:error.message+" !",type:"fail",refresh:!alert.refresh})
    });
      setLoading(false)
  }
  const isInitialProductUsed = (ipID)=>{
    for (let i = 0; i < prods.length; i++) {
      const prod = prods[i];
      if(prod.iP==ipID){
        return true;
      }
      if(i==prods.length-1){
        return false;
      }
    }
    return false;
  }
  const handleSellNow = (e) =>{
    setAddNewSellProd({
      active:true,
      id: e.target.attributes.id.value
    })
  }
  const handleToggleProductPop = (e)=>{
    if(addProdPop){
      setAddProdPop(false);
    }else{
      setAddProdPop(true);
    }
  }
  const handleDeleteProduct = (e)=>{
    let id=""
      if(e.target==e.currentTarget){
        id = e.target.getAttribute("id");
      }else{
        id = e.target.parentNode.getAttribute("id");
      }
      Swal.fire({
        title: "Do you want to stop this product?",
        showCancelButton: true,
        confirmButtonText: "Stop selling",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await removeProduct(id)
            .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Product Removed !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setRefresh(!refresh);
                setLoading(false);
            }).catch(function(err){
              
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: err.response.data.msg,
                });
                setLoading(false);
                });
        }
      });
  }
  useEffect(function(){
    async function init(){
      await getInitialProducts()
      .then(async (iP)=>{
        let newiP = []
        let i=0;
        iP.forEach(async (element) => {
          let aa = isInitialProductUsed(element._id)
          newiP.push({
              _id:element._id,
              ref:element.ref,
              img:element.images[0] || "",
              name:element.name,
              price:element.price || 0,
              quantity:element.quantity || 0,
              used:aa,
            }); 
          if(i==iP.length-1){
            setInitialProds(newiP);
          }
          i++;
        });
    })
    }
    if(addProdPop==true){
      init()
    }
  },[addProdPop,setAddProdPop])

  useEffect(()=> {
    let newProds =[...initialProds]
      newProds.map((item)=>{
        item.img = (
          <img src={item.img} width="40px"/>
        )
        if(item.used){
          item.used = (
            <Switch id={item._id} onChange={(e)=>{}} checked={true}></Switch>
          ) 
        }else{
          item.used = (
            <CButton id={item._id} onClick={handleSellNow} type="button" >
              Sell now
            </CButton>
          )
        }
      })
      setInitialProdRows([...newProds])
  },[initialProds,setInitialProds]);
    useEffect(function(){
      async function init(){
        let Ps = await getProducts();
        let newPs = []
        Ps.forEach((element) => {
          newPs.push({
            _id:element.product._id,
            ref:element.product.ref,
            img:element.initialProd.images[0] || "",
            name:element.initialProd.name,
            price:element.product.newPrice,
            quantity:element.initialProd.quantity,
            enabled:element.product.isActive,
            iP:element.product.initialProduct,
          });
        });
        setProds(newPs);
      }
      init()
    },[refresh,setRefresh]);
    
    useEffect(()=> {
      let newProds =[...prods]
        newProds.map((item)=>{
          item.img = (
            <img src={item.img} width="40px"/>
          )
          item.actions = (
            <div className="prods-actions">
              <BsPencilFill onClick={(e)=>{navigate('/dashboard/products/'+item._id)}}/>
              <BsTrashFill id={item._id} onClick={handleDeleteProduct}/>
              <BsEyeFill onClick={(e)=>{navigate("/products/"+item._id)}}/>
            </div>
          )
          item.enabled = (
            <Switch id={item._id} onChange={handleChangeActive} checked={item.enabled}></Switch>
          )
        })
        setProdRows([...newProds])
    },[prods,setProds]);
    const handleCancel = (e)=>{
      setAddNewSellProd({active:false,id:''});
    }
    const handleAddedNewProd = (e)=>{
      setRefresh(!refresh);
      handleCancel();
      setAddProdPop(false);
    }
    return (
      <main className="sd-container">
        <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
          <div className="sd-section-title">
            <h1>Products</h1>
          </div>
          <div className="sd-section-main">
            {
              addProdPop? 
              <div className="addprod-pop-container">
                {addNewSellProd.active?
                  <SellNowProd refreshing={handleAddedNewProd} cancel={handleCancel} id={addNewSellProd.id} />
                :
                <div className="addprod-pop-main">
                  <BsXSquareFill onClick={handleToggleProductPop} className="exit-fullscreen"/>
                  <MDBDataTable
                    striped
                    small
                    noBottomColumns={true}
                    style={{color:"white"}}
                    data={initialData}
                  />
                </div>
                }
              </div> 
              : "" 
            }
          {!loading?
            <>
            <div className="add-button">
              <CButton onClick={handleToggleProductPop} type="button">
                Add Product
              </CButton>
            </div>
            <MDBDataTable
              striped
              small
              noBottomColumns={true}
              style={{color:"white"}}
              data={data}
            />
            </>
            : 
            <div className="spinner">
                <Spinner animation="border" />
            </div> 

            }
          </div>
      </main>
    );
}

export default SDProducts;
