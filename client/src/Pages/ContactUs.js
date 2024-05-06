import { useState ,useEffect} from 'react';
import { getSettings } from '../services/settingsService';
const ContactUs = () => {
    const [settings,setSettings]= useState({});
    useEffect(function(){
        async function init(){
            let s = await getSettings();
            setSettings(s);
        }
        init()
    },[])
  return (
    <div className='contactForm' style={{backgroundColor:"white",margin:"30px",padding:"30px",border:"1px solid #DEE2E7",borderRadius:"10px"}}>
        <h1 style={{fontWeight:400,fontSize:"30px"}}>Contact Us</h1>
        <p style={{fontWeight:300,fontSize:"18px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum architecto hic unde nemo facilis ipsum recusandae magni quasi autem fugit veritatis ad vel facere, saepe, reprehenderit est incidunt, doloremque debitis.</p>
        <h3 style={{fontWeight:400,fontSize:"18px"}}>Email us at : {settings.supportEmail}</h3>
    </div>
  );
};

export default ContactUs;