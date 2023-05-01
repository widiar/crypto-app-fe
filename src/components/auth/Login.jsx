import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {

    const location = useLocation()
    // console.log(location)
    window.history.replaceState({}, document.title)

    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required()
    })

    const [, setCookies] = useCookies(['user'])

    const [submit, setSubmit] = useState(false);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors
    } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            // console.log(values)
            setSubmit(true)
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const data = {
                "password": values.password,
                "username": values.username
            }
            const url = "http://localhost:9100/auth/login"
            axios.post(url, data, config).then(response => {
                console.log(response)
                let expire = new Date();
                expire.setTime(expire.getTime() + 60 * 5000) //5000 -> 2 detik
                if (response.status === 200) {
                    setCookies("session", response.data, { path: '/', expires: expire })
                    navigate('/')
                }
            }).catch(error => {
                console.log(error)
                setMessage(error.response.data)
                setSubmit(false)
            })
        }
    })

    return (
        <Container className="mt-3">
            <Card>
                <Card.Header className="text-center">
                    <h3>Login</h3>
                    {location.state === null ? '' :
                        <Alert variant="success" dismissible>Berhasil Daftar</Alert>
                    }
                    {message === '' ? '' : <Alert variant="danger" dismissible>{message}</Alert>}
                </Card.Header>
                <Card.Body>
                    <Form method="POST" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={submit} className="mb-3" variant="primary" type="submit">{submit ? (
                            <><FontAwesomeIcon icon={faSpinner} className="fa-spin"></FontAwesomeIcon> Proses</>
                        ) : 'Login'}</Button>
                    </Form>
                    <Link to={`/register`} className="mb-3">Buat akun</Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;