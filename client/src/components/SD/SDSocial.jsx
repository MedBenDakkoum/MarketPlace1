import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormInput,CButton,CRow,CFormSelect} from '@coreui/react';
import {getSellerProfile,uploadImage,updateProfile}  from '../../services/dashboardService';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

function SDProfile() {
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({});
    useEffect(function(){
        async function initData(){
            let newUserData = await getSellerProfile();
            setData(newUserData.socials)
        }
        initData();
    },[])
    const handleChange = (e)=>{
        setData({...data,[e.target.name]: e.target.value})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        let newData = {
            socials:data
        }
        await updateProfile(newData)
        .then(updatedData => {
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Saved successfuly !",
                showConfirmButton: false,
                timer: 1000
            });          })
          .catch(error => {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: error.message,
            });
          });
        
    }
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Social</h1>
          </div>
          <div className="sd-section-main">
            {!loading?
            
          <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                                <CFormInput value={data?.facebook} onChange={handleChange} name="facebook" type="text" id="facebook" label="Facebook" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                                <CFormInput value={data?.twitter} onChange={handleChange} name="twitter" type="text" id="twitter" label="Twitter" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                                <CFormInput value={data?.youtube} onChange={handleChange} name="youtube" type="text" id="youtube" label="Youtube" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                                <CFormInput value={data?.instagram} onChange={handleChange} name="instagram" type="text" id="instagram" label="Instagram" />
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

export default SDProfile;
