import { useState, useContext,useEffect, useRef } from 'react';
import { Form, Button, Col, Spinner, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCart, registerUser } from '../services/userData';
import { getCategories } from '../services/publicData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';
import {Context} from '../ContextStore';
import MultiSelect from "../components/MultiSelect";
import {getLocationCountry,getLocationStates,getStateCities,emailInUse} from '../services/publicData'
import Select from 'react-select'
import Alert from '../components/Alert/Alert';
import { getSettings } from '../services/settingsService';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

function Register({ navigate }) {
    const { t } = useTranslation();
    const lang = localStorage.getItem("lang");
    const selectCityRef =useRef();
    const [termsAccepted,setTermsAccepted] = useState(false);
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({});
    const [locationCountry,setLocationCountry] = useState("");
    const [locationStates,setLocationStates] = useState([]);
    const [locationCitiesData,setLocationCitiesData] = useState([]);
    const [locationCities,setLocationCities] = useState([]);
    const [locationZipCode,setLocationZipCode] = useState("");
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isClientFormVisible, setClientFormVisible] = useState(true);
    const { userData } = useContext(Context);
    const [categoriesList,setCategories]= useState([]);
    const [selectedCategories,setSelectedCategories]= useState([]);
    
    const handleAcceptTerms = (e)=>{
        setTermsAccepted(!termsAccepted);
    }
    const hasNoParent = (cat,cats)=>{
        let i = 0;
        while(i < cats.length){
            if(cats[i].parent && cat.reference === cats[i].parent){
                return false;
            }
            i++;
        }
        return true;
    }
        // cats.forEach(function(single){
        //     if(single.parent==cat.reference){    
        //     }
        //     i++;
        // })
    
    useEffect(function(){
        async function init(){
            await getLocationCountry().then(function(country){
                setLocationCountry(country.Country)
            });
            await getLocationStates().then(function(states){
                let sts=[]
                let i=0;
                states.forEach(function(state){
                    sts.push({value:state,label:state})
                    if(i==states.length-1){
                        setLocationStates(sts);
                    }
                    i++;
                })
            });
            await getCategories().then(function(cats){
                let i = 0;
                let newCats = [];
                cats.forEach(function(cat){
                    if(hasNoParent(cat,cats)){
                        newCats.push({ value: cat.reference, label: cat.name[lang] });
                    }
                    if(i==cats.length-1){
                        setCategories(newCats);
                    }
                    i++;
                })
            })
            await getSettings().then(function(setts){
                setSettings(setts);
            })
        }
        init()
    },[])
    const [clientFormData, setClientFormData] = useState({
        name: "",
        gender: "male",
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: "",
        isSeller: false,
        line1:"",
        line2:"",
        zipcode:"",
        city:"",
        country:"",
        state:""
    });
    const [sellerFormData, setSellerFormData] = useState({
        name: "",
        gender: "male",
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: "",
        storeName: "",
        isSeller: true,
        categories: [],
        line1:"",
        line2:"",
        zipcode:"",
        city:"",
        country:"",
        state:"",
        supplierUsername:"",
        supplierPassword:"",
        supplierSecretKey:"",
        sellerType:"personal",
        RNE:"",
        matriculeFiscale:""
    });
    // const handleChanges = (e) => {
    //     e.preventDefault();
    //     setUserData({ ...userData, [e.target.name]: e.target.value });
    // }
    const handleClientChange = async (e) => {
        const { name, value } = e.target;
        setErrors({...errors,[name]:[]})
        let errs = []
        switch(name){
            case "password":
                
                if(value.length<8){
                    errs.push("Password length must be 8 or over");
                }
                if(!(/\d/.test(value))){
                    errs.push("Password must contain a number");
                }
                if(!(/[A-Z]/.test(value))){
                    errs.push("Password must contain at least 1 uppercase character");
                }
                if(!(/[a-z]/.test(value))){
                    errs.push("Password must contain at least 1 lowercase character");
                }
                break;
            case "repeatPassword":
                if(value!==clientFormData.password){
                    errs.push("Repeated password must be identical to the password");
                }
                break;
            case "email":
                if(!emailIdValid(value)){
                    errs.push("Email is not in valid format");
                }
                if(errs.length==0){
                    await emailInUse(value).then(function(emailInUse){
                        if(!emailInUse.available){
                            errs.push("This Email id is already registered")
                        }
                    });
                }
                break;
            case "phoneNumber":
                if(value.length!==8){
                    errs.push("Phone number should be 8 digits");
                }
                if(value.match(/^[0-9]+$/) == null){
                    errs.push("Phone number must only contain numbers");
                }
                break;
            default:
                break;
        }
        setErrors({...errors,[name]:errs})
        setClientFormData({ ...clientFormData, [name]: value });
      };
      const emailIdValid = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      const handleChangeCity = async (e)=>{
        let i=0;
        if(e){
            setSellerFormData({...sellerFormData,city:e.value});
            setClientFormData({...clientFormData,city:e.value});
            locationCitiesData.forEach(function(singleCity){
                if(e.value==Object.keys(singleCity)[0]){
                    setLocationZipCode(singleCity[e.value]);
                }
                i++;
            })
        }
      }
      useEffect(function(){
        setSellerFormData({...sellerFormData,zipcode:locationZipCode});
        setClientFormData({...clientFormData,zipcode:locationZipCode});
      },[locationZipCode,setLocationZipCode])

      useEffect(function(){
        console.log("Country: ");
        console.log(locationCountry);
        setSellerFormData({...sellerFormData,country:locationCountry});
        setClientFormData({...clientFormData,country:locationCountry});
      },[locationCountry,setLocationCountry])

      const handleChangeState = async (e)=>{
        selectCityRef.current.clearValue();
        setLocationZipCode("");
        setLocationCities([]);
        await getStateCities(e.value).then(function(cities){
            setLocationCitiesData(cities);
            let cts=[]
            let i=0;
            cities.forEach(function(city){
                cts.push({value:Object.keys(city)[0],label:Object.keys(city)[0]})
                if(i==cities.length-1){
                    setLocationCities(cts);
                }
                i++;
            })
        });
        setSellerFormData({...sellerFormData,state:e.value})
        setClientFormData({...clientFormData,state:e.value})
      }
      const handleSellerChange = async (e) => {
        const { name, value } = e.target;
        setErrors({...errors,[name]:[]})
        let errs = []
        switch(name){
            case "password":
                
                if(value.length<8){
                    errs.push("Password length must be 8 or over");
                }
                if(!(/\d/.test(value))){
                    errs.push("Password must contain a number");
                }
                if(!(/[A-Z]/.test(value))){
                    errs.push("Password must contain at least 1 uppercase character");
                }
                if(!(/[a-z]/.test(value))){
                    errs.push("Password must contain at least 1 lowercase character");
                }
                break;
            case "repeatPassword":
                if(value!==sellerFormData.password){
                    errs.push("Repeated password must be identical to the password");
                }
                break;
            case "email":
                if(!emailIdValid(value)){
                    errs.push("Email is not in valid format");
                }
                if(errs.length==0){
                    await emailInUse(value).then(function(emailInUse){
                        if(!emailInUse.available){
                            errs.push("This Email id is already registered")
                        }
                    });
                }
                break;
            case "phoneNumber":
                if(value.length!==8){
                    errs.push("Phone number should be 8 digits");
                }
                if(value.match(/^[0-9]+$/) == null){
                    errs.push("Phone number must only contain numbers");
                }
                break;
            default:
                break;
        }
        setErrors({...errors,[name]:errs})
        setSellerFormData({ ...sellerFormData, [name]: value });
      };

      const handleClientSubmit = (e) => {
        e.preventDefault();
        if(termsAccepted){
            setLoading(true);
            registerUser(clientFormData)
                .then(res => {
                    if (!res.error) {
                        navigate('/auth/login')
                    } else {
                        setLoading(false);
                        setError(res.error);
                    }
                }).catch(err => console.error('error from register: ', err))
        }else{
            setAlert({msg:"Terms and conditions must be accepted !"+" !",type:"fail",refresh:!alert.refresh})
        }
      };
      const getCats = () => {
        let cats = [];
        selectedCategories.forEach(function(e){
            cats.push(e.value);
        })
        return cats;
      }
      const handleSellerSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("country: ");
        console.log(locationCountry);
        sellerFormData["categories"] = getCats();
        sellerFormData["country"] = locationCountry;
        registerUser(sellerFormData)
            .then(res => {
                if(res.errors){
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        html: res.errors.map((msg)=>(msg+"<br>")),
                    });
                }else{
                    navigate('/auth/login')
                }
            }).catch(err => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    html: err.errors.map((msg)=>(msg+"<br>")),
                });
            })
      };
      const toggleForm = (e) => {
        e.preventDefault();
        setClientFormVisible(!isClientFormVisible);
      };
      const changeToClientForm = (e) => {
        e.preventDefault();
        setClientFormVisible(true);
      };
      const changeToSellerForm = (e) => {
        e.preventDefault();
        setClientFormVisible(false);
      };
      
    useEffect(()=>{
        setErrors({});
        setLocationCities([]);
        setLocationZipCode([]);
        setLocationCitiesData([]);
        // selectCityRef.current.clearValue();
        setClientFormData({
            name: "",
            gender: "male",
            phoneNumber: '',
            email: "",
            password: "",
            repeatPassword: "",
            isSeller: false,
            line1:"",
            line2:"",
            zipcode:"",
            city:"",
            country:"",
            state:""

        });
        setSellerFormData({
            name: "",
            gender: "male",
            phoneNumber: '',
            email: "",
            password: "",
            repeatPassword: "",
            storeName: "",
            isSeller: true,
            categories: [],
            line1:"",
            line2:"",
            zipcode:"",
            city:"",
            country:"",
            state:"",
            supplierUsername:"",
            supplierPassword:"",
            supplierSecretKey:"",
            sellerType:"personal",
            RNE:"",
            matriculeFiscale:""
        });
    },[isClientFormVisible,setClientFormVisible])
    // const addCategorie = (selectedList, selectedItem)=> {
    //     setSelectedCategories([...selectedCategories,selectedItem]);
    // }
    const handleChangeCategorie = (selectedList)=> {
        setSelectedCategories([...selectedList]);
    }
    return (
        <>
        {!userData? <>            
            <div className="container auth-form">
                <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
                <h1 className="auth-heading">{t('SignUp')}</h1>
                <div className="toggle-button">
                    <Button variant="primary" size="lg" onClick={changeToClientForm}>
                        {t('Client')}
                    </Button>
                    {settings?.AllowNewSellers?
                    <Button variant="primary" size="lg" onClick={changeToSellerForm}>
                        {t('Seller')}
                    </Button>
                    : ""}
                </div>
                {!isClientFormVisible?
                <Form className="col-lg-8" onSubmit={handleSellerSubmit}>
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-12">
                            <Form.Label>{t('AccountType')} *</Form.Label>
                            <Form.Control as="select" name="sellerType" onChange={handleSellerChange}>
                                <option value="personal" selected>{t('Personal')}</option>
                                <option value="business">{t('Business')}</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {sellerFormData.sellerType=="business"?
                    <>
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-6">
                            <Form.Label>{t('RNE')} *</Form.Label>
                            <Form.Control type="text" name="RNE" value={sellerFormData.RNE} placeholder={t('EnterRNE')} onChange={handleSellerChange} required />
                        </Form.Group>
                        <Form.Group controlId="forName" className="col-lg-6">
                            <Form.Label>{t('TaxNumber')} *</Form.Label>
                            <Form.Control type="text" name="matriculeFiscale" value={sellerFormData.matriculeFiscale} placeholder={t('EnterTaxNumber')} onChange={handleSellerChange} required />
                        </Form.Group>
                        </Form.Row>
                            <Form.Row>
                            <Form.Group controlId="forName" className="col-lg-12">
                                <Form.Label>{t('BusinessName')} *</Form.Label>
                                <Form.Control type="text" name="name" value={sellerFormData.name} placeholder="Ivan Ivanov" onChange={handleSellerChange} required />
                            </Form.Group>
                        </Form.Row>
                    </>
                    : <Form.Row>
                    <Form.Group controlId="forName" className="col-lg-8">
                        <Form.Label>{t('Name')} *</Form.Label>
                        <Form.Control type="text" name="name" value={sellerFormData.name} placeholder="Ivan Ivanov" onChange={handleSellerChange} required />
                        <Form.Text muted>
                            {t('NameCanBeRealOrUsername')}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                        <Form.Label>{t('Gender')} *</Form.Label>
                        <Form.Control as="select" name="gender" onChange={handleSellerChange}>
                            <option selected>{t('Male')}</option>
                            <option>{t('Female')}</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                    }
                    
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>{t('PhoneNumber')} *</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    +216
                                </InputGroup.Text>
                                <Form.Control type="text" name="phoneNumber"  value={sellerFormData.phoneNumber} placeholder="26456789" onChange={handleSellerChange} required />
                            </InputGroup>
                            <Form.Text className='field-errors'>
                                {errors?.phoneNumber?.map((e)=>(
                                    <p style={{color:"red"}}>* {e}</p>
                                ))}
                            </Form.Text>
                            <Form.Text muted>
                                {t('PhoneNumberShouldBeValid')}
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-8">
                            <Form.Label>{t('StoreName')} *</Form.Label>
                            <Form.Control type="text" name="storeName" value={sellerFormData.storeName} placeholder="Adidas" onChange={handleSellerChange} required />
                            <Form.Text muted>
                                {t('StoreNameMustBeUnique')}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>{t('Categories')} *</Form.Label>
                            <MultiSelect
                                key="example_id"
                                options={categoriesList}
                                onChange={handleChangeCategorie}
                                value={selectedCategories}
                                isSelectAll={true}
                                menuPlacement={"bottom"}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('EttajerUsername')} *</Form.Label>
                            <Form.Control type="text" name="supplierUsername" placeholder={t('EttajerUsername')} value={sellerFormData.supplierUsername} onChange={handleSellerChange} required />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('EttajerPassword')} *</Form.Label>
                            <Form.Control type="text" name="supplierPassword" placeholder={t('EttajerPassword')} value={sellerFormData.supplierPassword} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>{t('EttajerSecretKey')} *</Form.Label>
                            <Form.Control type="text" name="supplierSecretKey" placeholder={t('EttajerSecretKey')} value={sellerFormData.supplierSecretKey} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>{t('AddressLine1')} *</Form.Label>
                            <Form.Control type="text" name="line1" placeholder={t('AddressLine1')} value={sellerFormData.line1} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>{t('AddressLine2')}</Form.Label>
                            <Form.Control type="text" name="line2" placeholder={t('AddressLine2')} value={sellerFormData.line2} onChange={handleSellerChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('Country')} *</Form.Label>
                            <Form.Control type="text" name="country" placeholder={t('Country')} value={locationCountry} required disabled/>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('State')} *</Form.Label>
                            <Select options={locationStates} name="state" onChange={handleChangeState}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('City')} *</Form.Label>
                            <Select ref={selectCityRef} options={locationCities} name="city" onChange={handleChangeCity}/>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>{t('ZipCode')} *</Form.Label>
                            <Form.Control type="text" name="zipcode" placeholder={t('ZipCode')} value={locationZipCode} required disabled/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>{t('EmailAddress')} *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ivan@email.com" value={sellerFormData.email} onChange={handleSellerChange} required />
                            <Form.Text className='field-errors'>
                                {errors?.email?.map((e)=>(
                                    <p style={{color:"red"}}>* {e}</p>
                                ))}
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-12">
                            <Form.Label>{t('Password')} *</Form.Label>
                            <Form.Control type="password" name="password" placeholder={t('Password')} value={sellerFormData.password} onChange={handleSellerChange} required />
                            <Form.Text className='field-errors'>
                                {errors?.password?.map((e)=>(
                                    <p style={{color:"red"}}>* {e}</p>
                                ))}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-12">
                            <Form.Label>{t('RepeatPassword')} *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder={t('RepeatPassword')} value={sellerFormData.repeatPassword} onChange={handleSellerChange} required />
                        </Form.Group>
                        <Form.Text className='field-errors'>
                                {errors?.repeatPassword?.map((e)=>(
                                    <p style={{color:"red"}}>* {e}</p>
                                ))}
                        </Form.Text>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                        <Form.Check 
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={handleAcceptTerms}
                            label={t('I agree to the terms and conditions as set out by the user agreement.')}
                        />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            {t('PleaseWait')} <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">{t('SignUp')}</Button>
                    }
    
                    <p className="bottom-msg-paragraph">{t('Already have an account?')} <Link to="/auth/login">{t('SignIn')}</Link>!</p>
                </Form>
                :
                <Form className="col-lg-8" onSubmit={handleClientSubmit}>
                <Form.Row>
                    <Form.Group controlId="forName" className="col-lg-8">
                        <Form.Label>{t("Name")} *</Form.Label>
                        <Form.Control type="text" name="name" value={clientFormData.name} placeholder="Ivan Ivanov" onChange={handleClientChange} required />
                        <Form.Text muted>
                            {t("NameCanBeRealOrUsername")}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                        <Form.Label>{t('Gender')} *</Form.Label>
                        <Form.Control as="select" name="gender" value={clientFormData.gender} onChange={handleClientChange} required>
                            <option>{t('Male')}</option>
                            <option>{t('Female')}</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-lg-12">
                        <Form.Label>{t('PhoneNumber')} *</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                +216
                            </InputGroup.Text>
                            <Form.Control type="text" name="phoneNumber"  value={clientFormData.phoneNumber} placeholder="26456789" onChange={handleClientChange} required />
                        </InputGroup>
                        <Form.Text className='field-errors'>
                            {errors?.phoneNumber?.map((e)=>(
                                <p style={{color:"red"}}>* {e}</p>
                            ))}
                        </Form.Text>
                        <Form.Text muted>
                            {t('PhoneNumberShouldBeValid')}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-lg-12">
                        <Form.Label>{t('AddressLine1')} *</Form.Label>
                        <Form.Control type="text" name="line1" placeholder={t('AddressLine1')} value={clientFormData.line1} onChange={handleClientChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-lg-12">
                        <Form.Label>{t('AddressLine2')}</Form.Label>
                        <Form.Control type="text" name="line2" placeholder={t('AddressLine2')} value={clientFormData.line2} onChange={handleClientChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-lg-6">
                        <Form.Label>{t('Country')} *</Form.Label>
                        <Form.Control type="text" name="country" placeholder={t('Country')} value={locationCountry} required disabled/>
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                        <Form.Label>{t('State')} *</Form.Label>
                        {/* <Form.Control type="text" name="state" placeholder="State" value={sellerFormData.state} onChange={handleSellerChange} required /> */}
                        <Select options={locationStates} name="state" onChange={handleChangeState}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-lg-6">
                        <Form.Label>{t('City')} *</Form.Label>
                        {/* <Form.Control type="text" name="city" placeholder="City" value={clientFormData.city} onChange={handleClientChange} required /> */}
                        <Select ref={selectCityRef} options={locationCities} name="state" onChange={handleChangeCity}/>
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                        <Form.Label>{t('ZipCode')} *</Form.Label>
                        <Form.Control type="text" name="zipcode" placeholder="Zip Code" value={locationZipCode} onChange={handleClientChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formBasicEmail" className="col-lg-12">
                        <Form.Label>{t('EmailAddress')} *</Form.Label>
                        <Form.Control type="email" name="email" value={clientFormData.email} placeholder="ivan@email.com" onChange={handleClientChange} required />
                        <Form.Text className='field-errors'>
                            {errors?.email?.map((e)=>(
                                <p style={{color:"red"}}>* {e}</p>
                            ))}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formBasicPassword" className="col-lg-6">
                        <Form.Label>{t('Password')} *</Form.Label>
                        <Form.Control type="password" name="password" value={clientFormData.password} placeholder={t('Password')} onChange={handleClientChange} required />
                        <Form.Text muted>
                            Your password must be 8-20 characters long
                        </Form.Text>
                        <Form.Text className='field-errors'>
                            {errors?.password?.map((e)=>(
                                <p style={{color:"red"}}>* {e}</p>
                            ))}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                        <Form.Label>{t('RepeatPassword')} *</Form.Label>
                        <Form.Control type="password" name="repeatPassword" value={clientFormData.repeatPassword} placeholder={t('RepeatPassword')} onChange={handleClientChange} required />
                        <Form.Text className='field-errors'>
                            {errors?.repeatPassword?.map((e)=>(
                                <p style={{color:"red"}}>* {e}</p>
                            ))}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                    <Form.Check 
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={handleAcceptTerms}
                        label={t('I agree to the terms and conditions as set out by the user agreement.')}
                    />
                    </Form.Group>
                </Form.Row>

                {loading ?
                    <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                        {t('PleaseWait')} <Spinner animation="border" />
                    </Button>
                    :
                    <Button variant="dark" className="col-lg-12 btnAuth" type="submit">{t('SignUp')}</Button>
                }

                <p className="bottom-msg-paragraph">{t('Already have an account?')} <Link to="/auth/login">{t('SignIn')}</Link>!</p>
            </Form>
                }
            </div>
            </> : <h1>{t('Already Logged In')}</h1>}
        </>
    )
}    
export default Register;