import React, { useState, useRef, useEffect } from 'react';
import {Form } from 'react-bootstrap';
import { userRoles } from '../../constants';

const RolesDropdown = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (value.includes(option)) {
      setValue(value.filter(v => v !== option));
    } else {
      setValue([...value, option]);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <div
        className="border text-light p-2"
        style={{ cursor: 'pointer', backgroundColor: '#343a40' }}
        onClick={() => setOpen(prev => !prev)}
      >
        {value.length > 0 ? value.join(', ') : 'Select options'}
      </div>

      {open && (
        <div
          className="border bg-dark text-light"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: 1000,
            maxHeight: '150px',
            overflowY: 'auto'
          }}
        >
          {userRoles.map((option, i) => (
            <div
              key={i}
              className="p-2"
              style={{
                backgroundColor: value.includes(option) ? '#495057' : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => toggleOption(option)}
            >
              <Form.Check 
                type="checkbox"
                label={option}
                checked={value.includes(option)}
                readOnly
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RolesDropdown