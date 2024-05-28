import React,{useState,useEffect} from "react";
import { CForm,CCol,CFormInput,CButton,CRow,CFormSelect} from '@coreui/react';
import {uploadImage}  from '../../services/dashboardService';
import {getUserProfile,editUserProfile} from '../../services/userData'
import { Spinner } from 'react-bootstrap';
import Alert from '../Alert/Alert';

function CDProfile() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]= useState({
      msg:"",
      type:"",
      refresh:true
  })
  const [data,setData] = useState({
      name:"",
      gender:"male",
      phoneNumber:"",
      email:"",
      currentPass:"",
      newPass:"",
      reNewPass:"",
      line1:"",
      line2:"",
      zipCode:"",
      city:"",
      country:"",
      state:"",
      avatar:"",
      banner:""
  });
  useEffect(function(){
    async function initData(){
        let newUserData = await getUserProfile();
        setData({
            name:newUserData.name,
            gender:newUserData.gender,
            phoneNumber:newUserData.phoneNumber,
            email:newUserData.email,
            currentPass:"",
            newPass:"",
            reNewPass:"",
            line1:newUserData.address.line1,
            line2:newUserData.address.line2,
            zipCode:newUserData.address.zipCode,
            city:newUserData.address.city,
            country:newUserData.address.country,
            state:newUserData.address.state,
            avatar:newUserData.avatar || "",
            banner:newUserData.banner || "",
        })
    }
    initData();
},[])
  const handleChange = (e)=>{
    setData({...data,[e.target.name]: e.target.value})
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
const handleSumbit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    let newData = {
        name:data.name,
        gender:data.gender,
        phoneNumber:data.phoneNumber,
        email:data.email,
        password:{
            currentPass:data.currentPass,
            newPass:data.newPass,
            reNewPass:data.reNewPass
        },
        address:{
            line1:data.line1,
            line2:data.line2,
            zipCode:data.zipCode,
            city:data.city,
            country:data.country,
            state:data.state
        },
        avatar:data.avatar,
        banner:data.banner
    }
    await editUserProfile(newData)
    .then(updatedData => {
        setLoading(false);
        setAlert({msg:"Saved successfuly!",type:"success",refresh:!alert.refresh})
      })
      .catch(error => {
        setLoading(false);
       setAlert({msg:error.msg+" !",type:"fail",refresh:!alert.refresh})
      });;
    
}
  return (
    <section className='cd-section-container'>
        <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
        <div className="cd-section-title">
            <h1>Profile</h1>
        </div>
        {!loading?
            
            <CForm className="row g-3" onSubmit={handleSumbit}>
                  <CCol md={12}>
                      <CRow>
                          <CCol md={6}>
                                  <CFormInput value={data.name} onChange={handleChange} name="name" type="text" id="name" label="Name" />
                          </CCol>
                          <CCol md={6}>
                              <label htmlFor="genderID">Gender</label><br></br>
                              <CFormSelect value={data.gender} onChange={handleChange} id="genderID" name="gender" className="mb-3">
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                              </CFormSelect>
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={6}>
                              <CFormInput onChange={handleChangeImage} name="avatar" type="file" id="profilePicture" label="Profile Picture" />
                              <img className="seller-edit-img" src={data.avatar} alt="" />
                          </CCol>
                          <CCol md={6}>
                              <CFormInput onChange={handleChangeImage} name="banner" type="file" id="profileBanner" label="Profile Banner" />
                              <img className="seller-edit-img" src={data.banner} alt="" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" id="phoneNumber" label="Phone Number" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.line1} onChange={handleChange} name="line1" type="text" id="line1" label="Adress Line 1" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.line2} onChange={handleChange} name="line2" type="text" id="line2" label="Adress Line 2" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.zipCode} onChange={handleChange} name="zipCode" type="text" id="zipCode" label="Zip Code" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.city} onChange={handleChange} name="city" type="text" id="city" label="City" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.country} onChange={handleChange} name="country" type="text" id="country" label="Country" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.state} onChange={handleChange} name="state" type="text" id="state" label="State" />
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.email} onChange={handleChange} name="email" type="text" id="email" label="Email" />
                          </CCol>
                      </CRow>
                      <br/>
                      <CRow>
                          <CCol md={12}>
                              <h3>Password Change</h3>
                          </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={12}>
                                  <CFormInput value={data.currentPass} onChange={handleChange} name="currentPass" type="password" id="currentPass" label="Current Password" />
                          </CCol>
                          <CCol md={12}>
                                  <CFormInput value={data.newPass} onChange={handleChange} name="newPass" type="password" id="newPass" label="New Password"/>
                          </CCol>
                          <CCol md={12}>
                                  <CFormInput value={data.reNewPass} onChange={handleChange} name="reNewPass" type="password" id="reNewPass" label="Confirm New Password"/>
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
    </section>
  )
}

export default CDProfile