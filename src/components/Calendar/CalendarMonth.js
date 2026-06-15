import React from 'react';
import { getFirstWeekday, getDaysInMonth } from '../../util';
import CalendarWeek from './CalendarWeek';
import { months } from '../../constants';

const calculateNumRows = (month, year, firstWeekday, endDate) => {
  const daysInMonth = getDaysInMonth(month, year);

  let allowedDays = daysInMonth;

  if (
    endDate &&
    endDate.getFullYear() === year &&
    endDate.getMonth() === month
  ) {
    allowedDays = endDate.getDate();
  }
  return Math.ceil((firstWeekday + allowedDays) / 7);
};

const CalendarMonth = ({
  month,
  openIndex,
  setOpenIndex,
  year,
  calendar,
  endDate,
}) => {

  const firstWeekday = getFirstWeekday(month, year);

  const numRows = calculateNumRows(
    month,
    year,
    firstWeekday,
    endDate
  );

  return (
    <div>
      <div id="monthHeader" style={styleSheet.monthHeader}>
        <div id="text" style={styleSheet.text}>
          {months[month]} {year}
        </div>
      </div>

      {Array.from({ length: numRows }, (_, i) => (
        <CalendarWeek
          key={i}
          index={i}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          firstWeekday={firstWeekday}
          year={year}
          month={month}
          calendar={calendar}
          endDate={endDate}
        />
      ))}
    </div>
  );
};

const styleSheet = {
  monthHeader: {
    backgroundColor: 'cornflowerblue',
    border: '1px solid black',
    textAlign: 'left',
    paddingLeft: '2px',
    boxSizing: 'border-box',
    fontWeight: 'bold',
  },
  text: {
    margin: 0,
  },
};

export default CalendarMonth;
