import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getAllLayouts} from '../../../services/publicData'
import {selectNewRecommandedProduct} from '../../../services/adminService'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomSlider from "../../Home/customer.slider";
import ProductSelector from "./ProductSelector";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
function RecommandedItems() {
    const [loading, setLoading] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [recommendedItems,setRecommendedItems] = useState([]);
    const getLayoutByRef = (ref,layouts)=>{
        let aa = [...layouts];
        return aa.filter(layout => layout.sectionRef==ref)
    }
    useEffect(function(){
        async function init(){
            let layouts = await getAllLayouts();
            setRecommendedItems(getLayoutByRef("recommended_items",layouts)[0].data);
        } 
        init()
        setLoading(false);
    },[refresh,setRefresh])
    const handleChanges = (e)=>{
        // setSettings({...settings,supportEmail: e.target.value})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        // setLoading(true);
        // await updateSettings({data:settings}).then((rslt)=>{
        //     setLoading(false);
        //     Swal.fire({
        //         icon: "success",
        //         title: "Settings Updated",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // })
        // .catch((e)=>{
        //     setLoading(false);
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops !",
        //         text: e.message,
        //     });
        // })
    }
    const handleSelectNewProduct = async (o)=>{
        await selectNewRecommandedProduct(o)
        .then((rslt)=>{
            console.log(o)
            console.log(rslt)
            Swal.fire({
                icon: "success",
                title: "Product Selected",
                showConfirmButton: false,
                timer: 1500
            });
            setRefresh(!refresh)
        })
        .catch((e)=>{
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: e.message,
            });
        })

    }
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <ThreeDots
                    visible={loading}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="overlay-spinner"
                />
                <CCol md={12}>
                    <CCol md={12}>
                    <div>
                        <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                            {/* {recommendedItems?.map((recommendedItem)=>(
                                <div style={{display:"flex",gap:"10px"}}>
                                    <img style={{width:"200px",objectFit:"cover"}}src={oneImageBanner.imgURL}/>
                                    <div>
                                        <CFormInput onChange={handleChanges} name="supportEmail" type="text" id="inputEmailId" label="Link:" />
                                        <Button
                                            style={{backgroundColor:"#3A5BFF"}}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            >
                                            Upload image
                                            <VisuallyHiddenInput type="file" />
                                        </Button>
                                    </div>
                                </div>
                            ))} */}
                            {recommendedItems?.map((recommendedItem,indexed)=>(
                             <div key={indexed}style={{width:"100px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                <div>
                                    <img style={{width:"100%"}} src={recommendedItem.img}/>
                                    <p style={{opacity:0.8,margin:0}}>{recommendedItem.name}</p>
                                    <p>{recommendedItem.price} TND</p>
                                </div>
                                <ProductSelector index={recommendedItem.index} passSelectedProduct={handleSelectNewProduct}/> 
                            </div>
                            ))}
                        </div>
                    </div>
                    </CCol>
                    
                </CCol>
            </CForm>
  )
}

export {RecommandedItems};