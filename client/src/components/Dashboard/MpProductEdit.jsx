import React, {useState} from 'react';
import {MpProductEditInfo} from './MpProductEdit/MpProductEditInfo';
import {MpProductEditImages} from './MpProductEdit/MpProductEditImages';
import {MpProductEditSellers} from './MpProductEdit/MpProductEditSellers';
import {MpProductEditStatistics} from './MpProductEdit/MpProductEditStatistics';
import {MpProductEditAttributes} from './MpProductEdit/MpProductEditAttributes';

function MpProductEdit() {
    const [inter, setInter] = useState("info");
    const [classes, setClasses] = useState({
        info:"single-section active",
        images:"single-section",
        attributes:"single-section",
        sellers:"single-section",
        statistics:"single-section",
    })
    const handleInterChange = (e)=>{
        setClasses({
            info:"single-section",
            images:"single-section",
            attributes:"single-section",
            sellers:"single-section",
            statistics:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    return (
        
            <main className='main-container'>
            <div className='main-title'>
                <h3>Single Product</h3>
            </div>
            <div className='multi-choice-container'> 
                    <div className='multi-choice-navbar'>
                        <div name="info" className={classes.info} onClick={handleInterChange}>
                            Information
                        </div>
                        <div name="images" className={classes.images} onClick={handleInterChange}>
                            Images
                        </div>
                        <div name="attributes" className={classes.attributes} onClick={handleInterChange}>
                            Attributes
                        </div>
                        <div name="sellers" className={classes.sellers} onClick={handleInterChange}>
                            Sellers
                        </div>
                        <div name="statistics" className={classes.statistics} onClick={handleInterChange}>
                            Statistics
                        </div>
                    </div>
                    {inter=="info" ?
                        <MpProductEditInfo/>
                        : inter=="images" ? 
                        <MpProductEditImages/>
                        : inter=="attributes" ?
                        <MpProductEditAttributes/>
                        : inter =="sellers" ?
                        <MpProductEditSellers/>
                        : inter =="statistics" ?
                        <MpProductEditStatistics/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default MpProductEdit