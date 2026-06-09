import React from 'react'
// " : "WORKING",
//     "o" : "OFF",
//     "r" : "OFF req",
//     "d" : "DISPATCH",
//     "h" : "HOLIDAY",
//     "m" : "MECH"

const CalendarLabel = () => {
  return (
    <div style={styleSheet.container}>
        <div style={styleSheet.title}>Status Keyboard Shortcuts:</div>
        <div>WORKING - w</div>
        <div>OFF req - r</div>
        <div>DISPATCH - d</div>
        <div>HOLIDAY - h</div>        
        <div>MECH - m</div>
    </div>
  )
}

const styleSheet = {
    container : {
        textAlign : 'left'
    },
    title : {
        fontWeight: 700
    }
}

export default CalendarLabel