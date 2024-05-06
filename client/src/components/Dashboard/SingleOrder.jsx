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
import { getOrder,updateOrderStatus,addOrderMessage } from "../../services/adminService";
import { useTranslation } from 'react-i18next'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import moment from 'moment';

function SingleOrder() {
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
        <CTableDataCell>{element.productName[lang]}</CTableDataCell>
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
  const handleChangeStatusDocs = (e) => {
    setInter(e.target.getAttribute("name"));
    setClasses({
      status: "",
      docs: "",
      [e.target.getAttribute("name")]: "active-bar",
    });
  };
  const handleDownloadInvoice = (e) => {
    if(order.invoiceUrl){
      window.open(order.invoiceUrl, "_blank")
    };
  };
  const handleUpdateStatus = async (e)=>{
    e.preventDefault();
    setLoading(true);
    await updateOrderStatus(params.id,order.info.status)
    .then(function(rslt){
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Status updated !",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  const handleChangeStatus = async (e)=>{
    e.preventDefault();
    setOrder({...order,info:{...order.info,status:e.target.value}});
  }
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
              <CButton type="button">Show details</CButton>
              <div className="single-customer-detail">
                <label htmlFor="customer-email">Email:</label>
                <p name="customer-email">{order?.customer?.email}</p>
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
                <p name="customer-totalSpent">{order?.customer?.totalSpent} TND</p>
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
                        <CTableDataCell>{t("OrderStatus."+order?.info?.status)}</CTableDataCell>
                        <CTableDataCell>{order?.info?.statusUpdatesAt}</CTableDataCell>
                        <CTableDataCell>
                          <a style={{ cursor: "pointer", color: "blue" }}>
                            Resend Email
                          </a>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <div className="update-status">
                    <CFormSelect onChange={handleChangeStatus} name="status" value={order?.info?.status}>
                      <option value="PENDING">Pending</option>
                      <option value="AWAITING_PAYMENT">Awaiting Payment</option>
                      <option value="AWAITING_PICKUP">Awaiting Pickup</option>
                      <option value="AWAITING_SHIPMENT">Awaiting Shipment</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="REFUNDED">Refunded</option>
                      <option value="CANCELED">Canceled</option>
                      <option value="ERROR">Order error</option>
                      <option value="UNKNOW_STATUS">Unknow order status</option>
                    </CFormSelect>
                    <CButton type="button" onClick={handleUpdateStatus}>Update status</CButton>
                  </div>
                </>
              ) : inter == "docs" ? (
                  <a href={order.invoiceUrl} target="_blank">
                    <CButton type="button">
                      Download Invoice
                    </CButton>
                  </a>
              ) : (
                <h1>Not found</h1>
              )}
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

export default SingleOrder;
