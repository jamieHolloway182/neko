import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Overlay,
  Tooltip,
} from 'react-bootstrap';
import RolesDropdown from '../../components/Users/RolesDropdown';
import { apiPost } from '../../api/api';
import { rolesDict } from '../../constants';
import { validateEmail, validatePasswords } from '../../util';
import { UsersContext } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

const UserCreatePage = () => {

  const { users, setUsers} = useContext(UsersContext); 
  const {addToast} = useToast()
  const navigate = useNavigate();
  
  
  const [editableUser, setEditableUser] = useState({
    name: '',
    roles: [],
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const [currentTooltip, setCurrentTooltip] = useState({key:"", value:""});

  const nameRef = useRef(null);
  const rolesRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const refDict = {
    name: nameRef,
    roles: rolesRef,
    email: emailRef,
    phone: phoneRef,
    password: passwordRef,
    passwordConfirmation: passwordConfirmationRef,
  }

  const handleChange = (key, value) => {
    setEditableUser((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      setCurrentTooltip({key:"", value:""});
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createUser = (e) => {
    const finalUser = {
      ...editableUser,
      role: editableUser.roles.map((r) => rolesDict[r]),
    };

    for (let [k, v] of Object.entries(finalUser)){
        if(k === 'phone') continue;
        if (v.length === 0){
          e.stopPropagation();
          setCurrentTooltip({key:k, value:"Please fill in this field"});
          return;
        }
    }

    const emailStatus = validateEmail(finalUser.email, users)
    if (emailStatus){
      setCurrentTooltip({key:"email", value:emailStatus})
      return;
    }

    const passwordStatus = validatePasswords(finalUser.password, finalUser.password_confirmation)
    if (passwordStatus){
      setCurrentTooltip({key:"password", value:passwordStatus})
      return;
    }
    
    apiPost('/users', finalUser)
      .then((response) => {
        if (response.success){
          const newUser = {id: response.user.id, name: finalUser.name, email: finalUser.email, 
            phone:finalUser.phone, roles: finalUser.roles}
          setUsers([...users, newUser])
          addToast("User created successfully!");
          navigate("/users", { replace: true });
        }
      })
      .catch(console.error);
  };

  const entries = Object.entries(editableUser);

  return (
    <Container
      className="p-3 border border-light rounded bg-dark text-light"
      style={{ width: '40%', marginTop: '2%' }}
    >
      <h2 className="border-bottom pb-2" style={{ fontSize: '1.25rem' }}>
        User Details
      </h2>

      {entries.map(([key, value]) => {
        if (key === 'id') return null;

        return (
          <Row key={key} className="mb-3">
            <Col>
              <div className="fw-bold mb-1">
                {key === 'password_confirmation'
                  ? 'password confirmation'
                  : key}
              </div>

              {Array.isArray(value) ? (
                <div ref={refDict[key]}>
                  <RolesDropdown
                    value={value}
                    setValue={(newVal) =>
                      handleChange(key, newVal)
                    }
                  />
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <Form.Control
                    ref={refDict[key]}
                    type={key.includes('password') ? 'password' : 'text'}
                    value={value}
                    onChange={(e) =>
                      handleChange(key, e.target.value)
                    }
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #495057',
                      color: '#fff',
                      padding: '5px 5px 6px 10px',
                    }}
                  />
                    
                </div>
              )}
              {key === currentTooltip.key && <>
                <Overlay
                  target={refDict[key].current}
                  placement="right"
                  show={true} 
                >
                  {(props) => (
                    <Tooltip {...props}>
                      {currentTooltip.value}
                    </Tooltip>
                  )}
                </Overlay>
              </>}
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col className="text-end">
          <Button variant="primary" size="sm" onClick={(e) => createUser(e)}>
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCreatePage;
