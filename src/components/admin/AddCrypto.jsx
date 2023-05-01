
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import Topbar from '../site/Topbar';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const AddCrypto = () => {

    const schema = yup.object({
        nama: yup.string().required(),
        jumlah: yup.number().required(),
        harga: yup.number().required()
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
            nama: '',
            jumlah: '',
            harga: ''
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
                "nama": values.nama,
                "jumlah": values.password,
                "harga": values.email,
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
        <>
            <Topbar />
            <Container className='mt-4'>
            <Card>
                <Card.Header className="text-center">
                    <h3>Tambah Crypto</h3>
                </Card.Header>
                <Card.Body>
                    <Form method="POST" onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Crypto</Form.Label>
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
                            <Form.Label>Jumlah</Form.Label>
                            <Form.Control
                                type="text"
                                name="jumlah"
                                value={values.jumlah}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.jumlah}
                            />
                            <Form.Control.Feedback type="invalid">{errors.jumlah}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="text"
                                name="harga"
                                value={values.harga}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.harga}
                            />
                            <Form.Control.Feedback type="invalid">{errors.harga}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={submit} className="mb-3" variant="primary" type="submit">{submit ? (
                            <><FontAwesomeIcon icon={faSpinner} className="fa-spin"></FontAwesomeIcon> Proses</>
                        ) : 'Save'}</Button>
                    </Form>
                    <Link to={`/admin`} className="mb-3">
                        <Button type='button'>Kembali</Button>
                    </Link>
                </Card.Body>
            </Card>
            </Container>
        </>
    )
}

export default AddCrypto;