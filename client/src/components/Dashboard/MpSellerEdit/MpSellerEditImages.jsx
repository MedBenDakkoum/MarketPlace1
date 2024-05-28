import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CRow,CFormInput,CButton} from '@coreui/react';
import {updateSeller,uploadImage,getSellerById} from '../../../services/adminService'

function MpSellerEditImages() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        profileLogo:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706293645~exp=1706294245~hmac=67329a29784fe4ea70833e53c5d07b13a67fdeddf36249e8c391d068bcefae83",
        storeLogo:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706293645~exp=1706294245~hmac=67329a29784fe4ea70833e53c5d07b13a67fdeddf36249e8c391d068bcefae83",
        profileBanner:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706293645~exp=1706294245~hmac=67329a29784fe4ea70833e53c5d07b13a67fdeddf36249e8c391d068bcefae83",
        storeBanner: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706293645~exp=1706294245~hmac=67329a29784fe4ea70833e53c5d07b13a67fdeddf36249e8c391d068bcefae83",
    });
    
    // const [subscription, setSubscription] = useState({isActive:false});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setData({
                profileLogo:seller.avatar || "",
                storeLogo:seller.store.logo || "",
                profileBanner:seller.banner || "",
                storeBanner: seller.store.banner || "",
            });
        }
        initialise();
        setLoading(false);
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {...data}
        for (const [key, value] of Object.entries(newData)) {
            console.log(value);
            if(value!==undefined && value!=="" && value.startsWith("data:image")){
                await uploadImage(value).then((r,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        newData = {...newData,[`${key}`]:r.url}
                    }
                })
            }else{
                newData = {...newData,[`${key}`]:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1706293645~exp=1706294245~hmac=67329a29784fe4ea70833e53c5d07b13a67fdeddf36249e8c391d068bcefae83"}
            }
        }
        let dataToSend ={
            seller:{
                avatar:newData.profileLogo,
                banner:newData.profileBanner
            },
            store:{
                logo:newData.storeLogo,
                banner:newData.storeBanner
            }
        }
        updateSeller(params.id,dataToSend)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from updating: ', err))
        
    }
    const handleChangeUpload = (e)=>{
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])
    
        reader.onload = () => {
            setData({...data,[e.target.name]:reader.result})
        }

}

    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={12}>
                    <CRow>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="profileLogo" type="file" label="Profile picture"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.profileLogo} label="File"></img>
                            </CCol>
                        </CCol>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="storeLogo" type="file" label="Store Logo"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.storeLogo} label="File"></img>
                            </CCol>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="profileBanner" type="file" label="Profile Banner"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.profileBanner} label="File"></img>
                            </CCol>
                        </CCol>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="storeBanner" type="file" label="Store Banner"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.storeBanner} label="File"></img>
                            </CCol>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CButton type="submit">Save</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CForm>
  )
}

export {MpSellerEditImages};