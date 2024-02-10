import { useState, useContext, useEffect } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addSeller } from "../../services/adminService";
import "../Register/Register.css";
import { Context } from "../../ContextStore";
import { Multiselect } from "multiselect-react-dropdown";

function AddSeller({ navigate }) {
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const { userData } = useContext(Context);

  const [categoriesList, setCategories] = useState([
    { key: "Shoes", cat: "Group 1" },
    { key: "Electronics", cat: "Group 1" },
    { key: "Shirts", cat: "Group 1" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [sellerFormData, setSellerFormData] = useState({
    name: "",
    gender: "male",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
    storeName: "",
    isSeller: true,
    categories: [],
    line1: "",
    line2: "",
    zipcode: "",
    city: "",
    country: "",
    state: "",
  });

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerFormData({ ...sellerFormData, [name]: value });
  };

  const getCats = () => {
    let cats = [];
    selectedCategories.forEach(function (e) {
      cats.push(e.key);
    });
    return cats;
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sellerFormData["categories"] = getCats();
    addSeller(sellerFormData)
      .then((res) => {
        if (!res.error) {
          // navigate("/");
          setLoading(false);
        } else {
          setLoading(false);
          setError(res.error);
          setAlertShow(true);
        }
      })
      .catch((err) => console.error("error from register: ", err));
    console.log(sellerFormData);
  };

  const addCategorie = (selectedList, selectedItem) => {
    setSelectedCategories([...selectedCategories, selectedItem]);
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Add Seller</h3>
      </div>
      <div className="container auth-form">
        <Form className="col-lg-8" onSubmit={handleSellerSubmit}>
          {alertShow && (
            <Alert
              variant="danger"
              onClose={() => setAlertShow(false)}
              dismissible
            >
              <p>{error}</p>
            </Alert>
          )}
          <Form.Row>
            <Form.Group controlId="forName" className="col-lg-8">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={sellerFormData.name}
                placeholder="Ivan Ivanov"
                onChange={handleSellerChange}
                required
              />
              <Form.Text muted>
                The name can be your real one or a username.
              </Form.Text>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formGridGender"
              className="col-lg-4"
            >
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={sellerFormData.gender}
                name="gender"
                onChange={handleSellerChange}
              >
                <option>male</option>
                <option>female</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-12">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={sellerFormData.phoneNumber}
                placeholder="+359888888888"
                onChange={handleSellerChange}
                required
              />
              <Form.Text muted>
                Phone Number should be a valid BG number.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-8">
              <Form.Label>Store name *</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={sellerFormData.storeName}
                placeholder="Adidas"
                onChange={handleSellerChange}
                required
              />
              <Form.Text muted>Store name must be unique.</Form.Text>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formGridGender"
              className="col-lg-4"
            >
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
              <Form.Control
                type="text"
                name="line1"
                placeholder="Line 1"
                value={sellerFormData.line1}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-12">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="line2"
                placeholder="Line 2"
                value={sellerFormData.line2}
                onChange={handleSellerChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-6">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={sellerFormData.country}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-lg-6">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                value={sellerFormData.state}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-6">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={sellerFormData.city}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-lg-6">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={sellerFormData.zipcode}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicEmail" className="col-lg-12">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ivan@abv.bg"
                value={sellerFormData.email}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicPassword" className="col-lg-6">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={sellerFormData.password}
                onChange={handleSellerChange}
                required
              />
              <Form.Text muted>
                Your password must be 8-20 characters long
              </Form.Text>
            </Form.Group>
            <Form.Group className="col-lg-6">
              <Form.Label>Reepeat Password *</Form.Label>
              <Form.Control
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                value={sellerFormData.repeatPassword}
                onChange={handleSellerChange}
                required
              />
            </Form.Group>
          </Form.Row>

          {loading ? (
            <Button className="col-lg-12 btnAuth" variant="dark" disabled>
              Please wait... <Spinner animation="border" />
            </Button>
          ) : (
            <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
              Add Seller
            </Button>
          )}
        </Form>
      </div>
    </main>
  );
}

export default AddSeller;
