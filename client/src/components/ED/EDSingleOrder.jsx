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
import { useNavigate,useParams } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { getOrder,addOrderMessage,verifyOrder } from "../../services/employeeService";
import { useTranslation } from 'react-i18next'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import moment from 'moment';

function EDSingleOrder() {
  const lang = localStorage.getItem("lang");
  const [loading,setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState({});
  const [inter, setInter] = useState("status");
  const [msgToAdd,setMsgToAdd] = useState({
    subject:"",
    content:""
  })
  const [classes, setClasses] = useState({
    status: "active-bar",
    docs: "",
  });
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    async function init(){
      let data = await getOrder(params.id);
      setOrder(data);
    }
    init()
  }, [refresh,setRefresh]);
  useEffect(function(){
    let rows1 = order?.products?.map((element, index) => (
      <CTableRow key={element.id} color="light">
        <CTableDataCell>#</CTableDataCell>
        <CTableDataCell>{element.ref}</CTableDataCell>
        <CTableDataCell>{element.productName[lang] || ""}</CTableDataCell>
        {element?.attributes? 
            <CTableDataCell>
                <li style={{listStyle:"none"}}>
                    {Object.keys(element?.attributes).map(
                        (attr)=>(<ul style={{margin:0,padding:0}}>{attr}:{element.attributes[attr]}</ul>)
                    )}
                </li>
            </CTableDataCell>
        : 
            <CTableDataCell>#</CTableDataCell>
        }
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
  },[order,setOrder])
  const handleChangeAddMessage = async (e)=>{
    e.preventDefault();
    setMsgToAdd({...msgToAdd,[e.target.name]:e.target.value});
  }
  const handleAddMessage = async (e)=>{
    e.preventDefault();
    setLoading(true);
    await addOrderMessage(params.id,msgToAdd)
    .then(function(rslt){
      setRefresh(!refresh);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Message Sent !",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  const handleVerifyOrder = (e)=>{
    e.preventDefault();
    Swal.fire({
        title: "Are you sure you want to verify the order?",
        text:"Client need to be called first !",
        showCancelButton: true,
        confirmButtonText: "Verify",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await verifyOrder(params.id)
            .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Order Verified !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setOrder({...order,isVerified:true});
                setLoading(false);
            }).catch(function(err){
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: "Error while verifing the order!",
                });
                setLoading(false);
                });
        }
      });
  }
  return (
    <main className="main-container">
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
                <p>{order?.customer?.name}</p>
              </div>
              <div className="single-customer-detail">
                <label htmlFor="customer-email">Email:</label>
                <p name="customer-email">{order?.customer?.email}</p>
              </div>
              <div className="single-customer-detail">
                <label htmlFor="customer-email">Phone:</label>
                <p name="customer-email">{order?.customer?.phoneNumber}</p>
              </div>
              <div className="single-customer-detail">
                <label htmlFor="customer-register">Registered on:</label>
                <p name="customer-register">{order?.customer?.registeredOn}</p>
                </div>
              <div className="single-customer-detail">
                <label htmlFor="customer-orders">Validated orders:</label>
                <p name="customer-orders">{order?.customer?.completedOrders}</p>
              </div>
              <div className="single-customer-detail">
                <label htmlFor="customer-totalSpent">Total spent:</label>
                <p name="customer-totalSpent">{order?.customer?.totalSpent.toFixed(2)} TND</p>
              </div>
            </div>
          </div>
          <div className="order-messages">
            <h1>Messages</h1>
            {order?.messages?.map((e) => (
              <div className="single-message">
                <h4>{e.messageSubject}</h4>
                <p>{e.messageContent}</p>
                <span>{moment(e.messageDate).format("YYYY-MM-DD")}</span>
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
                  <CTableHeaderCell scope="col">Attributes</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View Product</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows}
              </CTableBody>
            </CTable>
          </div>
          <div className="info-container">
            <div className="info-navbar">
              <p
                name="status"
                className={classes.status}
              >
                Status
              </p>
            </div>
            <div className="info-content">
                <>
                  <CTable stripedColumns>
                    <CTableBody>
                      <CTableRow key="add" color="light">
                        <CTableDataCell>{t("OrderStatus."+order?.info?.status)}</CTableDataCell>
                        <CTableDataCell>{order?.info?.statusUpdatesAt}</CTableDataCell>
                        <CTableDataCell>
                          <a style={{ cursor: "pointer", color: "blue" }}>
                            Resend Email
                          </a>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow key="add" color="light">
                        <CTableDataCell>{order?.isVerified? <p style={{color:"#4CAF50"}}>Verified</p> : <p style={{color:"red"}}>inVerified</p>}</CTableDataCell>
                        {!order?.isVerified? 
                            <CTableDataCell colSpan={2}>
                                <CButton onClick={handleVerifyOrder} style={{width:"100%",height:"100%"}}>Verify</CButton>
                            </CTableDataCell>
                        : ""}
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </>
            </div>
          </div>
          <div className="add-message-container">
            <CFormInput
              id="messageSubject"
              label="Subject"
              rows={3}
              onChange={handleChangeAddMessage}
              name="subject"
              value={msgToAdd.subject}
            ></CFormInput>
            <CFormTextarea
              id="messagecontent"
              label="Message"
              onChange={handleChangeAddMessage}
              rows={3}
              name="content"
              value={msgToAdd.content}
            ></CFormTextarea>
            <CButton type="button" onClick={handleAddMessage}>Add message</CButton>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EDSingleOrder;
