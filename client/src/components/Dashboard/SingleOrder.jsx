import React, { useState, useEffect } from "react";
import {
  CFormTextarea,
  CFormSelect,
  CFormInput,
  CButton,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableHead,
  CTableBody,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

const order = {
  info: {
    orderId: 1,
    ref: "IELTSWADE",
    newClient: true,
    customerName: "Customer 1",
    total: 214.99,
    paymentMethod: "On Delivery",
    status: "Delivered",
    date: "01-29-2024",
  },
  customer: {
    id: 1,
    name: "Customer 1",
    email: "customer1@gmail.com",
    registeredOn: "01-01-2024",
    completedOrders: 3,
    totalSpent: 140,
    address: {
      line1: "Address Line1",
      line2: "Address Line2",
      country: "Tunisia",
      state: "Monastir",
      city: "Monastir",
      zipCode: "5000",
    },
  },
  products: [
    {
      ref: "01234567",
      productName: "Shirt",
      price: 15.6,
      quantity: 1,
      total: 15.6,
    },
    {
      ref: "01234567",
      productName: "Pants",
      price: 35.5,
      quantity: 2,
      total: 71,
    },
  ],
  messages: [
    {
      messageSubject: "Delay",
      messageContent:
        "Unfortunately, an item on your order is currently out of stock. This may cause a slight delay in delivery.Please accept our apologies and rest assured that we are working hard to rectify this.",
      messageDate: "01-29-2024",
    },
    {
      messageSubject: "Delay",
      messageContent:
        "Unfortunately, an item on your order is currently out of stock. This may cause a slight delay in delivery.Please accept our apologies and rest assured that we are working hard to rectify this.",
      messageDate: "01-29-2024",
    },
  ],
};
const invoiceData = {
  date: "01/31/2024",
  document: "invoice",
  num: "#IN000003",
  amount: "40TND",
  note: "test",
};
function SingleOrder() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [inter, setInter] = useState("status");
  const [invoice, setInvoice] = useState({
    date: "",
    document: "",
    num: "",
    amount: "",
    note: "",
  });
  const [classes, setClasses] = useState({
    status: "active-bar",
    docs: "",
  });
  useEffect(() => {
    let rows1 = order.products.map((element, index) => (
      <CTableRow key={element.id} color="light">
        <CTableDataCell>#</CTableDataCell>
        <CTableDataCell>{element.ref}</CTableDataCell>
        <CTableDataCell>{element.productName}</CTableDataCell>
        <CTableDataCell>{element.price}</CTableDataCell>
        <CTableDataCell>{element.quantity}</CTableDataCell>
        <CTableDataCell>{element.total}</CTableDataCell>
        <CTableDataCell>
          <a
            onClick={() => {
              navigate("/admin/products/" + element.ref);
            }}
            style={{ cursor: "pointer", color: "blue" }}
          >
            View Product
          </a>
        </CTableDataCell>
      </CTableRow>
    ));
    setRows(rows1);
  }, []);
  const handleChangeStatusDocs = (e) => {
    setInter(e.target.getAttribute("name"));
    setClasses({
      status: "",
      docs: "",
      [e.target.getAttribute("name")]: "active-bar",
    });
  };
  const handleGenerateInvoice = (e) => {
    setInvoice(invoiceData);
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Orders</h3>
      </div>
      <div className="top-order-container">
        <div className="order-left">
          <div className="customer-card">
            <h1>Customer</h1>
            <div className="customer-name">
              <div className="customer-name-card">
                <BsPersonFill />
                {order.customer.name}
              </div>
              <CButton type="button">Show details</CButton>
              <label htmlFor="customer-email">Email:</label>
              <p name="customer-email">{order.customer.email}</p>
              <label htmlFor="customer-register">Registered on:</label>
              <p name="customer-register">{order.customer.registeredOn}</p>
              <label htmlFor="customer-orders">Validated orders:</label>
              <p name="customer-orders">{order.customer.completedOrders}</p>
              <label htmlFor="customer-totalSpent">Validated orders:</label>
              <p name="customer-totalSpent">{order.customer.totalSpent}TND</p>
              <label htmlFor="customer-address">Address:</label>
              <div className="customer-address">
                <p name="customer-address">
                  <span>Line 1:</span>
                  {order.customer.address.line1}
                </p>
                <p name="customer-address">
                  <span>Line 2:</span>
                  {order.customer.address.line2}
                </p>
                <p name="customer-address">
                  <span>City:</span>
                  {order.customer.address.city}
                </p>
                <p name="customer-address">
                  <span>State:</span>
                  {order.customer.address.state}
                </p>
                <p name="customer-address">
                  <span>Country:</span>
                  {order.customer.address.country}
                </p>
                <p name="customer-address">
                  <span>ZipCode:</span>
                  {order.customer.address.zipCode}
                </p>
              </div>
            </div>
          </div>
          <div className="order-messages">
            <h1>Messages</h1>
            {order.messages.map((e) => (
              <div className="single-message">
                <p>{e.messageContent}</p>
                <span>{e.messageDate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="order-right">
          <div className="products-card">
            <h1>Products</h1>
            <CTable>
              <CTableHead>
                <CTableRow color="light">
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View Product</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows}
                <CTableRow key="add" color="light">
                  <CTableDataCell>#</CTableDataCell>
                  <CTableDataCell colSpan={2}>
                    <CFormInput
                      name="ref"
                      type="text"
                      id="inputRef"
                      label="Reference"
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      name="quantity"
                      type="text"
                      id="inputQuantity"
                      label="Quantity"
                    />
                  </CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>
                    <CButton type="button">Add</CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CTable>
              <CTableHead>
                <CTableRow color="light">
                  <CTableHeaderCell scope="col">Products</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Taxes</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow color="light">
                  <CTableDataCell>86.6 TND</CTableDataCell>
                  <CTableDataCell>4.33</CTableDataCell>
                  <CTableDataCell>90.93</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
          <div className="info-container">
            <div className="info-navbar">
              <p
                onClick={handleChangeStatusDocs}
                name="status"
                className={classes.status}
              >
                Status
              </p>
              <p
                onClick={handleChangeStatusDocs}
                name="docs"
                className={classes.docs}
              >
                Documents
              </p>
            </div>
            <div className="info-content">
              {inter == "status" ? (
                <>
                  <CTable>
                    <CTableBody>
                      <CTableRow key="add" color="light">
                        <CTableDataCell>{order.info.status}</CTableDataCell>
                        <CTableDataCell>{order.info.date}</CTableDataCell>
                        <CTableDataCell>
                          <a style={{ cursor: "pointer", color: "blue" }}>
                            Resend Email
                          </a>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <div className="update-status">
                    <CFormSelect name="status" defaultValue="delievered">
                      <option value="sellconfirm">
                        Awaiting Seller Confirmation
                      </option>
                      <option value="suppconfirm">
                        Awaiting Supplier Confirmation
                      </option>
                      <option value="canceled">Canceled</option>
                      <option value="delievered">Delievered</option>
                    </CFormSelect>
                    <CButton type="button">Update status</CButton>
                  </div>
                  <div className="order-note">
                    <CFormTextarea
                      id="inputOrderNote"
                      label="Order note"
                      rows={3}
                      name="ordernote"
                    ></CFormTextarea>
                    <CButton type="button">Save</CButton>
                  </div>
                </>
              ) : inter == "docs" ? (
                <>
                  {invoice.date.length !== 0 ? (
                    <CTable>
                      <CTableHead>
                        <CTableRow color="light">
                          <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Document
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Number
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Amount
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow color="light">
                          <CTableDataCell>{invoice.date}</CTableDataCell>
                          <CTableDataCell>{invoice.document}</CTableDataCell>
                          <CTableDataCell>{invoice.num}</CTableDataCell>
                          <CTableDataCell>{invoice.amount}</CTableDataCell>
                        </CTableRow>
                        <CTableRow color="light">
                          <CTableDataCell colSpan={3}>
                            <CFormInput
                              name="quantity"
                              value={invoice.note}
                              type="text"
                              id="inputQuantity"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton type="button">Edit Note</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  ) : (
                    <CButton onClick={handleGenerateInvoice} type="button">
                      Generate Invoice
                    </CButton>
                  )}
                </>
              ) : (
                <h1>Not found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SingleOrder;
