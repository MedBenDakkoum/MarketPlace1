import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({ navigate }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { userData, setUserData } = useContext(Context);

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
                    if (res.isActive === false) {
                        setLoading(false);
                        Swal.fire({
                            icon: "warning",
                            title: t("unverified_account"),
                            text: t("email_verification_message"),
                        });
                    } else if (res.isSuspended) {
                        setLoading(false);
                        Swal.fire({
                            icon: "warning",
                            title: t("suspended_account"),
                            html: `<p>${t("account_suspended_message")} <a href='/contact-us'>${t("here")}</a></p>`,
                        });
                    } else {
                        console.log(res.user);
                        setUserData(res.user);
                        navigate("/");
                    }
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from login: ', err));
    }

    return (
        <>
            {!userData ? (
                <div className="container auth-form">
                    <h1 className="auth-heading">{t("sign_in")}</h1>
                    <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                        {alertShow &&
                            <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                                <p>{error}</p>
                            </Alert>
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t("email_address")}</Form.Label>
                            <Form.Control type="email" name="email" placeholder={t("enter_email")} onChange={handleChanges} required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>{t("password")}</Form.Label>
                            <Form.Control type="password" name="password" placeholder={t("password")} onChange={handleChanges} required />
                        </Form.Group>
                        {loading ? (
                            <Button className="col-lg-12 btnAuth" variant="dark" disabled>
                                {t("please_wait")} <Spinner animation="border" />
                            </Button>
                        ) : (
                            <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
                                {t("sign_in")}
                            </Button>
                        )}
                        <p className="bottom-msg-paragraph">{t("no_account")} <Link to="/auth/register">{t("sign_up")}</Link>!</p>
                        <p className="bottom-msg-paragraph" style={{ padding: 0 }}>{t("forgot_password")} <Link to="/auth/forgot-password">{t("reset_password")}</Link>!</p>
                    </Form>
                </div>
            ) : (
                <h1>{t("already_logged_in")}</h1>
            )}
        </>
    )
}

export default Login;