import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getAllLayouts} from '../../../services/publicData'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomSlider from "../../Home/customer.slider";
import CategorySelector from "./CategorySelector";

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
  
function HomeSections() {
    const [topBannerImages,setTopBannerImages] = useState([])
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState([]);

    const getLayoutByRef = (ref,layouts)=>{
        let aa = [...layouts];
        return aa.filter(layout => layout.sectionRef==ref)
    }

    useEffect(function(){
        async function init(){
            let layouts = await getAllLayouts();
            setSections(getLayoutByRef("single_cat_prods",layouts)[0].data);
        } 
        init()
        setLoading(false);
    },[])
    useEffect(function(){
        console.log(sections);
    },[sections,setSections])
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
                {/* <CCol md={12}> */}
                    {sections?.map((section,index)=>(
                        <div style={{margin:"0 20px"}} key={index}>
                            <p>Section "{section?.title}":</p>
                            <CategorySelector />
                            <CRow>
                                <CCol md={6}>
                                    <CFormInput value={section?.title} name="title" type="text" id="inputTitle" disabled/>
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput value={section?.title} name="title" type="text" id="inputTitle" disabled/>
                                </CCol>
                            </CRow>
                            <div style={{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center",margin:"20px 0"}}>
                            
                            {section.prods.map((prod,index2)=>(
                                <div style={{width:"100px",display:"flex",flexDirection:"column",justifyContent:"space-between"}} key={index2}>
                                    <div>
                                        <img style={{width:"100%"}} src={prod.img}/>
                                        <p>{prod.title}</p>
                                    </div>
                                     
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                {/* </CCol> */}
            </CForm>
  )
}

export {HomeSections};