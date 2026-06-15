import React, { useState, useContext } from 'react';
import { DayStatusContext } from '../../../contexts/DayStatusContext';
import { UsersContext } from '../../../contexts/UserContext';

const CalendarDropdown = ({ setStatus, id=null, fullDate, isGuest=false, usedGuests=[], guests=[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { statusOptions, dayStatusDict} = useContext(DayStatusContext)
  
  const options = isGuest ? guests.filter(guest => !usedGuests.includes(guest.id)) : statusOptions;

  const handleClick = (option, index) => {
    if (isGuest) {
      setStatus(fullDate, fullDate, options[index].id, dayStatusDict["working"]);
    }else{
      setStatus(fullDate, fullDate, id, option);
    }
  };

  return (
    <div
      style={styleSheet.wrapper}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div style={styleSheet.menu}>
        {options.map((option, index) => (
          <div
            key={option.id || option}
            onClick={() => handleClick(option, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              ...styleSheet.item,
              backgroundColor:
                hoveredIndex === index ? '#495057' : 'transparent'
            }}
          >
            {option.id ? option.name : option}
          </div>
        ))}
      </div>
    </div>
  );
};

const styleSheet = {
  wrapper: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    zIndex: 10,
    minWidth: '100%'
  },
  menu: {
    backgroundColor: '#343a40',
    border: '0px',
    borderRadius: '0.25rem',
    padding: '0.25rem 0',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.3)',
    whiteSpace: 'nowrap'
  },
  item: {
    padding: '4px 8px',
    cursor: 'pointer',
    color: '#fff'
  }
};

export default CalendarDropdown;
