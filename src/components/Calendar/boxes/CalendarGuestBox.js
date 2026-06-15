import React, {useContext} from 'react';
import CalendarDropdown from './CalendarDropdown';
import { guestColor } from '../../../constants';
import { useLocation } from 'react-router-dom'
import { DayStatusContext } from '../../../contexts/DayStatusContext';

const CalendarGuestBox = ({
  name,
  color,
  isOpen,
  onToggle,
  fullDate,
  calendar,
  setOpenIndex,
  index,
  usedGuests,
  guests
}) => {

  const handleKeyDown = (event) => {
    if ((event.key === "Backspace" || event.key === "Delete") && name !== '+') {
      setStatuses(fullDate, fullDate, guests.find(guest => guest.name === name)?.id, dayStatusDict["off"]);
    }
  }

  const { setStatuses, dayStatusDict} = useContext(DayStatusContext); 

  const {pathname} = useLocation()
  const isPrevious = pathname.includes('previous')

  return (
    <div
      className={`calendarBox ${isPrevious ? 'disabled' : ''}`}
      style={{ ...styleSheet.container, 
        backgroundColor: guestColor, 
        cursor: isPrevious ? "default" : "pointer",
        borderColor: isOpen ? "white" : "black"
      }}
      tabIndex={!isPrevious ? 0 : -1}
      onKeyDown={!isPrevious ? handleKeyDown : undefined}
      onClick={!isPrevious ? onToggle : undefined}
      onMouseDown={isPrevious ? (e) => e.preventDefault() : undefined}
    >
      <p style={{ ...styleSheet.text, color: color === 'black' ? 'white' : 'black' }}>
        {name}
      </p>

      {(isOpen && name === '+') && (
        <CalendarDropdown
          setStatus={setStatuses}
          fullDate={fullDate}
          isGuest={true}
          usedGuests={usedGuests}
          guests={guests}
        />
      )}
    </div>
  );
};

const styleSheet = {
  container: {
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    padding: '0 2px',
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
  },
  text: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1',
  },
};

export default CalendarGuestBox;
