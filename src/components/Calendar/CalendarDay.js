import React, {useContext} from 'react'
import CalendarBoxWeekday from './boxes/CalenderBoxWeekday'
import CalendarBoxUser from './boxes/CalendarBoxUser'
import CalendarBoxDate from './boxes/CalenderBoxDate'
import CalendarBoxEmpty from './boxes/CalendarBoxEmpty'
import { getDaysInMonth, dateToString } from '../../util'
import { now } from '../../util'
import { UsersContext } from '../../contexts/UserContext'
import { DayStatusContext } from '../../contexts/DayStatusContext'
import { useLocation } from 'react-router-dom'
import CalendarGuestBox from './boxes/CalendarGuestBox'

const CalendarDay = ({weekday, month, date, weekCount, firstWeekday, openIndex, setOpenIndex, year, calendar}) => {
  
  const { users, couriers, guests} = useContext(UsersContext);
  const {guestDayStatusDict, dayStatusDict} = useContext(DayStatusContext)
  
  const {pathname} = useLocation()
  const isPrevious = pathname.includes('previous')

  const daysInMonth = getDaysInMonth(month)

  const currentMonthIndex = now().getMonth()
  const currentYear = now().getFullYear()

  const calendarDate = date + 1 - firstWeekday + (weekCount * 7)
  var isValidDate;

  if (currentMonthIndex === month && currentYear === year){
    if (isPrevious){
      isValidDate = calendarDate < now().getDate() && calendarDate <= daysInMonth && calendarDate > 0

    }else{
      isValidDate = calendarDate >= now().getDate() && calendarDate <= daysInMonth
    }
  }else{
    isValidDate = calendarDate > 0 && calendarDate <= daysInMonth
  }

const fullDate = new Date(year + '-' + (month + 1) + '-' + calendarDate)

  const usedGuests = guestDayStatusDict[dateToString(fullDate)]
  ? Object.entries(guestDayStatusDict[dateToString(fullDate)])
      .filter(([_, value]) => value === dayStatusDict["working"])
      .map(([key]) => Number(key))
  : [];
  
  return (
    <div id="container" style={styleSheet.container}>
        <CalendarBoxWeekday weekday={weekday}></CalendarBoxWeekday>

        {isValidDate ? 
            <CalendarBoxDate date={calendarDate} note={""}></CalendarBoxDate> :
            <CalendarBoxEmpty isDateBox={true}></CalendarBoxEmpty>
        }
        <div id="usersContainer" style={styleSheet.usersContainer}>
            {couriers.map((courier, index) => isValidDate ? 
                  <div>
                    <CalendarBoxUser key={index} 
                        index={index} //temp until colors implemented
                        id={courier.id} 
                        name={courier.name} 
                        color={courier.color} 
                        isOpen={openIndex === (index+"/"+calendarDate+"/"+month)} 
                        fullDate={fullDate}
                        calendar={calendar}
                        setOpenIndex={setOpenIndex}
                        onToggle={() => setOpenIndex(openIndex === (index+"/"+calendarDate+"/"+month) ? null : (index+"/"+calendarDate+"/"+month))}
                    ></CalendarBoxUser> 
                  </div>
                :
                <CalendarBoxEmpty></CalendarBoxEmpty>
            )}
            {Array.from({ length: usedGuests.length + (usedGuests.length === guests.length ? 0 : 1) })
              .map((_, index) => isValidDate ? (
              <CalendarGuestBox 
                key={index} 
                index={index+couriers.length} 
                fullDate={fullDate}
                name={index < usedGuests.length ? users.find(user => user.id === usedGuests[index])?.name : "+"}
                isOpen={openIndex === ((index+couriers.length)+"/"+calendarDate+"/"+month)} 
                setOpenIndex={setOpenIndex}
                usedGuests={usedGuests}
                guests={guests}
                openIndex={openIndex} 
                onToggle={() => setOpenIndex(openIndex === ((index+couriers.length)+"/"+calendarDate+"/"+month) ? null : 
                  ((index+couriers.length)+"/"+calendarDate+"/"+month))}

              />
            ) : 
            <CalendarBoxEmpty></CalendarBoxEmpty>
            )}
        </div>
    </div>
  )
}

const styleSheet = {
    container : {
        flex: 1
    }
}

export default CalendarDay