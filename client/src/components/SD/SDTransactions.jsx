import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow,CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import {getTransactions,requestTransaction} from "../../services/dashboardService"

function SDTransactions() {
  const [transactions,setTransactions] = useState([])
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'transactionId',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Full Amount',
        field: 'fullAmount',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Admin Commision',
        field: 'adminCommision',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Seller Amount',
        field: 'sellerAmount',
        sort: 'asc',
        width: 150
      }
    ],
    rows:transactions
  };
  const handleRequestTransaction = async (e)=>{
    Swal.fire({
      title: "Do you want to request a withdrawl?",
      showCancelButton: true,
      confirmButtonText: "Request",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await requestTransaction()
        .then(function(e){
          Swal.fire({
              icon: "success",
              title: "Withdrawl Requested !",
              text: "Please wait until you're withdrawl is made !",
              showConfirmButton: true,
          });
        }).catch(function(err){
          Swal.fire({
              icon: "error",
              title: "Oops !",
              text: err.response.data,
          });
          });
      }
    });
    
  }
  useEffect(()=>{
    async function init(){
      await getTransactions().then((t)=>{
        setTransactions(t);
      })
    }
    init()
  },[])
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Transactions</h1>
            <CButton onClick={handleRequestTransaction} style={{backgroundColor:"#263043",border:"none"}}>Request Withdrawl</CButton>
          </div>
          <div className="sd-section-main">
            <MDBDataTable
                striped
                small
                noBottomColumns={true}
                style={{color:"white"}}
                data={data}
              />
          </div>
      </main>
    );
}

export default SDTransactions;
