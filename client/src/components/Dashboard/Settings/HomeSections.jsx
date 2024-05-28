import React, {useEffect,useState} from 'react';
import { CForm,CFormInput} from '@coreui/react';
import {getAllLayouts} from '../../../services/publicData'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CategorySelector from "./CategorySelector";
import {selectNewSectionCat,uploadImage} from '../../../services/adminService'

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
    const lang = localStorage.getItem("lang");
    const [topBannerImages,setTopBannerImages] = useState([])
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const getLayoutByRef = (ref,layouts)=>{
        let aa = [...layouts];
        return aa.filter(layout => layout.sectionRef==ref)
    }

    useEffect(function(){
        async function init(){
            let layouts = await getAllLayouts();
            let aa = getLayoutByRef("single_cat_prods",layouts)[0].data;
            aa.sort((a, b) => {
                const nameA = a.index;
                const nameB = b.index;
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
            setSections(aa);
        } 
        init()
        setLoading(false);
    },[refresh, setRefresh])
    useEffect(function(){
        console.log(sections);
    },[sections,setSections])
    const handleChanges = (e)=>{
        // setSettings({...settings,supportEmail: e.target.value})
    }
    const handleCatIsSelected = async (o)=>{
        await selectNewSectionCat(o)
        .then((rslt)=>{
            Swal.fire({
                icon: "success",
                title: "Categorie Selected",
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
    const handleChangeUpload = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        console.log(id);
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = async () => {
            setLoading(true);
            await uploadImage(reader.result,800).then(async (r,err)=>{
                if(err){
                    console.log(err);
                }else{
                    let poped = sections.filter(a=>a.index.toString()==id.toString())
                    let aa = sections.filter(a=>a.index.toString()!==id.toString());
                    aa.push({...poped[0],img:r.url})
                    aa.sort((a, b) => {
                        const nameA = a.index; 
                        const nameB = b.index; 
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      });
                    setSections(aa);
                    await selectNewSectionCat({...poped[0],img:r.url})
                    .then((rslt)=>{
                        Swal.fire({
                            icon: "success",
                            title: "Image Updated",
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
                    setLoading(false);
                }
            })
        }
    }
    return (
            <CForm className="row g-4" onSubmit={handleSumbit}>
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
                    {sections?.map((section,index1)=>(
                        <div style={{margin:"0 20px"}} key={index1}>
                            <p>Section "{section?.title[lang]}":</p>
                                <div style={{display:"flex"}}>
                                    <div>
                                        <img src={section.img} style={{width:"200px"}}/>
                                    </div>
                                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                        <Button
                                            style={{backgroundColor:"#3A5BFF",margin:"10px 0"}}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload image
                                            <VisuallyHiddenInput id={section.index} onChange={handleChangeUpload} type="file" />
                                        </Button>
                                        <div>
                                            <CategorySelector index={section.index} passSelectedCat={handleCatIsSelected}/>
                                            <CFormInput value={section?.title[lang]} name="title" type="text" id="inputTitle" disabled/>
                                            <CFormInput value={section?.ref} name="ref" type="text" id="inputTitle" disabled/>
                                        </div>
                                    </div>
                                </div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center",margin:"20px 0"}}>
                            
                            {section.prods.map((prod,index2)=>(
                                <div style={{width:"100px",display:"flex",flexDirection:"column",justifyContent:"space-between"}} key={index2}>
                                    <div>
                                        <img style={{width:"100%"}} src={prod.img}/>
                                        <p>{prod.title[lang]}</p>
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