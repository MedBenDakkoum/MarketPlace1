import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CButton} from '@coreui/react';
import {updateSeller,getSellerById} from '../../../services/adminService'


function MpSellerEditSocial() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        facebook:"",
        twitter:"",
        youtube:"",
        instagram: ""
    });
    // const [subscription, setSubscription] = useState({isActive:false});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setData({
                facebook:seller.socials.facebook || "",
                twitter:seller.socials.twitter || "",
                youtube:seller.socials.youtube || "",
                instagram: seller.socials.instagram || ""
            });
            // setSubscription(seller.subscription);
        }
        initialise();
        setLoading(false);
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {seller:{socials:{...data}}}
        updateSeller(params.id,newData)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
        console.log(newData);
    }
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={12}>
                    <CCol md={6}>
                            <CFormInput onChange={handleChange} name="facebook" value={data.facebook} type="text" id="inputFacebookId" label="Facebook id" />
                    </CCol>
                    <CCol md={6}>
                            <CFormInput onChange={handleChange} name="twitter" value={data.twitter} type="text" id="inputTwitterId" label="Twitter id" />
                    </CCol>
                    <CCol md={6}>
                            <CFormInput onChange={handleChange} name="youtube" value={data.youtube} type="text" id="inputYoutubeId" label="Youtube id" />
                    </CCol>
                    <CCol md={6}>
                            <CFormInput onChange={handleChange} name="instagram" value={data.instagram} type="text" id="inputInstagramId" label="Instagram id" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpSellerEditSocial};