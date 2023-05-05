
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import Topbar from '../site/Topbar';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { NumericFormat } from 'react-number-format';


const AddCrypto = () => {

    const schema = yup.object({
        nama: yup.string().required(),
        jumlah: yup.number().required(),
        harga: yup.string().required()
    })

    const [cookies] = useCookies(['user'])

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
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${cookies.session}`
                },
            }
            const data = {
                "nama_crypto": values.nama,
                "jumlah": values.jumlah,
                "harga": parseFloat(values.harga.split(',').join('')),
            }
            const url = "http://localhost:9100/crypto"
            axios.post(url, data, config).then(response => {
                console.log(response)
                if(response.data.status === 'success'){
                    navigate('/admin', { replace: true, state: 'success_add' })
                }else{
                    setSubmit(false)
                    toast.error(`Gagal tambah data dikarenakan ${response.data.message}`)
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
                                autoComplete='off'
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
                                autoComplete='off'
                            />
                            <Form.Control.Feedback type="invalid">{errors.jumlah}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Harga</Form.Label>
                            <NumericFormat
                                value={values.harga}
                                name='harga'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                isInvalid={!!errors.harga}
                                customInput={Form.Control}
                                thousandSeparator=','
                                autoComplete='off'
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
            <ToastContainer/>
        </>
    )
}

export default AddCrypto;