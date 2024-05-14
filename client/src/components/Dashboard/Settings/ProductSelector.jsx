import React,{useEffect,useRef,useState} from 'react'
import {CButton} from '@coreui/react';
import { MDBDataTable } from 'mdbreact';
import {getAllProducts} from '../../../services/adminService';
import { BsXCircleFill } from "react-icons/bs";

export default function ProductSelector({index,passSelectedProduct}) {
  const lang = localStorage.getItem("lang");
  const [rows, setRows] = useState([]);
  const [prods, setProds] = useState([]);
  const [visibleProds, setVisibleProds] = useState(false);
  const hasPageBeenRendered = useRef(false);
    const data = {
        columns: [
          {
            label: 'Ref',
            field: 'reference',
            width: 150
          },
          {
            label: 'Image',
            field: 'img',
            width: 100
          },
          {
            label: 'Product Name',
            field: 'name',
            width: 150
          },
          {
            label: 'Price',
            field: 'price',
            width: 100
          },
          {
            label: 'Actions',
            field: 'actions',
            width: 100
          }
        ],
        rows:rows
      };
      const handleSelectProduct = (e)=>{
        setVisibleProds(true);
      }
      const getObjectById = (id)=>{
        let aa=[...prods];
        return aa.filter(a=> a.product._id==id)
      }
      const handleSelectProductToAdd = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        let theSelectedProd = getObjectById(id)[0]
        passSelectedProduct({
          name:theSelectedProd.initialProduct.name[lang],
          price:theSelectedProd.product.newPrice,
          img:theSelectedProd.product.images[0],
          link:"/products/"+id.toString(),
          index:index
        })
        handleExitPopUp();
      }
      useEffect(function(){
        let rows1 = [...prods];
        prods.map((element)=>{
          element.reference = element?.initialProduct?.ref;
          element.name = element?.initialProduct?.name[lang];
          element.img = (<img width="50" src={element.product.images[0]}/>)
          element.price = element.product.newPrice;
          element.actions = (<CButton id={element.product._id} onClick={handleSelectProductToAdd}>Select</CButton>)
        })
        setRows(rows1)
      },[prods,setProds])
      useEffect(function(){
        async function init(){
          await getAllProducts()
          .then((prods)=>{
            setProds(prods);
          })
        }
        if(hasPageBeenRendered.current && visibleProds==true){
          init()
        }
        hasPageBeenRendered.current = true;
      },[visibleProds,setVisibleProds])
      const handleExitPopUp = (e)=>{
        setVisibleProds(false);
      }
  return (
    <>
      {visibleProds?
        <div style={{display:"flex",justifyContent:"center",position:"fixed",zIndex:99,height:"100vh",top:0,left:0,width:"100%",overflowY:"scroll"}}>
            <div onClick={handleExitPopUp}  className="exit-popup" style={{zIndex:100,cursor:"pointer",position:"absolute",top:"20px"}}>
              <BsXCircleFill style={{position:"relative",color:"red",fontSize:"24px"}}/>
            </div>
          <MDBDataTable
              striped
              small
              noBottomColumns={true}
              data={data}
              className='select-prods-list'
          />
        </div>
        : ""
        }
        <CButton onClick={handleSelectProduct}>
            Select Product
        </CButton>
    </>
  )
}
