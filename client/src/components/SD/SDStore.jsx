import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormInput,CButton,CRow, CFormTextarea} from '@coreui/react';
import {getStore,updateStore,uploadImage}  from '../../services/dashboardService';
import { Spinner } from 'react-bootstrap';
import Alert from '../Alert/Alert';


function SDStore() {
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
    const [data,setData] = useState({
      banner:"https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
      logo:"https://store.webkul.com/media/catalog/product/cache/1/image/260x260/9df78eab33525d08d6e5fb8d27136e95/p/r/prerstahsop-advance-mv-mp-thumbnail-260x260_1.png",
      title:"",
      link:"",
      businessEmail:"",
      description:"",
      isPublic:true,
  });
  useEffect(function(){
        async function initData(){
            setLoading(true);
            let store = await getStore();
            setData({
                banner: store.banner || "",
                logo: store.logo || "",
                title: store.title || "",
                link: store.link || "",
                businessEmail: store.businessEmail || "",
                description: store.description || "",
                isPublic: store.isPublic
            })
            setLoading(false);
        }
        initData()
  },[])
  const handleChange = (e)=>{
      setData({...data,[e.target.name]: e.target.value})
  }
  const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await updateStore(data)
        .then(updatedData => {
            setAlert({msg:"Saved successfuly!",type:"success",refresh:!alert.refresh})
          })
          .catch(error => {
            setAlert({msg:error.message+" !",type:"fail",refresh:!alert.refresh})
          });
        setLoading(false)
  }
  const handleTogglePrivacy = (e)=>{
    setData({...data,isPublic:!data.isPublic})
  }
  const handleChangeImage = (e)=>{
    setLoading(true);
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = async () => {
        await uploadImage(reader.result).then((r,err)=>{
            if(err){
                setAlert({msg:err.message+" !",type:"fail",refresh:!alert.refresh})
            }else{
                setData({...data, [e.target.name]: r.url});
                setAlert({msg:"Image uploaded !",type:"success",refresh:!alert.refresh})
            }
        })
        setLoading(false);
    }
}
    return (
      <main className="sd-container">
        <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
          <div className="sd-section-title">
            <h1>Store</h1>
          </div>
          <div className="sd-section-main">
          {!loading?
          <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12} style={{display:"flex",justifyContent:"flex-end"}}>
                            <CButton onClick={handleTogglePrivacy} type="button">
                            {data.isPublic? 
                              <>Make it private</>
                            : <>Make it public</> }
                            </CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput onChange={handleChangeImage} name="banner" type="file" id="storeBanner" label="Store Banner" />
                            <img className="store-banner-img" src={data.banner} alt="" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput onChange={handleChangeImage} name="logo" type="file" id="storeLogo" label="Store Logo" />
                            <img className="store-logo-img" src={data.logo} alt="" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                                <CFormInput value={data.title} onChange={handleChange} name="title" type="text" id="title" label="Title" />
                        </CCol>
                        <CCol md={12}>
                                <CFormInput value={data.link} onChange={handleChange} name="link" type="text" id="link" label="Link" disabled/>
                        </CCol>
                        <CCol md={12}>
                                <CFormInput value={data.businessEmail} onChange={handleChange} name="businessEmail" type="text" id="businessEmail" label="Business Email"/>
                        </CCol>
                        <CCol md={12}>
                                <CFormTextarea value={data.description} onChange={handleChange} name="description" type="text" id="description" label="Description"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CButton type="submit">Save</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CForm>
            :
            <div className="spinner">
                <Spinner animation="border" />
            </div> 
            }
          </div>
      </main>
    );
}

export default SDStore;
