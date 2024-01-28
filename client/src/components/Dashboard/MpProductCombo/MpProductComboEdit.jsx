import React, {useEffect,useState} from 'react';
import {MpProductComboEditInfo} from './MpProductComboEditInfo';
import {MpProductComboEditImages} from './MpProductComboEditImages';
import {MpProductComboEditSellers} from './MpProductComboEditSellers';
import {MpProductComboEditStatistics} from './MpProductComboEditStatistics';
import {MpProductComboEditProducts} from './MpProductComboEditProducts';

function MpProductComboEdit() {
    const [inter, setInter] = useState("info");
    const [classes, setClasses] = useState({
        info:"single-section active",
        images:"single-section",
        products:"single-section",
        seller:"single-section",
        statistics:"single-section",
    })
    const handleInterChange = (e)=>{
        setClasses({
            info:"single-section",
            images:"single-section",
            products:"single-section",
            seller:"single-section",
            statistics:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    return (
        
            <main className='main-container'>
            <div className='main-title'>
                <h3>Product Combo</h3>
            </div>
            <div className='multi-choice-container'> 
                    <div className='multi-choice-navbar'>
                        <div name="info" className={classes.info} onClick={handleInterChange}>
                            Information
                        </div>
                        <div name="images" className={classes.images} onClick={handleInterChange}>
                            Images
                        </div>
                        <div name="products" className={classes.products} onClick={handleInterChange}>
                            Products
                        </div>
                        <div name="seller" className={classes.seller} onClick={handleInterChange}>
                            Seller
                        </div>
                        <div name="statistics" className={classes.statistics} onClick={handleInterChange}>
                            Statistics
                        </div>
                    </div>
                    {inter=="info" ?
                        <MpProductComboEditInfo/>
                        : inter=="images" ? 
                        <MpProductComboEditImages/>
                        : inter=="products" ?
                        <MpProductComboEditProducts/>
                        : inter =="seller" ?
                        <MpProductComboEditSellers/>
                        : inter =="statistics" ?
                        <MpProductComboEditStatistics/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default MpProductComboEdit