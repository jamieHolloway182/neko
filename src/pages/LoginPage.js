import React, { useState, useContext } from 'react'
import { Container, Row, Form, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // store credentials (note: storing passwords in localStorage is insecure)
        localStorage.setItem('auth_credentials', JSON.stringify({ email, password }))
        try {
            await login({ email, password })
            navigate('/calendar')
        } catch (err) {
            console.error('Login failed', err)
        }
    }

    return (
        <Container
            className="p-3 border border-light rounded bg-dark text-light"
            style={{ width: "40%", marginTop: "2%" }}
        >
            <h2 className="border-bottom pb-2" style={{ fontSize: "1.25rem" }}>
                User Details
            </h2>
            <Form onSubmit={handleSubmit}>
            <Row className="align-items-center ms-4 mb-4 text-end">
                <Col xs={4}>
                    <div className="mb-1">Email Address</div>
                </Col>

                <Col xs={8}>
                    <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <Button type="submit" variant="primary" size="sm" className='p-2'>
                        Login
                    </Button>
                </Row>
            </Col>
            </Form>
        </Container>
    )
}

export default LoginPage