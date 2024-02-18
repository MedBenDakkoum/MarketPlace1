import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsXSquareFill, BsTrashFill, BsViewList } from "react-icons/bs";
import Switch from "react-switch";
import { MDBDataTable } from 'mdbreact';
import {getProducts,getInitialProducts,toggleActive} from "../../services/dashboardService"
import { Spinner } from 'react-bootstrap';

function SDProducts() {
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [addProdPop, setAddProdPop] = useState(false);
    const [prodRows,setProdRows] = useState([]);
      const [prods, setProds] = useState([
      {
        _id:"",
        ref:"",
        img: "",
        name:"",
        price:0,
        quantity:0,
        enabled:false
    },
  ]);
  const [initialProds, setInitialProds] = useState([
    {
      _id:"",
      ref:"",
      img: "",
      name:"",
      price:0,
      quantity:0,
      used:false
  },
]);
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
    await toggleActive(id).then(function(a){
      setRefresh(!refresh);
      setLoading(false)
    })
  }
  const isInitialProductUsed = (ipID)=>{
    return new Promise(async (resolve, reject) => {
      let i=0;
      prods.forEach(function(prod){
        if(prod.iP==ipID){
          resolve(true);
        }
        if(i==prods.length-1){
          resolve(false)
        }
        i++;
      })
  })
  }
  const handleToggleProductPop = (e)=>{
    if(addProdPop){
      setAddProdPop(false);
    }else{
      setAddProdPop(true);
    }
  }
  useEffect(function(){
    async function init(){
      let iP = await getInitialProducts();
      let newiP = []
      iP.forEach((element) => {
        isInitialProductUsed(element._id).then(function(aa){
            newiP.push({
              _id:element._id,
              ref:element.ref,
              img:element.images[0] || "",
              name:element.name,
              price:element.price || 0,
              quantity:element.quantity || 0,
              used:aa,
            });
        })
      });
      setInitialProds(newiP);
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
            <CButton type="button">
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
            <div className="prods-actions"><BsPencilFill onClick={(e)=>{navigate('/dashboard/products/'+item._id)}}/><BsTrashFill/><BsEyeFill/></div>
          )
          item.enabled = (
            <Switch id={item._id} onChange={handleChangeActive} checked={item.enabled}></Switch>
          )
        })
        setProdRows([...newProds])
    },[prods,setProds]);
    
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Products</h1>
          </div>
          <div className="sd-section-main">
            {
              addProdPop? 
              <div className="addprod-pop-container">
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
