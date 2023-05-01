import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Wisata = ({ title, text, img, id }) => {
    return (
        <Card>
            <Card.Img variant='top' src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant='primary'>Go Somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default Wisata;