import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getAllLayouts} from '../../../services/publicData'
import {uploadImage,updateTopBannerImages} from '../../../services/adminService'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomSlider from "../../Home/customer.slider";

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
  
function TopBanner() {
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
            let newLayouts = getLayoutByRef("top_banner_images",layouts)[0].data
            newLayouts.sort((a, b) => {
                const nameA = a.imgAlt.toUpperCase(); // ignore upper and lowercase
                const nameB = b.imgAlt.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
              
            setTopBannerImages(newLayouts)
        } 
        init()
        setLoading(false);
    },[])
    const handleChanges = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("imgIdAlt");
        }else{
          id = e.target.parentNode.getAttribute("imgIdAlt");
        }
        let poped = topBannerImages.filter(a=>a.imgAlt==id);
        let aa = topBannerImages.filter(a=>a.imgAlt!==id);
        aa.push({...poped[0],link:e.target.value});
        aa.sort((a, b) => {
            const nameA = a.imgAlt.toUpperCase(); 
            const nameB = b.imgAlt.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        setTopBannerImages(aa);
    }

    const handleChangeUpload = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = async () => {
            setLoading(true);
            await uploadImage(reader.result,1080).then((r,err)=>{
                if(err){
                    console.log(err);
                }else{
                    let poped = topBannerImages.filter(a=>a.imgAlt==id)
                    let aa = topBannerImages.filter(a=>a.imgAlt!==id);
                    aa.push({...poped[0],imgURL:r.url})
                    aa.sort((a, b) => {
                        const nameA = a.imgAlt.toUpperCase(); 
                        const nameB = b.imgAlt.toUpperCase(); 
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      });
                    setTopBannerImages(aa);
                    setLoading(false);
                }
            })
        }
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await updateTopBannerImages(topBannerImages).then((rslt)=>{
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Top Banner Images Updated",
                showConfirmButton: false,
                timer: 1500
            });
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
                        <CRow>
                    <CustomSlider>
                        {topBannerImages?.map((image, index) => {
                            return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
                        })}
                    </CustomSlider>
                    </CRow>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                            {topBannerImages?.map((oneImageBanner,index)=>(
                                <div key={index} style={{display:"flex",gap:"10px"}}>
                                    <img style={{width:"200px",objectFit:"cover"}}src={oneImageBanner.imgURL}/>
                                    <div>
                                        <CFormInput imgIdAlt={oneImageBanner.imgAlt} onChange={handleChanges} value={oneImageBanner.link} name="link" type="text" id="inputLinkId" label="Link:" />
                                        <Button
                                            style={{backgroundColor:"#3A5BFF",margin:"10px 0"}}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload image
                                            <VisuallyHiddenInput id={oneImageBanner.imgAlt} onChange={handleChangeUpload} type="file" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <CButton type='submit' style={{width:"200px",margin:"20px 0"}}>Save</CButton>
                    </div>
                    </CCol>
                    
                </CCol>
            </CForm>
  )
}

export {TopBanner};