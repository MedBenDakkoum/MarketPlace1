import React,{useState,useEffect} from 'react'
import {CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody,CForm,CCol,CFormSelect,CFormInput} from '@coreui/react';
import "react-datepicker/dist/react-datepicker.css";
import { CButton } from '@coreui/react';
import Switch from 'react-switch';
import { useParams } from 'react-router-dom';

const images = [
  {
      id:"24",
      img:"https://etajer.com.tn/1/image1.jpg",
      cover:true,    
  },
  {
      id:"25",
      img:"https://etajer.com.tn/2/image2.jpg",
      cover:false
  }
]

function MpSingleSellerProduct() {
  const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = images.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell><img className="single-product-mp-img" src={element.img}/></CTableDataCell>
                <CTableDataCell><Switch onChange={()=>{}} checked={element.cover} /></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
  const initialProduct = {
    price:40
  }
  const [type,setType] = useState("percentage");
  const [addedPrice,setAddedPrice] = useState(0);
  const [newPrice,setNewPrice] = useState(0);
  const params = useParams();
  const handleChangeAddedPrice = (e)=>{
    if(isNaN(parseFloat(e.target.value))){
      setAddedPrice(0);
    }else{
      setAddedPrice(parseFloat(e.target.value));
    }
  }
  const handleChangeType = (e)=>{
    setType(e.target.value);
  }
  useEffect(function(){
    if(type=="percentage"){
      setNewPrice(initialProduct.price+((addedPrice*initialProduct.price)/100));
    }else{
      setNewPrice(addedPrice+initialProduct.price)
    }
  },[addedPrice,setAddedPrice])
  useEffect(function(){
    if(type=="percentage"){
      setNewPrice(initialProduct.price+((addedPrice*initialProduct.price)/100));
    }else{
      setNewPrice(addedPrice+initialProduct.price)
    }
  },[type,setType])
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Product "{params.pid}" of Seller "{params.sid}"</h3>
        </div>
        <div className="product-info-container">
          <div className="added-price">
              <CForm className="row g-3">
                <CCol md={12}>
                  <h1>Added Price:</h1>
                    <CCol md={6}>
                        <label>Type: </label><br/>
                        <CFormSelect onChange={handleChangeType} name="addedPriceType" value={type} size="lg" className="mb-3">
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                            <CFormInput onChange={handleChangeAddedPrice} value={addedPrice} name="addedPriceDetails" type="text" id="addedPrice" label="How much?" />
                    </CCol>
                    <CCol md={6}>
                            <CFormInput value={newPrice} name="totalPrice" type="text" id="addedPrice" label="Total Price" disabled/>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
          </div>
        </div>
        <div className="product-info-container">
          <div className="added-price">
            <CForm className="row g-3">
              <CCol md={8}>
              <h1>Added Images:</h1>
                  <CCol md={12}>
                      <CFormInput name="profilePicture" type="file" label="Add picture"/>
                      <CButton type="button">Add </CButton>
                  </CCol>
                  <CCol md={12}>
                      <CTable>
                          <CTableHead>
                              <CTableRow color='light'>
                                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                  <CTableHeaderCell scope="col">Cover</CTableHeaderCell>
                              </CTableRow>
                          </CTableHead>
                          <CTableBody>
                              {rows}
                          </CTableBody>
                      </CTable>
                  </CCol>
                  <CCol xs={12}>
                      <CButton type="submit">Save</CButton>
                  </CCol>
              </CCol>
            </CForm>
          </div>
        </div>
        
    </main>
  )
}

export default MpSingleSellerProduct;