import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Topbar from './Topbar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CryptoHome from './CryptoHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';

const Portofolio = () => {

    const [data, setData] = useState([])
    const [cryp, setCryp] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cookies] = useCookies(['user'])

    useEffect(() => {
        const fetchData = () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${cookies.session}`
                },
            }
            axios.get('http://localhost:9100/trade/cryp', config).then(res => {
                setData(res.data)
            })
            axios.get('http://localhost:9100/crypto', config).then(res => {
                setCryp(res.data)
            })
        }
        fetchData();
    }, [cookies.session, show]);

    const schema = yup.object({
        jumlah: yup.number().required()
    })

    const [submit, setSubmit] = useState(false);
    const [crypto, setCrypto] = useState();

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
                "nama_crypto": crypto.nama_crypto,
                "jumlah": values.jumlah,
            }
            const url = `http://localhost:9100/trade/sell/${crypto.id}`
            axios.post(url, data, config).then(response => {
                // console.log(response)
                if(response.data.status === 'success'){
                    toast.success("Berhasil jual crypto")
                }else{
                    toast.warning(response.data.message)
                }
                handleClose()
                setSubmit(false)
                values.jumlah = ''
            })
        }
    })

    // const [total, setTotal] = useState(0)
    const [hargaBuy, setHargaBuy] = useState(0)
    const [keuntungan, setKeuntungan] = useState(0)

    // useEffect(() => {
    //     let harga = 0;
    //     if (crypto !== undefined) harga = crypto.harga;
    //     let total = harga * values.jumlah;
    //     setTotal(total)
    // }, [values.jumlah, crypto])

    const handleClick = (data) => {
        // console.log(cryp)
        values.jumlah = ''
        setCrypto(data)
        // console.log(data.id)
        let harga = cryp.find(x => x.nama_crypto === data.nama_crypto).harga
        let keuntungan = harga - data.harga
        setKeuntungan(keuntungan)
        setHargaBuy(harga)
        // console.log(hargaBuy)
        handleShow()
    }


    return (
        <>
            <Topbar />
            <Container className='mt-4'>
            <h2 className='mb-3'>Portofolio</h2>
                <Row>
                    {data.map(dt => {
                        return (
                            <Col lg="4" key={dt.id}>
                                <CryptoHome
                                    nama={dt.nama_crypto}
                                    harga={dt.harga}
                                    id={dt.id}
                                    handleClick={() => handleClick(dt)}
                                    text="Jual"
                                    total={dt.jumlah}
                                />
                            </Col>

                        )
                    })}
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Jual Crypto {crypto == null ? '' :crypto.nama_crypto}</Modal.Title>
                    </Modal.Header>
                    <Form method="POST" onSubmit={handleSubmit} noValidate>
                    <Modal.Body>
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
                        <h4>Harga saat ini: Rp <NumericFormat value={hargaBuy} thousandSeparator="," displayType='text' /></h4>
                        <h4>Harga Beli: Rp {crypto == null ? 0 : <NumericFormat value={crypto.harga} thousandSeparator="," displayType='text' />}</h4>
                        <h4>Keuntungan: Rp <NumericFormat value={keuntungan} thousandSeparator="," displayType='text' /></h4>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={submit} variant="primary" type="submit">{submit ? (
                            <><FontAwesomeIcon icon={faSpinner} className="fa-spin"></FontAwesomeIcon> Proses</>
                        ) : 'Jual'}</Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
                <ToastContainer/>
            </Container>
        </>
    )
}

export default Portofolio;