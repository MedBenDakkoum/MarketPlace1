import React, { useEffect, useState } from 'react'
import {CButton} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { getTransactions,confirmWithdrawl } from '../../services/adminService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact';
import { BsXCircleFill } from "react-icons/bs";

function MpTransactions() {
    const navigate = useNavigate();
    const lang = localStorage.getItem("lang");
    const [loading,setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [rows, setRows] = useState([]);
    const [transactionsPopUp,setTransactionsPopUp] = useState({
        id:"",
        active:false,
        hasPending:false,
        payment:{}
    });
    const [popUpRows, setPopUpRows] = useState([]);
    const data = {
        columns: [
            {
              label: 'Seller Name',
              field: 'name',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Balance',
              field: 'balance',
              sort: 'asc',
              width: 270
            },
            {
              label: 'Awaiting',
              field: 'awaiting',
              sort: 'asc',
              width: 200
            },
            {
                label: 'Number of transactions',
                field: 'numT',
                sort: 'asc',
                width: 200
              },
            {
              label: 'Actions',
              field: 'actions',
              sort: 'asc',
              width: 100
            }
          ],
          rows:rows
      };
      const data2 = {
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
          rows:popUpRows
      };
      
    useEffect(()=> {
        async function init(){
            let transactionData = await getTransactions();
            setTransactions(transactionData);
        }
        init()
    },[])
    const handleViewTransactions = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        let newRows = transactions.filter(function (el) {
            return el._id==id
        });
        console.log(newRows);
        setTransactionsPopUp({
            id:id,
            active:true,
            isPending:newRows[0].hasPending,
            payment:newRows[0]?.user?.paymentMethod || "DELETED"
        })
        setPopUpRows(newRows[0].transactions);
    }
    useEffect(()=>{
        let rows1 = [...transactions];
        let i =0;
        rows1.map((element) => {
            element.name = element?.user?.name || "DELETED";
            element.balance = element?.user?.balance || 0;
            if(element.hasPending){
                element.awaiting = <p style={{color:'red'}}>Yes</p>;
            }else{
                element.awaiting = <p style={{color:'green'}}>No</p>;
            }
            element.actions = <CButton id={element._id} onClick={handleViewTransactions}>Check</CButton>;
            i++;
        });
        setRows(rows1);
    },[transactions,setTransactions])
    const handleExitPopUp = (e)=>{
        setTransactionsPopUp(false);
      }
    const handleConfirmWithdrawl = (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        Swal.fire({
            title: "Are you sure you want to confirm this withdrawl?",
            text:"The withdrawl need to be made on the given payment details before confirming !",
            showCancelButton: true,
            confirmButtonText: "Confirm",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await confirmWithdrawl(id)
              .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Withdrawl Confirmed !",
                    showConfirmButton: false,
                    timer: 1000
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
        transactionsPopUp.active? 
          <div className="invoices-popup">
            <div className="exit-popup">
              <BsXCircleFill onClick={handleExitPopUp} style={{position:"relative",float:"right",color:"red",fontSize:"24px",cursor:"pointer"}}/>
            </div>
            <div style={{margin:"20px",padding:"20px",border:"1px solid white",width:"fit-content"}} className="paymentMethod">
                <h5>Payment Method</h5>
                <p><span>Method:</span> {transactionsPopUp.payment.method}</p>
                <p><span>Details:</span> {transactionsPopUp.payment.details}</p>
            </div>
            {transactionsPopUp?.isPending? 
                <CButton id={transactionsPopUp.id} onClick={handleConfirmWithdrawl} style={{margin:"20px"}}>
                    Confirm Withdrawl
                </CButton>
            : ""}
            <div className="invoices-content">
              <MDBDataTable
                  striped
                  small
                  noBottomColumns={true}
                  style={{color:"black"}}
                  data={data2}
                  className='mdbdatatableclass'
                />
            </div>
          </div>
        : ""
      }
        <div className='main-title'>
            <h3>Transactions</h3>
        </div>
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
            className='mdbdatatableclass'
        />
    </main>
  )
}

export default MpTransactions