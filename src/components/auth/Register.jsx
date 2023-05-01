import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Card, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Register = () => {
    const schema = yup.object({
        email: yup.string().email().required(),
        nama: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required()
    })

    const navigate = useNavigate()

    const [submit, setSubmit] = useState(false);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors
    } = useFormik({
        initialValues: {
            email: '',
            nama: '',
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
                "full_name": values.nama,
                "password": values.password,
                "email": values.email,
                "username": values.username
            }
            const url = "http://localhost:9100/auth/register"
            axios.post(url, data, config).then(response => {
                console.log(response)
                if (response.status === 200) {
                    navigate('/login', { replace: true, state: 'success_register' })
                }
            })
        }
    })


    return (
        <Container className="mt-3">
            <Card>
                <Card.Header className="text-center">
                    <h3>Register</h3>
                </Card.Header>
                <Card.Body>
                    <Form method="POST" onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={values.nama}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.nama}
                            />
                            <Form.Control.Feedback type="invalid">{errors.nama}</Form.Control.Feedback>
                        </Form.Group>
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
                        ) : 'Register'}</Button>
                    </Form>
                    <Link to={`/login`} className="mb-3">Login</Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Register;