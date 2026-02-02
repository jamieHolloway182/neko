import React, {useContext, useState} from 'react'
import UserDetails from './UserDetails';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../contexts/UserContext';
import PageSelector from '../../components/Layout/PageSelector'
import { usersPerPage } from '../../constants';

const UserList = () => {

  const { users} = useContext(UsersContext); 

  const pages = users.length === 0 ? [] : [...Array(Math.ceil(users.length / usersPerPage))].map((_, i) => i + 1);


  const [active, setActive] = useState(1)

  return (
    <div style={styleSheet.container}>
        {users.filter((user, i) => Math.ceil((i + 1) / usersPerPage) === active).map((user, i) => 
            <UserDetails
              key={i}
              user={user}
            ></UserDetails>
        )}
        <PageSelector items={pages} active={active} onChange={setActive}></PageSelector>
        <Button variant="primary" size="sm" className='mt-2 align-self-start'>
          <Nav.Link as={Link} to={"/users/create"}>
            Create User
          </Nav.Link>
        </Button>
    </div>
  )
}

const styleSheet = {
  container : {
    display: "flex",
    flexDirection: "column",
    marginLeft: '0.5%',
    marginTop: '0.5%',
    width: "100%",
    height: "100%",
    alignItems: "center"
  }
}

export default UserList