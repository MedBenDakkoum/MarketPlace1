import { useState,useEffect } from 'react';
import ActiveSells from './Sells/ActiveSells'
import { Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri';
import { createChatRoom } from '../../services/messagesData'
import { useNavigate } from 'react-router-dom';
import { getPublicSellerInfoById } from '../../services/sellerData';
function SellerProfile() {
    const [showMsg, setShowMdg] = useState(false);
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);
    const [data,setData] = useState({
        _id:"",
        avatar:"",
        name:"",
        email:"",
        phoneNumber:""
    });
    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    
    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(data._id, message)
            .then((res) => {
                navigate(`/messages`)
            })
            .catch(err => console.log(err))
    }
    useEffect(function(){

    },[])
    return (
        <>
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            <img id="avatar" alt="avatar" src={data.avatar} />
                        </Col>
                        <Col lg={2} md={3} sm={12}>
                            <p><BsFillPersonFill /> {data.name}</p>
                            <p><MdEmail /> {data.email}</p>
                            <p><MdPhoneAndroid /> {data.phoneNumber}</p>
                        </Col>
                        <Col lg={3} md={4} sm={12}>
                            <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                                <RiMessage3Fill />Contact Seller
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container">
                <Row>
                    <Col lg={12}>
                        {/* <ActiveSells params={data} /> */}
                    </Col>
                </Row>
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onMsgSent}>Sent</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SellerProfile;