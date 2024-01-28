import React, {useEffect,useState} from 'react';
import {MpSellerEditInfo} from './MpSellerEdit/MpSellerEditInfo';
import {MpSellerEditAddress} from './MpSellerEdit/MpSellerEditAddress';
import {MpSellerEditCategories} from './MpSellerEdit/MpSellerEditCategories';
import {MpSellerEditPayment} from './MpSellerEdit/MpSellerEditPayment';
import {MpSellerEditImages} from './MpSellerEdit/MpSellerEditImages';
import {MpSellerEditSocial} from './MpSellerEdit/MpSellerEditSocial';


function MpSellerEdit() {
    const [inter, setInter] = useState("info");
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
    return (
        
            <main className='main-container'>
            <div className='main-title'>
                <h3>Edit Seller</h3>
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