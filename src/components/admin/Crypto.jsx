import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import Topbar from '../site/Topbar';
import { Link } from 'react-router-dom';


const Crypto = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('https://dummyjson.com/products').then(res => {
                const rs = res.data.products.map(item =>
                    [item.id, item.title, item.price, '']
                )
                setData(rs)
            })
        }
        fetchData();
    }, []);

    const columns = [
        {
            name: 'id',
            options: {
                display: 'excluded'
            }
        },
        {
            name: "Name",
        },
        {
            name: "Price",
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
                        onClick={() => { console.log(meta); console.log(`id ${meta.rowData[0]}`) }}
                    >Ok</Button>
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
        </>
    )
}

export default Crypto;