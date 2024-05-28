import React, {useState} from 'react';
import {CustomerEditInfo} from './CustomerEditInfo';
import {CustomerEditAddress} from './CustomerEditAddress';
import {CustomerEditImages} from './CustomerEditImages';


function CustomerEdit() {
    const [inter, setInter] = useState("info");
    const [classes, setClasses] = useState({
        info:"single-section active",
        address:"single-section",
        images:"single-section",
    })
    const handleInterChange = (e)=>{
        setClasses({
            info:"single-section",
            address:"single-section",
            images:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    return (
        
            <main className='main-container'>
            <div className='main-title'>
                <h3>Edit Customer</h3>
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
                    </div>
                    {inter=="info" ?
                        <CustomerEditInfo/>
                        : inter=="address" ? 
                        <CustomerEditAddress/>
                        : inter =="images" ?
                        <CustomerEditImages/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default CustomerEdit