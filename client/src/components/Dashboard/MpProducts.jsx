import React, {useState} from 'react';
import {MpProductSingles} from './MpProductEdit/MpProductSingles';
import {MpProductCombinations} from './MpProductCombo/MpProductCombinations';

function MpProducts() {
    const [inter, setInter] = useState("singleProducts");
    const [classes, setClasses] = useState({
        singleProducts:"single-section active",
    })
    const handleInterChange = (e)=>{
        setClasses({
            singleProducts:"single-section",
            [e.target.getAttribute('name')]:"single-section active"
        })
        setInter(e.target.getAttribute('name'));
    }
    return (
        
            <main className='main-container'>
            <div className='main-title'>
                <h3>Products</h3>
            </div>
            <div className='multi-choice-container'> 
                    <div className='multi-choice-navbar'>
                        <div name="singleProducts" className={classes.singleProducts} onClick={handleInterChange}>
                            Single Products
                        </div>
                    </div>
                    {inter=="singleProducts" ?
                            <MpProductSingles/>
                        : <h1>Error 404</h1>
                    }
            </div>
        </main>
        
  )
}

export default MpProducts