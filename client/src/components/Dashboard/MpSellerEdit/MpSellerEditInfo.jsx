import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';


function MpSellerEditInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        isActive:false,
        storeTitle:"",
        storeLink:"",
        name:"",
        email:"",
        phoneNumber:"",
        gender:"male",
        storeDescription:""
    });
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            let store = seller.store;
            setData({
                isActive:seller.isActive,
                storeTitle:store.title,
                storeLink:store.link,
                name:seller.name,
                email:seller.email,
                phoneNumber:seller.phoneNumber,
                gender:seller.gender,
                storeDescription:store.description
            });
            // setSubscription(seller.subscription);
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {
            seller:{
            isActive:data.isActive,
            name:data.name,
            email:data.email,
            phoneNumber:data.phoneNumber,
            gender:data.gender
        },
            store:{
            title:data.storeTitle,
            link:data.storeLink,
            description:data.storeDescription
        }}
        updateSeller(params.id,newData)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
    }
    const handleChangeOfIsActive = (e) => {
        setData({ ...data, isActive: !data.isActive })
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>

                <CCol md={8}>
                    <CCol md={12}>
                        <Switch onChange={handleChangeOfIsActive} checked={data.isActive} />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="storeTitle" onChange={handleChangeData} type="text" value={data.storeTitle} id="inputStoreName" label="Store Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="storeLink" onChange={handleChangeData} type="text" value={data.storeLink} id="inputStoreLink" label="Store Link" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="name" onChange={handleChangeData} type="text" value={data.name} id="inputName" label="Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="email" onChange={handleChangeData} type="email" value={data.email} id="inputEmail4" label="Email" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="phoneNumber" onChange={handleChangeData} type="text" value={data.phoneNumber} id="inputPhoneNumber" label="Phone Number" />
                    </CCol>
                    <CCol md={12}>
                        <CFormSelect onChange={handleChangeData} name="gender" size="lg" label="Gender" value={data.gender}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                        <CFormTextarea
                        onChange={handleChangeData}
                        value={data.storeDescription}
                        name='storeDescription'
                        id="exampleFormControlTextarea1"
                        label="Store Description"
                        rows={3}
                        ></CFormTextarea>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpSellerEditInfo};