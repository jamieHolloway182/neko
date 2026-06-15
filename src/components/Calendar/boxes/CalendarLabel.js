import React, {useContext} from 'react'
import {DayStatusContext} from '../../../contexts/DayStatusContext'
// " : "WORKING",
//     "o" : "OFF",
//     "r" : "OFF req",
//     "d" : "DISPATCH",
//     "h" : "HOLIDAY",
//     "m" : "MECH"

const CalendarLabel = () => {
    const {statusShortcuts} = useContext(DayStatusContext)
    

  return (
    <div style={styleSheet.container}>
        <div style={styleSheet.title}>Status Keyboard Shortcuts:</div>
        {statusShortcuts && Object.entries(statusShortcuts).map(([key, value]) => (
            <div key={key}>{key} : {value}</div>
        ))}
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