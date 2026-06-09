import React, { useState, useRef, useEffect, useContext, useMemo} from 'react';
import { useParams } from 'react-router-dom';
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
import { rolesDict } from '../../constants';
import { validateEmail, validatePasswords } from '../../util';
import { UsersContext } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { apiPut } from '../../api/api';

const UserEditPage = () => {

  const { users, setUsers} = useContext(UsersContext); 
  const { addToast } = useToast();

  const navigate = useNavigate();

  const { id } = useParams();
  const user = id ? users.find((u) => u.id === Number(id)) : null;

  const [editableUser, setEditableUser] = useState({});
  const [currentTooltip, setCurrentTooltip] = useState({ key: '', value: '' });

  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const refDict = useMemo(() => ({
    name: nameRef,
    role: roleRef,
    email: emailRef,
    phone: phoneRef,
    password: passwordRef,
    passwordConfirmation: passwordConfirmationRef,
  }), []);

  const handleChange = (key, value) => {
    setEditableUser((prev) => ({ ...prev, [key]: value}));
  };

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(refDict).some(
          (r) => r.current && r.current.contains(e.target)
        )
      ) {
        setCurrentTooltip({ key: '', value: '' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refDict]);

  useEffect(() => {
    if (user) {
      setEditableUser({
        ...user,
        password: '',
        password_confirmation: '',
      });
    }
  }, [user]);

  const update = () => {
    // Validate empty fields
    for (let [key, value] of Object.entries(editableUser)) {
      if (key === 'id') continue;
      if (key === 'phone') continue;
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setCurrentTooltip({ key, value: 'Please fill in this field' });
        return;
      }
    }

    const emailError = validateEmail(editableUser.email, users, parseInt(id));
    if (emailError) {
      setCurrentTooltip({ key: 'email', value: emailError });
      return;
    }

    const passwordError = validatePasswords(
      editableUser.password,
      editableUser.password_confirmation
    );
    if (passwordError) {
      setCurrentTooltip({ key: 'password', value: passwordError });
      return;
    }


    //success areac
    const finalUser = {
      ...editableUser,
      role: editableUser.roles.map((r) => rolesDict[r]),
    };

    apiPut('/users/'+id, finalUser)
    .then((response) => {
      if(response.success){
        setUsers(prevUsers =>
          prevUsers.map(u => (u.id === editableUser.id ? editableUser : u))
        );
        navigate("/users", { replace: true });
        addToast("User edited successfully!");
      }
    })
    .catch(console.error);

  };

  if (!user) return <Container className="p-3">User not found</Container>;

  const entries = Object.entries(editableUser)

  return (
    <Container
      className="p-3 border border-light rounded bg-dark text-light"
      style={{ width: '40%', marginTop: '2%' }}
    >
      <h2 className="border-bottom pb-2" style={{ fontSize: '1.25rem' }}>
        Edit User Details
      </h2>

      {entries.map(([key, value]) => {
        if (key === 'id') return null;
        
        const isArray = Array.isArray(value);

        return (
          <Row key={key} className="mb-3">
            <Col>
              <div className="fw-bold mb-1">
                {key === 'password_confirmation'
                  ? 'password confirmation'
                  : key}
              </div>

              {isArray ? (
                <div ref={refDict[key]}>
                  <RolesDropdown
                    value={value}
                    setValue={(newVal) => handleChange(key, newVal)}
                  />
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <Form.Control
                    ref={refDict[key]}
                    type={key.includes('password') ? 'password' : 'text'}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #495057',
                      color: '#fff',
                      padding: '5px 5px 6px 10px',
                    }}
                  />
                </div>
              )}

              {/* Tooltip */}
              {key === currentTooltip.key && (
                <Overlay
                  target={refDict[key].current}
                  placement="right"
                  show={true}
                >
                  {(props) => (
                    <Tooltip {...props}>{currentTooltip.value}</Tooltip>
                  )}
                </Overlay>
              )}
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col className="text-end">
          <Button variant="primary" size="sm" onClick={update}>
            Update
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserEditPage;
