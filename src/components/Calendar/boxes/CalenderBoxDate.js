import React from 'react'

const CalendarBoxDate = ({date, note}) => {
  return (
    <div id="container" style={styleSheet.container}>
        <p id="text" style={styleSheet.text}>
          {date + " " + note}
        </p>
    </div>
  )
}

const styleSheet = {
  container: {
    height: '25px',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'grey',
    border: '1px solid black',
    padding: '0 2px',
    boxSizing: 'border-box'
  },
  text: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1'
  }
};

export default CalendarBoxDate