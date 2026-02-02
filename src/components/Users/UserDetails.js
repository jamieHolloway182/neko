import React, {useContext} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiDelete } from '../../api/api';
import {useToast} from '../../contexts/ToastContext'
import { UsersContext } from '../../contexts/UserContext';

const UserDetails = ({ user }) => {

  const { addToast } = useToast();
  const { users, setUsers} = useContext(UsersContext); 
  
  
  const deleteUser = () => {
    apiDelete('/users/'+ user.id)
    .then((response) => {
      if(response.success){
        addToast("User deleted successfully!");
        setUsers(users.filter(u => u.id !== user.id))
      }else{
        addToast("User deletion failed!");
      }
    })
    .catch(console.error);
  }

  return (
    <Row
      className="align-items-center py-2 border-bottom"
      style={{ width: '100%', flexWrap: 'nowrap' }}
    >
      <Col style={{ flex: '0 0 4%' }}>
        <strong>{user.id}</strong>
      </Col>

      <Col style={{ flex: '0 0 10%' }}>
        <strong>{user.name}</strong>
      </Col>

      <Col style={{ flex: '0 0 22%' }}>
        <strong>{user.email}</strong>
      </Col>

      <Col style={{ flex: '0 0 12%' }}>
        <strong>{user.phone}</strong>
      </Col>

      <Col style={{ flex: '0 0 6%' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: user.color,
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </Col>

      <Col style={{ flex: '1 1 auto' }}>
        <strong>{user.roles.join(', ')}</strong>
      </Col>

      <Col style={{ flex: '0 0 4%' }} className="text-end">
        <Button variant="primary" size="sm">
          <Nav.Link as={Link} to={"/users/show/"+user.id}>
            More
          </Nav.Link>
        </Button>
      </Col>

      <Col style={{ flex: '0 0 4%' }} className="text-end">
        <Button variant="primary" size="sm">
          <Nav.Link as={Link} to={"/users/edit/"+user.id}>
            Edit
          </Nav.Link>
        </Button>
      </Col>

      <Col style={{ flex: '0 0 4%' }} className="text-end">
        <Button variant="primary" size="sm" onClick={deleteUser}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default UserDetails;
