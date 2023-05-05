import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useCookies } from "react-cookie";

const Topbar = () => {
    const [cookies] = useCookies(['user'])
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>Crypto</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/saldo'>Saldo</Nav.Link>
                        <Nav.Link href='/portofolio'>Portofolio</Nav.Link>
                        {cookies.session === null ? <Nav.Link href='/login'>Login</Nav.Link> : <Nav.Link href='/logout'>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Topbar;