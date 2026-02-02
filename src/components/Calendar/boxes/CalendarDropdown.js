import React, { useState } from 'react';
import { shiftOptions } from '../../../constants';

const CalendarDropdown = ({ setStatus, id, fullDate }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      style={styleSheet.wrapper}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div style={styleSheet.menu}>
        {shiftOptions.map((option, index) => (
          <div
            key={option}
            onClick={() => setStatus(fullDate, fullDate, id, option)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              ...styleSheet.item,
              backgroundColor:
                hoveredIndex === index ? '#495057' : 'transparent'
            }}
          >
            {option}
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
