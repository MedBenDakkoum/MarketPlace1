import React, {useState} from 'react';
import {EDSellerInfo} from './EDSellerInfo';
import {EDSellerAddress} from './EDSellerAddress';
import {EDSellerCategories} from './EDSellerCategories';
import {EDSellerConfig} from './EDSellerConfig';
import {CButton} from '@coreui/react';
import {useNavigate, useParams} from 'react-router-dom';
import { verifySeller } from "../../../services/employeeService";
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'


function EDSeller() {
    const [loading, setLoading] = useState(false);
    const [inter, setInter] = useState("info");
    const params = useParams();
    const navigate = useNavigate();
    const [classes, setClasses] = useState({
        info:"single-section active",
        address:"single-section",
        config:"single-section",
        categories:"single-section"
    })
    const handleInterChange = (e)=>{
        setClasses({
            info:"single-section",
            address:"single-section",
            config:"single-section",
            categories:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    const handleVerifySeller = (e)=>{
        Swal.fire({
            title: "Are you sure you want to verify this seller?",
            text:"Seller information need to be checked first !",
            showCancelButton: true,
            confirmButtonText: "Verify",
          }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                await verifySeller(params.id)
                .then(function(e){
                    setLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Seller Verified !",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    navigate("/employee/sellers");
                }).catch(function(err){
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: "Error while verifing the order!",
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
            <div className='main-title'>
                <h3>View Seller</h3>
                <CButton onClick={handleVerifySeller}>Verify Seller</CButton>
            </div>
            <div className='multi-choice-container'> 
                    <div className='multi-choice-navbar'>
                        <div name="info" className={classes.info} onClick={handleInterChange}>
                            Information
                        </div>
                        <div name="address" className={classes.address} onClick={handleInterChange}>
                            Addresse
                        </div>
                        <div name="config" className={classes.config} onClick={handleInterChange}>
                            Config
                        </div>
                        <div name="categories" className={classes.categories} onClick={handleInterChange}>
                            Categories
                        </div>
                    </div>
                    {inter=="info" ?
                        <EDSellerInfo/>
                        : inter=="address" ? 
                        <EDSellerAddress/>
                        : inter =="config" ?
                        <EDSellerConfig/>
                        : inter =="categories" ?
                        <EDSellerCategories/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default EDSeller