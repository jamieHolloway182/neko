import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'

const ClientsDetails = () => {
  return (
    <Container>
        <Row
            className="align-items-center py-2"
            style={{ width: '100%', flexWrap: 'nowrap' }}
        >
            <Row
            className="align-items-center"
            style={{ flexWrap: 'nowrap', flex:"0 0 15%" }}>
                <Col className='ps-0 pe-0 fw-bold' style={{width:"50%"}}>
                        <div>ID</div>
                </Col>
                <Button variant="secondary" style={{width:"auto"}}>
                    Sort
                </Button>
            </Row>

            <Col className='fw-bold' style={{ flex: '1 1 auto' }}>
                <div>Name</div>
                
            </Col>
            <Col className='fw-bold' style={{ flex: '0 0 20%' }}>
                Billing Address
            </Col>
            <Col className='fw-bold' style={{ flex: '0 0 15%' }}>
                Phone Number
            </Col>
            <Col className='fw-bold' style={{ flex: '0 0 25%' }}>
                Actions
            </Col>
        </Row>
    </Container>
  )
}

export default ClientsDetails