import { useState, useContext } from 'react';
import { Context } from '../ContextStore';
import { doPasswordReset } from '../services/userData'
import { CForm,CCol,CFormInput,CFormLabel,CFormText,CFormSelect, CRow, CButton} from '@coreui/react';
import { Link, Navigate } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import {useParams} from 'react-router-dom';
import { useNavigate} from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");
    const { userData,setUserData } = useContext(Context)
    const params = useParams();
    const handleChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await doPasswordReset(params.userId,params.resetToken,{password:password})
        .then((rslt)=>{
            Swal.fire({
                icon: "success",
                title: rslt,
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(function(){
                navigate( "/auth/login") ;
              },1500);
        })
        .catch((err)=>{
            console.log(err);
            Swal.fire({
                icon: "warning",
                title: err.response.data,
                showConfirmButton: true
              });
        })
    }

    return (
        
        <>
            {!userData? <>
            <div className='forgot-password'>
                <CForm className="row g-6" onSubmit={handleSubmit}>
                    <CCol md={12}>
                        <CRow>
                            <CCol md={12} className='align-items-center'>
                                <CFormLabel htmlFor="inputPassword">New Password: </CFormLabel>
                                <CFormInput onChange={handleChange} type="password" value={password} name='password' id="inputPassowrd" />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={12} className='align-items-center'>
                                <CButton type='submit'>Reset</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CForm>
            </div>  
            </> : <h1>Already Logged In</h1>}
        </>
    )
}

export default ForgotPassword;