import React, {useEffect,useState} from 'react';
import {MpSellerEditInfo} from './MpSellerEdit/MpSellerEditInfo';
import {MpSellerEditAddress} from './MpSellerEdit/MpSellerEditAddress';
import {MpSellerEditCategories} from './MpSellerEdit/MpSellerEditCategories';
import {MpSellerEditPayment} from './MpSellerEdit/MpSellerEditPayment';
import {MpSellerEditImages} from './MpSellerEdit/MpSellerEditImages';
import {MpSellerEditSocial} from './MpSellerEdit/MpSellerEditSocial';
import {useNavigate, useParams} from 'react-router-dom';
import {CButton} from '@coreui/react';
import { verifySeller ,checkIfSellerVerified} from "../../services/adminService";
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'


function MpSellerEdit() {
    const [loading, setLoading] = useState(false);
    const [inter, setInter] = useState("info");
    const [viewVerifyButton, setViewVerifyButton] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [classes, setClasses] = useState({
        info:"single-section active",
        address:"single-section",
        images:"single-section",
        social:"single-section",
        payment:"single-section",
        categories:"single-section"
    })
    const handleInterChange = (e)=>{
        setClasses({
            info:"single-section",
            address:"single-section",
            images:"single-section",
            social:"single-section",
            payment:"single-section",
            categories:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    useEffect(()=>{
        async function init(){
            setLoading(true);
            await checkIfSellerVerified(params.id).then((rslt)=>{
                if(!rslt.status){
                    setViewVerifyButton(true);
                }
                setLoading(false);
            })
        }
        init()
    },[])
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
                    navigate("/admin/mp/sellers");
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
                <h3>Edit Seller</h3>
                {viewVerifyButton? 
                    <CButton onClick={handleVerifySeller}>Verify Seller</CButton>
                : ""}
            </div>
            <div className='multi-choice-container'> 
                    <div className='multi-choice-navbar'>
                        <div name="info" className={classes.info} onClick={handleInterChange}>
                            Information
                        </div>
                        <div name="address" className={classes.address} onClick={handleInterChange}>
                            Addresse
                        </div>
                        <div name="images" className={classes.images} onClick={handleInterChange}>
                            Images
                        </div>
                        <div name="social" className={classes.social} onClick={handleInterChange}>
                            Social
                        </div>
                        <div name="payment" className={classes.payment} onClick={handleInterChange}>
                            Payment Methods
                        </div>
                        <div name="categories" className={classes.categories} onClick={handleInterChange}>
                            Categories
                        </div>
                    </div>
                    {inter=="info" ?
                        <MpSellerEditInfo/>
                        : inter=="address" ? 
                        <MpSellerEditAddress/>
                        : inter =="images" ?
                        <MpSellerEditImages/>
                        : inter =="social" ?
                        <MpSellerEditSocial/>
                        : inter =="payment" ?
                        <MpSellerEditPayment/>
                        : inter =="categories" ?
                        <MpSellerEditCategories/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default MpSellerEdit