import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserShowPage = ({ users }) => {
  const { id } = useParams(); 

  const user = id
    ? users.find(w => w.id === Number(id))
    : null;

  if (!user) return <Container className="p-3">User not found</Container>;

  const entries = Object.entries(user);

  return (
    <Container
      className="p-3 border border-light rounded bg-dark text-light"
      style={{ width: "40%", marginTop: "2%" }}
    >
      <h2 className="border-bottom pb-2" style={{ fontSize: "1.25rem" }}>
        User Details
      </h2>

      {entries.map(([key, value]) => (
        <Row key={key} className="mb-2">
          <Col>
            <div className="fw-bold mb-1">{key}</div>
            <div className='border border-light rounded' style={{padding: "5px 5px 6px 10px"}}>
              {Array.isArray(value) ? value.join(', ') : (key === "color" ? 
                <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: user.color,
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}/>
              : value)}
            </div>
          </Col>
        </Row>
      ))}
      <Col style={{ flex: '0 0 4%' }} className="text-end">
        <Button variant="primary" size="sm">
          <Nav.Link as={Link} to={"/users/edit/"+user.id}>
            Edit
          </Nav.Link>
        </Button>
      </Col>
    </Container>
  )
}

export default UserShowPage;
