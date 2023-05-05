import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CryptoHome = ({ nama, harga, id, handleClick, text, total }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title><h2>{nama}</h2></Card.Title>
                {text === 'Jual' ? <Card.Text>Total: {total}</Card.Text> : <Card.Text>Rp {harga}</Card.Text>}
                <Button variant='primary' className='btn-sm' onClick={ handleClick }>{text}</Button>
            </Card.Body>
        </Card>
    )
}

export default CryptoHome;