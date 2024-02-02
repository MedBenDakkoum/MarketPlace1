import React,{useState} from 'react'
import {CFormTextarea} from '@coreui/react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CButton } from '@coreui/react';
import Switch from 'react-switch';
function AdminHome() {
    const [startDate, setStartDate] = useState(new Date());
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      const [checked, setChecked] = useState([]);
  const checkList = ["Shipped", "Refunded", "Delivered","Canceled"];

  // Add/Remove checked item from list
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

  return (
    <main className='main-container'>
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
                    <DatePicker name='to' selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
            </div>
            <CButton type='button'>Generate Invoices</CButton>
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
            <CButton type='button'>Generate Invoices</CButton>
        </div>
        <div className="gen-invoices-container">
            <h1 style={{width:"100%"}}>Invoice Settings:</h1>
            <div className="single-section">
                <label>Enable invoices:</label>
                <Switch checked={true}/>
            </div>
            <div className="single-section">
                <label>Enable product image:</label>
                <Switch checked={true}/>
            </div>
            <div className="single-section">
                <label>Legal information:</label>
                <CFormTextarea
                    id="inputOrderNote"
                    rows={3}
                    name="ordernote"
                ></CFormTextarea>
            </div>
            <div className="single-section">
                <label>Footer text:</label>
                <CFormTextarea
                    id="inputOrderNote"
                    rows={3}
                    name="ordernote"
                ></CFormTextarea>
            </div>
            <CButton type='button'>Save</CButton>
        </div>
    </main>
  )
}

export default AdminHome