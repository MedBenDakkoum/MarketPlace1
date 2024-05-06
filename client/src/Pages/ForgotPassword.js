import { useState, useContext } from 'react';
import { Context } from '../ContextStore';
import { sendPasswordReset } from '../services/userData'
import { CForm,CCol,CFormInput,CFormLabel,CFormText,CFormSelect, CRow, CButton} from '@coreui/react';
import { Link, Navigate } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const { userData,setUserData } = useContext(Context)

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendPasswordReset({email:email})
        .then((rslt)=>{
            Swal.fire({
                icon: "success",
                title: rslt,
                showConfirmButton: false,
                timer: 1500
              });
        })
        .catch((err)=>{
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
                                <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
                                <CFormInput onChange={handleChange} type="email" value={email} name='email' id="inputEmail" />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={12} className='align-items-center'>
                                <CButton type='submit'>Send</CButton>
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