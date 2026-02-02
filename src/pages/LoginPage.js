import React from 'react'
import { Container, Row, Form, Col, Button } from 'react-bootstrap'

const LoginPage = () => {
    return (
        <Container
            className="p-3 border border-light rounded bg-dark text-light"
            style={{ width: "40%", marginTop: "2%" }}
        >
            <h2 className="border-bottom pb-2" style={{ fontSize: "1.25rem" }}>
                User Details
            </h2>
            <Row className="align-items-center ms-4 mb-4 text-end">
                <Col xs={4}>
                    <div className="mb-1">Email Address</div>
                </Col>

                <Col xs={8}>
                    <Form.Control
                    type="text"
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #495057',
                        color: '#fff',
                        padding: "5px 5px 6px 10px"
                    }}
                    />
                </Col>
            </Row>
            <Row className="align-items-center ms-4 mb-3 text-end">
                <Col xs={4}>
                    <div className="mb-1">Password</div>
                </Col>

                <Col xs={8}>
                    <Form.Control
                    type="text"
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #495057',
                        color: '#fff',
                        padding: "5px 5px 6px 10px"
                    }}
                    />
                </Col>
            </Row>
            <Col>
                <Row className="text-end">
                    <Button variant="primary" size="sm" className='p-2'>
                        Login
                    </Button>
                </Row>
            </Col>
        </Container>
    )
}

export default LoginPage