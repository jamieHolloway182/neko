import React, {useContext} from 'react';
import CalendarDropdown from './CalendarDropdown';
import { guestColor, statusDictionary } from '../../../constants';
import { dateToString } from '../../../util';
import { useLocation } from 'react-router-dom'
import { DayStatusContext } from '../../../contexts/DayStatusContext';

const CalendarBoxUser = ({
  name,
  color,
  isOpen,
  onToggle,
  fullDate,
  id,
  calendar,
  setOpenIndex,
  isGuest,
  index
}) => {

  const status = calendar[dateToString(fullDate)]?.[id] ?? "";

  const { setStatuses} = useContext(DayStatusContext); 
  

  const {pathname} = useLocation()
  const isPrevious = pathname.includes('previous')

  const handleKeyDown = (event) => {
    if (event.key in statusDictionary) {
      setOpenIndex(null);
      setStatuses(fullDate, fullDate, id, statusDictionary[event.key])
    }
  };

  if (status === "OFF") color = 'lightgrey';
  else if (status === "HOLIDAY") color = 'grey';
  else if (status === "OFF req") color = 'darkgrey';
  else if (isGuest) color = guestColor;
  else  color = index % 2 === 0 ? "red" : "blue"

  return (
    <div
      className={`calendarBox ${isPrevious ? 'disabled' : ''}`}
      style={{ ...styleSheet.container, 
        backgroundColor: color, 
        cursor: isPrevious ? "default" : "pointer",
        borderColor: isOpen ? "white" : "black"
      }}
      tabIndex={!isPrevious ? 0 : -1}
      onClick={!isPrevious ? onToggle : undefined}
      onKeyDown={!isPrevious ? handleKeyDown : undefined}
      onMouseDown={isPrevious ? (e) => e.preventDefault() : undefined}
    >
      <p style={{ ...styleSheet.text, color: color === 'black' ? 'white' : 'black' }}>
        {name + ' ' + (status === "WORKING" ? "" : status)}
      </p>

      {isOpen && (
        <CalendarDropdown
          setStatus={setStatuses}
          id={id}
          fullDate={fullDate}
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

export default CalendarBoxUser;
