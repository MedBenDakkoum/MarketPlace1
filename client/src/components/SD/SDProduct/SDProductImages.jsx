import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormInput,CRow, CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsTrash, BsTrashFill, BsViewList, BsXSquare, BsXSquareFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';

function SDProductImages() {
    const navigate= useNavigate();
    const [viewingImage, setViewingImage] = useState({
        viewing:false,
        img:"",
        id:0
    });
    const [initialRows, setInitialRows] = useState([
        {
            id:1,
            imgURL: "https://etajer.com.tn/10/image.jpg",
            initial:true
        },
        {
            id:2,
            imgURL:"https://etajer.com.tn/8/image.jpg",
            initial:true
        }
    ]);
    const [addedRows, setAddedRows] = useState([
        {
            id:3,
            imgURL:"https://etajer.com.tn/7/image.jpg",
            initial:false
        }
    ]);
    const [rows, setRows] = useState([...initialRows,...addedRows])
    const data = {
        columns: [
          {
            label: 'Image ID',
            field: 'id',
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
            label: 'Actions',
            field: 'actions',
            sort: 'asc',
            width: 100
          }
        ],
        rows:rows
      };
      const handleViewImage = (e)=>{
        e.preventDefault();
        
        if(e.target === e.currentTarget) {
            setViewingImage({
                viewing:true,
                img:e.target.getAttribute("link")
            })
        }else{
            setViewingImage({
                viewing:true,
                img:e.target.parentNode.getAttribute("link")
            })
        }
      }
    useEffect(function(){
        //set initial data
        
    },[])
    const handleDeleteImage = (e)=>{
        // let newAddedRows = [...addedRows]
        let id=""
        if(e.target==e.currentTarget){
            id =e.target.getAttribute("id");
        }else{
            id =e.target.parentNode.getAttribute("id");
        }
        addedRows.map(function(item,i){
            if(item.id==id){
                setAddedRows(addedRows.splice(i,1));
            }
        })
        setRows([...initialRows,...addedRows])
    }
    useEffect(()=> {
        let newRows =[...rows]
          newRows.map((item)=>{
            item.actions = (
                <div className="prods-actions">{!item.initial? <BsTrashFill onClick={handleDeleteImage} id={item.id}/> : ""}
                  <BsEyeFill link={item.imgURL} onClick={handleViewImage}/>
                </div>
            )
            item.img = (
                <img src={item.imgURL} width="80px"/>
            )
          })
          setRows([...newRows])
      },[rows, setRows])
    const handleChange = (e)=>{
        // setNewImages([...newImages,e.target.value]);
    }
    const handleSumbit = (e)=>{
        e.preventDefault();
        // let newData = [...initialImages,...newImages]
        console.log(rows);
    }
    const handleExitFullScreen = (e)=>{
        setViewingImage({
            viewing:false,
            img:""
        })
    }
    return (
        <div className="sd-singleproduct-section">
            {viewingImage.viewing?
                <div className="view-image-fullscreen">
                    <BsXSquareFill onClick={handleExitFullScreen} className="exit-fullscreen"/>
                    <img src={viewingImage.img} alt="" />
                </div>
             :    <></>
            }
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput name="AddImg" type="file" id="price" label="Add Image"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <MDBDataTable
                            striped
                            small
                            noBottomColumns={true}
                            style={{color:"white"}}
                            data={data}
                            />
                    </CRow>
                    <CRow>
                        <CButton type="submit">
                            Save
                        </CButton>
                    </CRow>
                </CCol>
            </CForm>
        </div>
    );
}

export default SDProductImages;
