import React, { useEffect, useState } from 'react'
import {CButton, CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch"
import { getReviewsProducts } from '../../services/adminService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact';

function MpReviews() {
    const navigate = useNavigate();
    const lang = localStorage.getItem("lang");
    const [loading,setLoading] = useState(false);
    const [reviews,setReviews] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'Product Name',
            field: 'name',
            width: 150
          },
          {
            label: 'Number of reviews',
            field: 'nbrReviews',
            width: 100
          },
          {
            label: '--',
            field: 'seeReviews',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function reviewsGet(){
            let reviewsData = await getReviewsProducts();
            setReviews(reviewsData);
        }
        reviewsGet()
    },[])
    useEffect(()=>{
        let rows1 = [...reviews];
        let i =0;
        rows1.map((element) => {
            element.seeReviews = (<a onClick={()=>{navigate('/admin/mp/reviews/'+element._id)}} style={{cursor:"pointer",color:"blue"}}>See Reviews</a>)
            element.name = element.prod.initialProduct.name[lang];
            i++;
        });
        setRows(rows1);
    },[reviews,setReviews])
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
        <div className='main-title'>
            <h3>Reviews</h3>
        </div>
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
        />
    </main>
  )
}

export default MpReviews