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
    <div className='contactForm' style={{display:"flex",gap:"10px",margin:"20px 8%"}}>
        <div style={{flexGrow:1,flexBasis:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",borderRadius:"15px",border:"1px solid #DEE2E7",backgroundColor:"white",padding:"20px"}} className='single-contact-field'>
          <img style={{maxWidth:"100px",border:"1px solid #0D6EFD",borderRadius:"50px",padding:"20px"}} src="https://icons.veryicon.com/png/o/miscellaneous/monochrome-linear-icon-library/address-90.png"/>
          <h4>Our Address</h4>
          <p style={{textAlign:"center"}}>Tunisia, Monastir, Omrane 5000</p>
        </div>
        <div style={{flexGrow:1,flexBasis:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",borderRadius:"15px",border:"1px solid #DEE2E7",backgroundColor:"white",padding:"20px"}} className='single-contact-field'>
          <img style={{maxWidth:"100px",border:"1px solid #0D6EFD",borderRadius:"50px",padding:"20px"}} src="https://i.ibb.co/1KWLG1V/phone.png"/>
          <h4>Phone Number</h4>
          <p style={{textAlign:"center"}}>+216 54 732 488</p>
        </div>
        <div style={{flexGrow:1,flexBasis:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",borderRadius:"15px",border:"1px solid #DEE2E7",backgroundColor:"white",padding:"20px"}} className='single-contact-field'>
          <img style={{maxWidth:"100px",border:"1px solid #0D6EFD",borderRadius:"50px",padding:"20px"}} src="https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/19-512.png"/>
          <h4>Email</h4>
          <p style={{textAlign:"center"}}>{settings.supportEmail}</p>
        </div>
        {/* <h1 style={{fontWeight:400,fontSize:"30px"}}>Contact Us</h1>
        <p style={{fontWeight:300,fontSize:"18px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum architecto hic unde nemo facilis ipsum recusandae magni quasi autem fugit veritatis ad vel facere, saepe, reprehenderit est incidunt, doloremque debitis.</p>
        <h3 style={{fontWeight:400,fontSize:"18px"}}>Email us at : {settings.supportEmail}</h3> */}
    </div>
  );
};

export default ContactUs;