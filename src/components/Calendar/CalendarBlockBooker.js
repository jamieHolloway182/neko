import React, { useState, useRef, useContext } from 'react';
import { Button, Dropdown, Row, Col, Form } from 'react-bootstrap';
import { shiftOptions } from '../../constants';
import { UsersContext } from '../../contexts/UserContext';
import { DayStatusContext } from '../../contexts/DayStatusContext';

const CalendarBlockBooker = ({startDate, endDate}) => {

  const {couriers} = useContext(UsersContext); 
  const {setStatuses} = useContext(DayStatusContext)

  const [selectedUser, selectUser] = useState(null);
  const [selectedStatus, selectStatus] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const resetInputs = () => {
    if (!startRef.current.value || !endRef.current.value) return;
    if (startRef.current.value >= endRef.current.value) {
      alert('End Date must be after Start Date');
      return;
    }
    setStatuses(startRef.current.value, endRef.current.value, selectedUser.id, selectedStatus);

    startRef.current.value = '';
    endRef.current.value = '';
    selectUser(null);
    selectStatus(null);
  };

  const submitReady =
    !!startRef.current?.value &&
    !!endRef.current?.value &&
    selectedUser != null &&
    selectedStatus != null;

  const dropdownMenuStyle = {
    backgroundColor: '#343a40',
    minWidth: '10rem',
  };

  const dropdownItemStyle = {
    backgroundColor: 'transparent',
    color: 'white',
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#495057',
  };

  // Fixed width for toggle so it doesn't resize
  const toggleStyle = {
    width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div className="p-3 border rounded bg-dark text-light" style={styleSheet.container}>
      <h5>Book shifts between dates:</h5>

      <Row className="mb-2 align-items-center">
        <Col xs="auto">
          <Form.Label className="text-light">Start Date:</Form.Label>
          <Form.Control
            type="date"
            ref={startRef}
            min={startDate.toISOString().split("T")[0]}
            max={endDate.toISOString().split("T")[0]}
            className="bg-secondary text-light border-0"
          />
        </Col>
        <Col xs="auto">
          <Form.Label className="text-light">End Date:</Form.Label>
          <Form.Control
            type="date"
            ref={endRef}
            min={startDate.toISOString().split("T")[0]}
            max={endDate.toISOString().split("T")[0]}
            className="bg-secondary text-light border-0"
          />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" style={toggleStyle}>
              {selectedUser?.name ?? 'Select User'}
            </Dropdown.Toggle>
            <Dropdown.Menu style={dropdownMenuStyle}>
              {couriers.map(user => (
                <Dropdown.Item
                  key={user.id}
                  active={selectedUser?.id === user.id}
                  onClick={() => selectUser(user)}
                  style={dropdownItemStyle}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = dropdownItemStyle.backgroundColor)}
                >
                  {user.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" style={toggleStyle}>
              {selectedStatus ?? 'Select Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu style={dropdownMenuStyle}>
              {shiftOptions.map((status, i) => (
                <Dropdown.Item
                  key={i}
                  active={selectedStatus === status}
                  onClick={() => selectStatus(status)}
                  style={dropdownItemStyle}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = dropdownItemStyle.backgroundColor)}
                >
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {submitReady && (
        <Button variant="primary" onClick={resetInputs}>
          Apply Changes
        </Button>
      )}
    </div>
  );
};

const styleSheet = {
  container: {
    margin: '0px 0px 3% 0px'
  }
}

export default CalendarBlockBooker;
