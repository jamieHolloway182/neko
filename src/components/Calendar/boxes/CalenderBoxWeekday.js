import React from 'react'

const CalendarBoxWeekday = ({weekday}) => {
  return (
    <div id="container" style={styleSheet.container}>
        <p id="text" style={styleSheet.text}>
          {weekday}
        </p>
    </div>
  )
}

const styleSheet = {
    container : 
        {
            backgroundColor: '#40403b',
            fontWeight: 'bold',
            border: "1px solid black",
            padding: "1px 0px"

        },
    text:
        {
            margin : "0px 0px 0px 2px"
        }
}
export default CalendarBoxWeekday