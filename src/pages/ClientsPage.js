import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import ClientsDetails from '../components/Clients/ClientsDetails'

const ClientsPage = () => {
  return (
    <div style={{margin: "2% 0px 0px 6.5%", width:"80%"}}>
        <h1 className="pb-2" style={{ fontSize: "1.75rem"}}>
            Clients
        </h1>
        <Row>
            <Col className="text-start">
                <Button variant="primary" size="sm" className='p-2'>
                    Add new Client
                </Button>
            </Col>
        </Row>
        <Form.Control
            type="text"
            placeholder='Search by ID'
            style={{
                backgroundColor: 'transparent',
                border: '1px solid #495057',
                color: '#fff',
                padding: "5px 5px 6px 10px",
            }}
        />
        <Form.Control
            type="text"
            placeholder='Search by Name'
            style={{
                backgroundColor: 'transparent',
                border: '1px solid #495057',
                color: '#fff',
                padding: "5px 5px 6px 10px",
            }}
        />
        <Form.Control
            type="text"
            placeholder='Search by Address'
            style={{
                backgroundColor: 'transparent',
                border: '1px solid #495057',
                color: '#fff',
                padding: "5px 5px 6px 10px",
            }}
        />
        <ClientsDetails></ClientsDetails>
    </div>
  )
}

export default ClientsPage