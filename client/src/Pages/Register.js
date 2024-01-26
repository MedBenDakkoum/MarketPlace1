import { useState, useContext,useEffect } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';
import {Context} from '../ContextStore';
import { Multiselect } from "multiselect-react-dropdown";


function Register({ navigate }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [isClientFormVisible, setClientFormVisible] = useState(true);
    const { userData } = useContext(Context);
        
    const [categoriesList,setCategories]= useState([
          { key: "Shoes", cat: "Group 1" },
          { key: "Electronics", cat: "Group 1" },
          { key: "Shirts", cat: "Group 1" },
        ]);
    const [selectedCategories,setSelectedCategories]= useState([
        ]);
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
        state:""
    });
    // const handleChanges = (e) => {
    //     e.preventDefault();
    //     setUserData({ ...userData, [e.target.name]: e.target.value });
    // }
    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientFormData({ ...clientFormData, [name]: value });
      };
    
      const handleSellerChange = (e) => {
        const { name, value } = e.target;
        setSellerFormData({ ...sellerFormData, [name]: value });
      };
      const handleClientSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(clientFormData)
            .then(res => {
                if (!res.error) {
                    navigate('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
      };
      const getCats = () => {
        let cats = [];
        selectedCategories.forEach(function(e){
            cats.push(e.key);
        })
        return cats;
      }
      const handleSellerSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        sellerFormData["categories"] = getCats();
        registerUser(sellerFormData)
            .then(res => {
                if (!res.error) {
                    navigate('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
      };
      const toggleForm = (e) => {
        e.preventDefault();
        setClientFormVisible(!isClientFormVisible);
      };
    useEffect(()=>{
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
            state:""
        });
    },[isClientFormVisible,setClientFormVisible])
    const addCategorie = (selectedList, selectedItem)=> {
        setSelectedCategories([...selectedCategories,selectedItem]);
    }
    return (
        <>
        {!userData? <>
            <SimpleSider />
            
            <div className="container auth-form">
                <div className="toggle-button">
                    <Button variant="primary" size="lg" onClick={toggleForm}>
                    Switch to {isClientFormVisible ? 'Seller' : 'Client'} Registration
                    </Button>
                </div>
                <h1 className="auth-heading">Sign Up</h1>
                {!isClientFormVisible?
                <Form className="col-lg-8" onSubmit={handleSellerSubmit}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" value={sellerFormData.name} placeholder="Ivan Ivanov" onChange={handleSellerChange} required />
                            <Form.Text muted>
                                The name can be your real one or a username.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" onChange={handleSellerChange}>
                                <option selected>male</option>
                                <option>female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber"  value={sellerFormData.phoneNumber} placeholder="+359888888888" onChange={handleSellerChange} required />
                            <Form.Text muted>
                                Phone Number should be a valid BG number.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-8">
                            <Form.Label>Store name *</Form.Label>
                            <Form.Control type="text" name="storeName" value={sellerFormData.storeName} placeholder="Adidas" onChange={handleSellerChange} required />
                            <Form.Text muted>
                                Store name must be unique.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Categories</Form.Label>
                            <Multiselect
                                options={categoriesList}
                                displayValue="key"
                                selectedValues={selectedCategories}
                                onSelect={addCategorie}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" name="line1" placeholder="Line 1" value={sellerFormData.line1} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" name="line2" placeholder="Line 2" value={sellerFormData.line2} onChange={handleSellerChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" placeholder="Country" value={sellerFormData.country} onChange={handleSellerChange} required />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" placeholder="State" value={sellerFormData.state} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" placeholder="City" value={sellerFormData.city} onChange={handleSellerChange} required />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" name="zipcode" placeholder="Zip Code" value={sellerFormData.zipcode} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ivan@abv.bg" value={sellerFormData.email} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={sellerFormData.password} onChange={handleSellerChange} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Reepeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" value={sellerFormData.repeatPassword} onChange={handleSellerChange} required />
                        </Form.Group>
                    </Form.Row>

                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
                </Form>
                :
                <Form className="col-lg-8" onSubmit={handleClientSubmit}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" value={clientFormData.name} placeholder="Ivan Ivanov" onChange={handleClientChange} required />
                            <Form.Text muted>
                                The name can be your real one or a username.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" value={clientFormData.gender} onChange={handleClientChange}>
                                <option>male</option>
                                <option>female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" value={clientFormData.phoneNumber} placeholder="+359888888888" onChange={handleClientChange} required />
                            <Form.Text muted>
                                Phone Number should be a valid BG number.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" name="line1" placeholder="Line 1" value={clientFormData.line1} onChange={handleClientChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" name="line2" placeholder="Line 2" value={clientFormData.line2} onChange={handleClientChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" placeholder="Country" value={clientFormData.country} onChange={handleClientChange} required />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" placeholder="State" value={clientFormData.state} onChange={handleClientChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" placeholder="City" value={clientFormData.city} onChange={handleClientChange} required />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" name="zipcode" placeholder="Zip Code" value={clientFormData.zipcode} onChange={handleClientChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" value={clientFormData.email} placeholder="ivan@abv.bg" onChange={handleClientChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" value={clientFormData.password} placeholder="Password" onChange={handleClientChange} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Reepeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" value={clientFormData.repeatPassword} placeholder="Repeat password" onChange={handleClientChange} required />
                        </Form.Group>
                    </Form.Row>

                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
                </Form>
                }
            </div>
            </> : <h1>Already Logged In</h1>}
        </>
    )
}

export default Register;