import {useState, useEffect } from 'react';
import './Alert.css'

function Alert({msg="Message here", type="normal",refresh=false}) {
    const [styles,setStyles] = useState({bottom:"-60px"});
    const [alertIsUp,setAlertIsUp] = useState(false);
    useEffect(function(){
        if(msg!==""){
            let timeoutId;
            function resetTimeout(delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function(){
                    setStyles({bottom:"-60px"});
                    setAlertIsUp(false)
                },delay)
            }        
            if(!alertIsUp){
                setStyles({bottom:"40px"})
                setAlertIsUp(true)
                resetTimeout(5000);
            }else{
                resetTimeout(0);
                setTimeout(function(){
                    setStyles({bottom:"40px"})
                    setAlertIsUp(true)
                    resetTimeout(5000);
                },300)
            }
        }
    },[refresh])
    return (
        <div className='alert-pop-message-container' style={styles}>
            <div className='alert-pop-msg' style={type=="success"? {backgroundColor:"#00A724"} : type=="fail"? {backgroundColor:"#E62929"} : {backgroundColor:"#006DD3"}}>
                <p>{msg}</p>
            </div>
        </div>
    )
}

export default Alert;