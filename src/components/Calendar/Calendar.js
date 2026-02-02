import React, { useState, useEffect, useContext } from 'react';
import CalendarMonth from '../../components/Calendar/CalendarMonth'
import { dateToString, monthsBetween} from '../../util'
import { UsersContext } from '../../contexts/UserContext';
import { DayStatusContext } from '../../contexts/DayStatusContext';
import { dayStatusIdDict } from '../../constants';

const Calendar = ({startDate, endDate}) => {

    const {couriers, loading} = useContext(UsersContext); 
    const {dayStatuses} = useContext(DayStatusContext)

    const [openIndex, setOpenIndex] = useState(null);

    const [calendarDict, updateCalendarDict] = useState({})

    useEffect(() => {
      const calendarDict = {};
      let date = new Date(startDate);

      while (date <= endDate) {

        const key = dateToString(date);
        const courierDict = {};

        for (let courier of couriers) {

          if(dayStatuses[key]?.[courier.id]){
            courierDict[courier.id] = dayStatusIdDict[dayStatuses[key]?.[courier.id]]
          }else{
            courierDict[courier.id] = courier.roles.includes("guest") ?  "OFF" : "WORKING";
          }
        }
        calendarDict[key] = courierDict;

        date.setDate(date.getDate() + 1);
      }
      updateCalendarDict(calendarDict);
    }, [couriers, startDate, endDate, dayStatuses]);

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('[data-courier]')) {
            setOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const currentMonthIndex = startDate.getMonth();
    const arr = [...Array(monthsBetween(startDate, endDate) + 1)].map((_, i) => i % 12);
    const orderedMonths = [
        ...arr.slice(currentMonthIndex),
        ...arr.slice(0, currentMonthIndex)
    ];

    const currentYear = startDate.getFullYear()

  if (!couriers.length || Object.keys(calendarDict).length === 0 || ! (dateToString(startDate) in calendarDict)) {
    return <></>;
  }

  return (
    <div>
      {!loading && (
        <div>
          {orderedMonths.map((month, i) => 
            <CalendarMonth
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              key={month + "" + i}
              month={month}
              year={currentYear+Math.floor((i+orderedMonths[0])/12)}
              calendar={calendarDict}
              endDate={endDate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
