import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { removeReview} from '../../services/adminService';
import { getReviews } from '../../services/productData';
import { ThreeDots } from 'react-loader-spinner'
import { MDBDataTable } from 'mdbreact';
import ReactStars from "react-rating-stars-component";
import moment from 'moment';
import { CButton } from '@coreui/react';
import Swal from 'sweetalert2';

function MpSingleReviews() {
    const navigate = useNavigate();
    const params = useParams();
    const lang = localStorage.getItem("lang");
    const [loading,setLoading] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [reviews,setReviews] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'Client Name',
            field: 'clientName',
            width: 150
          },
          {
            label: 'Stars',
            field: 'reviewStars',
            width: 100
          },
          {
            label: 'Text',
            field: 'text',
            width: 100
          },
          {
            label: 'date',
            field: 'date',
            width: 100
          },
          {
            label: '--',
            field: 'removeReview',
            width: 100
          }

        ],
        rows:rows
      };
      const handleDeleteReview = (e)=>{
            let id="";
            if(e.target==e.currentTarget){
                id=e.target.getAttribute("id");
            }else{
                id=e.target.parentNode.getAttribute("id");
            }
            Swal.fire({
            title: "Do you want to remove this item?",
            showCancelButton: true,
            confirmButtonText: "Remove",
            }).then(async (result) => {
            if (result.isConfirmed) {
                await removeReview(id)
                .then(function(e){
                    Swal.fire({
                        icon: "success",
                        title: "Review is deleted",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setRefresh(!refresh);
                }).catch(function(err){
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: e.message,
                    });
                    setRefresh(!refresh);
                });
            }
            });
      }
    useEffect(()=> {
        async function reviewsGet(){
            let reviewsData = await getReviews(params.id);
            setReviews(reviewsData);
        }
        reviewsGet()
    },[refresh,setRefresh])
    useEffect(()=>{
        let rows1 = [...reviews];
        rows1.map((element) => {
            element.clientName = element.userId.name;
            element.reviewStars = (<ReactStars
                count={5}
                size={24}
                value={element.stars}
                edit={false}
                activeColor="#ffd700"
            />)
            element.date = moment(element.createdAt).format("YYYY-MM-DD")
            element.removeReview = <CButton id={element._id} onClick={handleDeleteReview}>Remove</CButton>
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
            className='mdbdatatableclass'
        />
    </main>
  )
}

export default MpSingleReviews