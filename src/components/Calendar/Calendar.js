import React, { useState, useEffect, useContext } from 'react';
import CalendarMonth from '../../components/Calendar/CalendarMonth'
import { dateToString, monthsBetween} from '../../util'
import { UsersContext } from '../../contexts/UserContext';
import { DayStatusContext } from '../../contexts/DayStatusContext';

const Calendar = ({startDate, endDate}) => {

    const {couriers, loading} = useContext(UsersContext); 
    const {dayStatuses,loading: dayStatusLoading, dayStatusIdDict} = useContext(DayStatusContext)

    const [openIndex, setOpenIndex] = useState(null);

    const [calendarDict, updateCalendarDict] = useState({})
    
    useEffect(() => {
      if (!dayStatusLoading){

        const calendarDict = {};
        let date = new Date(startDate);
        
        while (date <= endDate) {
        
          const key = dateToString(date);
          const courierDict = {};

          for (let courier of couriers) {
            if(dayStatuses[key]?.[courier.id]){
              courierDict[courier.id] = dayStatusIdDict[dayStatuses[key]?.[courier.id]]
            }else{
              courierDict[courier.id] = courier.roles.includes("guest") ?  "off" : "working";
            }
          }
          calendarDict[key] = courierDict;
          
          date.setDate(date.getDate() + 1);
        }
        updateCalendarDict(calendarDict);
      }
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

    const startMonth = startDate.getMonth();
    const monthCount = monthsBetween(startDate, endDate) + 1;
    const orderedMonths = [...Array(monthCount)].map((_, i) => (startMonth + i) % 12);
    const currentYear = startDate.getFullYear();

  if (!couriers.length || Object.keys(calendarDict).length === 0 || ! (dateToString(startDate) in calendarDict)) {
    return <></>;
  }

  return (
    <div>
      {(!loading && !dayStatusLoading) && (
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
