import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate ,useParams} from "react-router-dom";
import { CForm,CCol,CFormInput,CRow, CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsTrash, BsTrashFill, BsViewList, BsXSquare, BsXSquareFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getProductImages,uploadImage,updateProductImages} from "../../../services/dashboardService"
import { Spinner } from 'react-bootstrap';

function SDProductImages() {
    const navigate= useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [viewingImage, setViewingImage] = useState({
        viewing:false,
        img:"",
        id:0
    });
    const [urlRows, setUrlRows] = useState([])
    const [initialRows, setInitialRows] = useState([
        {
            id:0,
            imgURL: "",
            initial:false
        }
    ]);
    const [addedRows, setAddedRows] = useState([
        {
            id:0,
            imgURL:"",
            initial:false
        }
    ]);
    const [rows, setRows] = useState([])
    let data = {
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
        async function init(){
            let aa = new Promise(async (resolve, reject) => {
                let imgs = await getProductImages(params.id);
                let newInitImgs = []
                let i=0
                imgs.initImages.map(function(e){
                    let toAdd={id:i,imgURL:e,initial:true}
                    newInitImgs.push(toAdd)
                    i++;
                })
                let newProdImgs = []
                imgs.prodImages.map(function(e){
                    let toAdd={id:i,imgURL:e,initial:false}
                    newProdImgs.push(toAdd)
                    i++;
                })
                if(i==imgs.initImages.length+imgs.prodImages.length){
                    resolve({a:newInitImgs,b:newProdImgs})
                }
            })
            aa.then((e)=>{
                setInitialRows([...e.a]);
                setAddedRows([...e.b]);
                setUrlRows([...e.a,...e.b])
            })
        }
        init()
    },[])
    useEffect(function(){
        setUrlRows([...initialRows,...addedRows])
    },[addedRows,setAddedRows])

    const handleDeleteImage = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
            id = e.target.getAttribute("id");
        }else{
            id = e.target.parentNode.getAttribute("id");
        }
        let i=0;
        let newAddedRows = []
        addedRows.map(function(item){
            if(item.id!=parseInt(id)){
                newAddedRows.push(item);
            }
            if(i==addedRows.length-1){
                setAddedRows([...newAddedRows])
            }
            i++;
        })
        setUrlRows([...initialRows,...addedRows])
    }
    useEffect(()=> {
        let newRows =[...urlRows]
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
      },[urlRows, setUrlRows])
    const handleSumbit = async (e)=>{
        setLoading(true);
        e.preventDefault();
        let newData = [];
        addedRows.forEach(function(e){
            newData.push(e.imgURL)
        })
        await updateProductImages(params.id,{images:newData}).then(function(e){
            setLoading(false);
        })
    }
    const handleExitFullScreen = (e)=>{
        setViewingImage({
            viewing:false,
            img:""
        })
    }
    const handleAddImage = (e)=>{
        setLoading(true);
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = async () => {
            await uploadImage(reader.result).then((r,err)=>{
                if(err){
                    console.log(err);
                }else{
                    setAddedRows([...addedRows, {id: addedRows[addedRows.length-1].id+1,imgURL:r.url,initial:false}]);
                }
            })
            
            setLoading(false);
        }
    }
    return (
        <div className="sd-singleproduct-section">
            {!loading?
            <>
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
                            <CFormInput onChange={handleAddImage} name="AddImg" type="file" id="price" label="Add Image"/>
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
            </>
            : 
            <div className="spinner">
                <Spinner animation="border" />
            </div> 
            }
        </div>
    );
}

export default SDProductImages;
