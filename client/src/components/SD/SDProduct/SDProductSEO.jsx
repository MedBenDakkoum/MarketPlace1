import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CForm,CCol,CFormInput,CRow, CFormTextarea,CButton} from '@coreui/react';
import {getProductSeo,updateProductSeo} from "../../../services/dashboardService"
import { Spinner } from 'react-bootstrap';
import Alert from '../../Alert/Alert';

function SDProductSEO() {
    const navigate= useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
    const [data,setData] = useState({
        metaTitle:"",
        metaDescription:"",
        friendlyUrl:""
    });
    useEffect(function(){
        async function init(){
            let d = await getProductSeo(params.id);
            setData({
                metaTitle:d.seo?.metaTitle || "",
                metaDescription:d.seo?.metaDescription || "",
                friendlyUrl:d.seo?.friendlyUrl || ""
            });
        }
        init()
    },[])
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSumbit = async (e)=>{
        setLoading(true)
        e.preventDefault();
        let newData = {...data}
        console.log(newData)
        await updateProductSeo(params.id,newData).then(function(e){
            setLoading(false);
            setAlert({msg:"Saved successfully !",type:"success",refresh:!alert.refresh})
        }).catch(error => {
            setAlert({msg:error.message+" !",type:"fail",refresh:!alert.refresh})
          });
    }
    return (
        <div className="sd-singleproduct-section">
            <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
            {!loading?
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput value={data.metaTitle} onChange={handleChange} name="metaTitle" type="text" label="Meta title"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormTextarea value={data.metaDescription} onChange={handleChange} name="metaDescription" type="text" label="Meta description"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput value={data.friendlyUrl} onChange={handleChange} name="friendlyUrl" type="text" label="Friendly URL"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CButton type="submit">
                                Save
                            </CButton>
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
    );
}

export default SDProductSEO;
