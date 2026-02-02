import React from 'react'

const CalendarBoxEmpty = ({isDateBox}) => {
  return (
    <div id="container" style={{...styleSheet.container, backgroundColor : isDateBox ? "grey" : "transparent"}}>
    </div>
  )
}

const styleSheet = {
  container: {
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    padding: '0 2px', // horizontal only
    boxSizing: 'border-box'
    }
};

export default CalendarBoxEmpty