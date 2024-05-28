import { useState, useContext } from 'react';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({navigate}) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { userData,setUserData } = useContext(Context)

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    if(res.isActive==false){
                        setLoading(false);
                        Swal.fire({
                            icon: "warning",
                            title: "UnVerified account!",
                            text: "An email will be sent to you when you're account is verified by one of our employees !",
                        });
                    }else if(res.isSuspended){
                        setLoading(false);
                        Swal.fire({
                            icon: "warning",
                            title: "Suspended account!",
                            html: "<p>Your Acount Has been suspended, please contact us <a href='/contact-us'>here</a></p>",
                        });
                    }else{
                        setUserData(res.user);
                        navigate("/")
                    }
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from login: ', err))
    }

    return (
        
        <>
            {!userData? <>
            <div className="container auth-form">
                <h1 className="auth-heading">Sign In</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChanges} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                    </Form.Group>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign In</Button>
                    }
                    <p className="bottom-msg-paragraph">Don't have an account? <Link to="/auth/register">Sign Up</Link>!</p>
                    <p className="bottom-msg-paragraph" style={{padding:0}}>Forgot Password? <Link to="/auth/forgot-password">Reset password</Link>!</p>
                </Form>
            </div>
            </> : <h1>Already Logged In</h1>}
        </>
    )
}

export default Login;