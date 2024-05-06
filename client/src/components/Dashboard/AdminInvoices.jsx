import React,{useEffect, useState} from 'react'
import {CFormTextarea} from '@coreui/react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CButton } from '@coreui/react';
import Switch from 'react-switch';
import { BsXCircleFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getInvoices} from '../../services/adminService';
import moment from 'moment';
import {getSettings,updateSettings} from '../../services/settingsService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function AdminHome() {
    const [startDate, setStartDate] = useState(new Date());
    const [loading,setLoading] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState([]);
    const checkList = ["PENDING", "AWAITING_PAYMENT", "AWAITING_PICKUP","AWAITING_SHIPMENT","COMPLETED","SHIPPED","REFUNDED","CANCELED","ERROR","UNKNOW_STATUS"];
    const [invoicesPopUp,setInvoicesPopUp] = useState(false);
    const [invoicesData,setInvoicesData] = useState([]);
    const [invoicesDataRows,setInvoicesDataRows] = useState([]);
    const [invoicesConfig,setInvoicesConfig] = useState({})
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'invoiceId',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Date',
          field: 'created',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Download',
          field: 'download',
          sort: 'asc',
          width: 100
        }
      ],
      rows:invoicesDataRows
    };
    useEffect(function(){
      async function init(){
        let setts = await getSettings();
        setInvoicesConfig(setts.invoices);
      }
      init()
    },[])
  const handleExitPopUp = (e)=>{
    setInvoicesPopUp(false);
  }
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const checkedItems = checked.length
  ? checked.reduce((total, item) => {
      return total + ", " + item;
    })
  : "";
  var isChecked = (item) =>
  checked.includes(item) ? "checked-item-invoice" : "not-checked-item-invoice";
    const handleGenerateInvoicesByDate = async (e)=>{
      let dataToSend = {
        by:"date",
        values:{
          from:startDate,
          to:endDate
        }
      }
      setLoading(true); 
      await getInvoices(dataToSend).then((res)=>{
        setLoading(false);
        if(res.length==0){
          Swal.fire({
            icon: "warning",
            title: "No invoices for the given date !",
            showConfirmButton: false,
            timer: 1500
          });
        }  
        setInvoicesData(res)
      });
    }
    const handleGenerateInvoicesByStatus = async (e)=>{
      let dataToSend = {
        by:"orderStatus",
        values:checked
      }
      setLoading(true); 
      await getInvoices(dataToSend).then((res)=>{
        setLoading(false);
        if(res.length==0){
          Swal.fire({
            icon: "warning",
            title: "No invoices for the given status !",
            showConfirmButton: false,
            timer: 1500
          });
        }  
        setInvoicesData(res)
      });
    }
    const handleChangeEnableInvoices = async (e)=>{
      setInvoicesConfig({...invoicesConfig,EnableInvoices: !invoicesConfig.EnableInvoices})
    }
    const handleChangeImagesInvoices = async (e)=>{
      setInvoicesConfig({...invoicesConfig,EnableProductImagesInvoices: !invoicesConfig.EnableProductImagesInvoices})
    }
    const handleChangeConfig = async (e)=>{
      setInvoicesConfig({...invoicesConfig,[e.target.name]:e.target.value})
    }
    const handleSaveInvoicesConfig = async (e)=>{
      setLoading(true); 
      await updateSettings({data:{invoices:invoicesConfig}}).then(function(rslt){
        setLoading(false); 
        Swal.fire({
          icon: "success",
          title: "Invoice config updated !",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
    useEffect(function(){
      let rows = [...invoicesData];
      rows.map((item)=>{
        item.created = moment(item.created).format("YYYY-MM-DD")
        item.download = (<a href={item.url}>Download</a>)
      });
      setInvoicesDataRows(rows);
      if(invoicesData.length>0){
        setInvoicesPopUp(true);
      }
    },[invoicesData,setInvoicesData])
  return (
    <main className='main-container'>
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
      {
        invoicesPopUp? 
          <div className="invoices-popup">
            <div className="exit-popup">
              <BsXCircleFill onClick={handleExitPopUp} style={{position:"relative",float:"right",color:"red",fontSize:"24px",cursor:"pointer"}}/>
            </div> 
            <div className="invoices-content">
              <MDBDataTable
                  striped
                  small
                  noBottomColumns={true}
                  style={{color:"black"}}
                  data={data}
                />
            </div>
          </div>
        : ""
      }
        <div className='main-title'>
            <h3>Invoices</h3>
        </div>
        <div className="gen-invoices-container">
            <h1 style={{width:"100%"}}>By date:</h1>
            <div className="gen-invoice-dates">
                <div className="select-from">
                    <label htmlFor="from">From: </label><br/>
                    <DatePicker name='from' selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="select-to">
                    <label htmlFor="to">To: </label><br/>
                    <DatePicker name='to' selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>
            <CButton type='button' onClick={handleGenerateInvoicesByDate}>Generate Invoices</CButton>
        </div>
        <div className="gen-invoices-container">
            <h1 style={{width:"100%"}}>By Order Status:</h1>
            <div className="gen-invoice-status">
                <div className="checkList">
                    <div className="title-invoice">Your CheckList:</div>
                    <div className="list-container-invoice">
                    {checkList.map((item, index) => (
                        <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                        </div>
                    ))}
                    </div>
                </div>

                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>
            </div>
            <CButton type='button' onClick={handleGenerateInvoicesByStatus}>Generate Invoices</CButton>
        </div>
        <div className="gen-invoices-container">
            <h1 style={{width:"100%"}}>Invoice Settings:</h1>
            <div className="single-section">
                <label>Enable invoices:</label>
                <Switch checked={invoicesConfig?.EnableInvoices} onChange={handleChangeEnableInvoices}/>
            </div>
            <div className="single-section">
                <label>Enable product image:</label>
                <Switch checked={invoicesConfig?.EnableProductImagesInvoices} onChange={handleChangeImagesInvoices}/>
            </div>
            <div className="single-section">
                <label>Legal information:</label>
                <CFormTextarea
                    id="inputOrderNote"
                    rows={3}
                    name="InvoiceLegalInfo"
                    value={invoicesConfig?.InvoiceLegalInfo}
                    onChange={handleChangeConfig}
                ></CFormTextarea>
            </div>
            <div className="single-section">
                <label>Footer text:</label>
                <CFormTextarea
                    id="inputOrderNote"
                    rows={3}
                    name="InvoiceFooterText"
                    value={invoicesConfig?.InvoiceFooterText}
                    onChange={handleChangeConfig}
                ></CFormTextarea>
            </div>
            <CButton type='button' onClick={handleSaveInvoicesConfig}>Save</CButton>
        </div>
    </main>
  )
}

export default AdminHome