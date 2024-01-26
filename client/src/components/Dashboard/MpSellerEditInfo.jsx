import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../services/sellerData';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller} from '../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';


function MpSellerEditInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        isActive:false,
        gender:"",
        avatar:"",
        balance: 0,
        paymentMethods: [],
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
        idStore: "",
        createdAt: "",
        updatedAt: "",
        userId: 0,
});
    const [address, setAddress] = useState({
        line1:"",
        line2:"",
        country:"",
        state:"",
        zipCode:"",
        city:""
    });
    const [store, setStore] = useState({
        categories: [],
        products: [],
        orders: [],
        isPublic: false,
        _id: "",
        title: "",
        createdAt: "",
        updatedAt: "",
        link: "",
        __v: 0
    });
    // const [subscription, setSubscription] = useState({isActive:false});
    const params = useParams();
    const [categoriesList,setCategories]= useState([
        { key: "Shoes", cat: "Group 1" },
        { key: "Electronics", cat: "Group 1" },
        { key: "Shirts", cat: "Group 1" },
      ]);
    const [selectedCategories,setSelectedCategories]= useState([
      ]);
    const addCategorie = (selectedList, selectedItem)=> {
        setSelectedCategories([...selectedCategories,selectedItem]);
    }
    const removeCategorie = (selectedList, selectedItem)=> {
        setSelectedCategories(selectedCategories.filter(function(item) {
            return item !== selectedItem
        }))
        let arr=selectedCategories;
        for (let i = 0; i < arr.length; i++) { 
            if ((arr[i].key === selectedItem.key) && (arr[i].cat === selectedItem.cat)) { 
                arr.splice(i, 1); 
            } 
        }
        setSelectedCategories(arr);


    }
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setSelectedCategories(seller.store.categories.map((e)=> (
                {key:e,cat:"Group 1"}
            )));
            setData({
                isActive:seller.isActive,
                gender:seller.gender,
                avatar:seller.avatar,
                balance: seller.balance,
                paymentMethods: seller.paymentMethods,
                _id: seller._id,
                name: seller.name,
                email: seller.email,
                phoneNumber: seller.phoneNumber,
                idStore: seller.idStore,
                createdAt: seller.createdAt,
                updatedAt: seller.updatedAt,
                userId: seller.userId,
            });
            setAddress(seller.address);
            setStore(seller.store);
            // setSubscription(seller.subscription);
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleChangeStore = (e) => {
        const { name, value } = e.target;
        setStore({ ...store, [name]: value });
    }
    const handleChangeAddress = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        store.categories = getCats();
        let newData = {...data,store:store,address:address}
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
    const handleChangeOfIsActive = (e) => {
        setData({ ...data, isActive: !data.isActive })
    }
    const handleChangeOfStoreIsPublic = (e) => {
        setStore({ ...store, isPublic: !store.isPublic })
    }
    const getCats = ()=> {
        let c=[];
        selectedCategories.forEach(function(e){
            c.push(e.key);
        })
        return c;
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>

                <CCol md={8}>
                    <CCol md={12}>
                        <Switch onChange={handleChangeOfIsActive} checked={data.isActive} />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="title" onChange={handleChangeStore} type="text" value={store.title} id="inputStoreName" label="Store Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="link" onChange={handleChangeStore} type="text" value={store.link} id="inputStoreLink" label="Store Link" />
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
                        id="exampleFormControlTextarea1"
                        label="Example textarea"
                        rows={3}
                        text="Must be 8-20 words long."
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