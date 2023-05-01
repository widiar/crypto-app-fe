import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Modal } from 'react-bootstrap';
import Topbar from './Topbar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import * as yup from "yup";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Saldo = () => {

    const [saldo, setSaldo] = useState(0);

    const [cookies] = useCookies(['user'])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log(cookies.session)
    useEffect(() => {
        const fetchData = () => {
            const url = "http://localhost:9100/saldo";
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${cookies.session}`
                },
            };
            axios.get(url, config).then(res => {
                // console.log(res.data)
                setSaldo(res.data.total_saldo)
            })
        }
        fetchData();
    }, [cookies.session, show])

    const schema = yup.object({
        jumlah: yup.number().required()
    })

    const [submit, setSubmit] = useState(false);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors
    } = useFormik({
        initialValues: {
            jumlah: '',
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
                "jumlah": values.jumlah,
            }
            const url = "http://localhost:9100/saldo"
            axios.post(url, data, config).then(response => {
                // console.log(response)
                if(response.data === 'success'){
                    handleClose()
                    setSubmit(false)
                    values.jumlah = ''
                    toast.success("Berhasil tambah saldo")
                }
            })
        }
    })


    return (
        <>
            <Topbar />
            <Container className='mt-4'>
                <Card>
                    <Card.Body>
                        <h1>Rp {saldo}</h1>
                        <Button className='mt-3' variant='primary' onClick={handleShow}>Top Up</Button>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Top Up Saldo</Modal.Title>
                    </Modal.Header>
                    <Form method="POST" onSubmit={handleSubmit} noValidate>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Saldo</Form.Label>
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
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={submit} variant="primary" type="submit">{submit ? (
                            <><FontAwesomeIcon icon={faSpinner} className="fa-spin"></FontAwesomeIcon> Proses</>
                        ) : 'Save'}</Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
            <ToastContainer/>
        </>
    )
}

export default Saldo;