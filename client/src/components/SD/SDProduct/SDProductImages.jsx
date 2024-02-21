import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate ,useParams} from "react-router-dom";
import { CForm,CCol,CFormInput,CRow, CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsTrash, BsTrashFill, BsViewList, BsXSquare, BsXSquareFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getProductImages,uploadImage,updateProductImages} from "../../../services/dashboardService"
import { Spinner } from 'react-bootstrap';
import Switch from "react-switch";
import Alert from '../../Alert/Alert';

function SDProductImages() {
    const navigate= useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
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
    const [usedImages, setUsedImages] = useState([]);
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
            label: 'Used',
            field: 'used',
            sort: 'asc',
            width: 100
          },
          {
            label: 'View',
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
                imgs.initImages.map(async function(e){
                    let toAdd={id:i,imgURL:e,initial:true,used:imgs.prodImages.indexOf(e)>=0};
                    newInitImgs.push(toAdd);
                    i++;
                })
                if(i==imgs.initImages.length){
                    resolve({a:newInitImgs,b:imgs.prodImages})
                }
            })
            aa.then((e)=>{
                setInitialRows([...e.a]);
                setUsedImages([...e.b]);
                let newRows =[...e.a]
                newRows.map((item)=>{
                    item.used = (
                        <Switch id={item.imgURL} onChange={handleUsedImages} checked={item.used}></Switch>
                    )
                    item.actions = (
                        <div className="prods-actions">
                            <BsEyeFill link={item.imgURL} onClick={handleViewImage}/>
                        </div>
                    )
                    item.img = (
                        <img src={item.imgURL} width="80px"/>
                    )
                })
                setRows([...newRows])
            })
        }
        init()
    },[])
    // useEffect(function(){
    //     setUrlRows([...initialRows])
    // },[usedImages,setUsedImages])

    // const handleDeleteImage = (e)=>{
    //     let id=""
    //     if(e.target==e.currentTarget){
    //         id = e.target.getAttribute("id");
    //     }else{
    //         id = e.target.parentNode.getAttribute("id");
    //     }
    //     let i=0;
    //     let newAddedRows = []
    //     addedRows.map(function(item){
    //         if(item.id!=parseInt(id)){
    //             newAddedRows.push(item);
    //         }
    //         if(i==addedRows.length-1){
    //             setAddedRows([...newAddedRows])
    //         }
    //         i++;
    //     })
    //     setUrlRows([...initialRows,...addedRows])
    // }
    const handleUsedImages = (c,e,i)=>{
        if(usedImages.indexOf(i)>=0){
            let newUsedImages= [...usedImages]
            newUsedImages.splice(usedImages.indexOf(i),1)
            setUsedImages([...newUsedImages])
        }else{
            setUsedImages([...usedImages,i])
        }
    }
    useEffect(()=> {
        let newRows =[...initialRows]
          newRows.map((item)=>{
            item.used = (
                <Switch id={item.imgURL} onChange={handleUsedImages} checked={usedImages.indexOf(item.imgURL)>=0}></Switch>
            )
            item.actions = (
                <div className="prods-actions">
                  <BsEyeFill link={item.imgURL} onClick={handleViewImage}/>
                </div>
            )
            item.img = (
                <img src={item.imgURL} width="80px"/>
            )
          })
          setRows([...newRows])
    },[usedImages, setUsedImages])

    const handleSubmit = async (e)=>{
        setLoading(true);
        e.preventDefault();
        await updateProductImages(params.id,{images:usedImages})
        .then(function(e){
            setLoading(false);
            setAlert({msg:"Saved successfully !",type:"success",refresh:!alert.refresh})
        }).catch(error => {
            setAlert({msg:error.message+" !",type:"fail",refresh:!alert.refresh})
          });
    }
    const handleExitFullScreen = (e)=>{
        setViewingImage({
            viewing:false,
            img:""
        })
    }
    // const handleAddImage = (e)=>{
    //     setLoading(true);
    //     const reader = new FileReader();

    //     reader.readAsDataURL(e.target.files[0]);

    //     reader.onload = async () => {
    //         await uploadImage(reader.result).then((r,err)=>{
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 setAddedRows([...addedRows, {id: addedRows[addedRows.length-1].id+1,imgURL:r.url,initial:false}]);
    //             }
    //         })
            
    //         setLoading(false);
    //     }
    // }
    return (
        <div className="sd-singleproduct-section">
            <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
            {!loading?
            <>
            {viewingImage.viewing?
                <div className="view-image-fullscreen">
                    <BsXSquareFill onClick={handleExitFullScreen} className="exit-fullscreen"/>
                    <img src={viewingImage.img} alt="" />
                </div>
             :    <></>
            }
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={12}>
                    {/* <CRow>
                        <CCol md={12}>
                            <CFormInput onChange={handleAddImage} name="AddImg" type="file" id="price" label="Add Image"/>
                        </CCol>
                    </CRow> */}
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
