import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import {updateCustomer,getCustomerById,uploadImage} from '../../../services/adminService'
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'

function CustomerEditImages() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [changedData,setChangedData] = useState({});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let customer = await getCustomerById(params.id);
            setData({
                avatar:customer.avatar,
                banner:customer.banner
            });
        }
        initialise();
        setLoading(false);
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {}
        for (const [key, value] of Object.entries(data)) {
            console.log(value);
            if(value!==undefined && value!=="" && value.startsWith("data:image")){
                await uploadImage(value).then((r,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(changedData);
                        console.log({[`${key}`]:r.url});
                        newData[`${key}`] = r.url
                    }
                })
            }
        }
        await updateCustomer(params.id,newData)
        .then(res => {
            console.log(newData);
            if (!res.error) {
                Swal.fire({
                    icon: "success",
                    title: "Images Updated !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setLoading(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: res.error.message,
                });
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
                    <CRow>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="avatar" type="file" label="Profile picture"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.avatar} label="File"></img>
                            </CCol>
                        </CCol>
                        <CCol>
                            <CCol md={12}>
                                <CFormInput onChange={handleChangeUpload} name="banner" type="file" label="Profile Banner"/>
                            </CCol>
                            <CCol md={12}>
                                <img className='multi-choice-img' src={data.banner} label="File"></img>
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

export {CustomerEditImages};