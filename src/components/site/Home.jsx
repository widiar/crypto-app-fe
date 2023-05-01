import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Topbar from './Topbar';
import Wisata from './Wisata';

const Home = () => {

    const data = [
        {
            "title": 'Test',
            'text': 'Coba',
        },
        {
            "title": 'Test',
            'text': 'Coba',
        }
    ]

    return (
        <>
            <Topbar />
            <Container className='mt-4'>
                <Row>
                    {data.map(dt => {
                        return (
                            <Col lg="4">
                                <Wisata
                                    title={dt.title}
                                    text={dt.text}
                                    img='https://dummyimage.com/250'
                                    id='1'
                                />
                            </Col>

                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Home;