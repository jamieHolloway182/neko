import React from 'react'
import CalendarDay from './CalendarDay'
import { weekdays} from '../../constants'
import { now } from '../../util';
import {useLocation} from 'react-router-dom'

const CalendarWeek = ({index, firstWeekday, month, openIndex, setOpenIndex, year, calendar}) => {

  const {pathname} = useLocation()
  const isPrevious = pathname.includes('previous')

  const dayOfMonth = now().getDate();
  const currentMonthIndex = now().getMonth();
  const currentYear = now().getFullYear()

  const weekInCalendarMonth = Math.floor((firstWeekday + dayOfMonth - 1) / 7)
  const isValidWeek = (currentMonthIndex === month && currentYear === year) ? 
    (isPrevious ? (weekInCalendarMonth >= index) : (weekInCalendarMonth <= index)) : true

  return (
    <div>
        {isValidWeek && <div id="weekdaysContainer" style={styleSheet.weekdaysContainer}>
            {weekdays.map((weekday, i) => 
                <CalendarDay 
                    key={weekday} 
                    weekday={weekday} 
                    date={i} 
                    weekCount={index} 
                    firstWeekday={firstWeekday} 
                    month={month}
                    openIndex={openIndex} 
                    setOpenIndex={setOpenIndex} 
                    year={year} 
                    calendar={calendar}
                ></CalendarDay>
            )}
        </div>}
    </div>
  )
}

const styleSheet = {
    weekdaysContainer: {
        display: "flex",
        flexDirection : "row",
        textAlign: "left",
        marginBottom: "0.5%"
    }
}

export default CalendarWeek