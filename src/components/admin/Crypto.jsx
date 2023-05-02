import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import Topbar from '../site/Topbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';


const Crypto = () => {

    const location = useLocation();
    // console.log(location)
    window.history.replaceState({}, document.title)
    if(location.state !== null){
        toast.success("Berhasil")
    }

    const [cookies] = useCookies(['user'])

    const [data, setData] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${cookies.session}`
                },
            }
            axios.get('http://localhost:9100/crypto', config).then(res => {
                const rs = res.data.map(item =>
                    [item.id, item.nama_crypto, item.jumlah, item.harga, '']
                )
                console.log(res)
                setData(rs)
            })
        }
        fetchData();
    }, [cookies.session]);

    const columns = [
        {
            name: 'id',
            options: {
                display: 'excluded'
            }
        },
        {
            name: "Nama Crypto",
        },
        {
            name: "Jumlah",
        },
        {
            name: "Harga",
            options: {
                customBodyRender: (value, meta, updValue) => {
                    return `Rp ${value}`
                }
            }
        },
        {
            name: 'Action',
            options: {
                customBodyRender: (value, meta) => {
                    return <Button
                        className="btn btn-primary btn-sm mb-3"
                        onClick={() => { navigate(`/admin/edit/${meta.rowData[0]}`) }}
                    >Edit</Button>
                }
            }
        }
    ]
    const options = {
        selectableRowsHideCheckboxes: true
    };

    return (
        <>
            <Topbar />
            <Container className='mt-4'>
                <Link to={`/admin/add`} className='mb-3'>
                    <Button className="btn btn-primary btn-sm mb-3">Tambah</Button>
                </Link>
                <MUIDataTable
                    title="products"
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Container>
            <ToastContainer/>
        </>
    )
}

export default Crypto;