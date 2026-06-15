import React from 'react'
import Calendar from '../../components/Calendar/Calendar';
import { numMonthsInCalendar } from '../../constants';
import { now } from '../../util';
import CalendarBlockBooker from '../../components/Calendar/CalendarBlockBooker';
import CalendarLabel from '../../components/Calendar/boxes/CalendarLabel';

const CalendarPage = () => {

  const startDate = now();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + numMonthsInCalendar - 1);
  return (
    <div style={styleSheet.container}>
      <div style={{width:"70%"}}>
        <Calendar startDate={startDate} endDate={endDate} ></Calendar>
      </div>
      <div style={styleSheet.sideContainer}>
          <div style={styleSheet.blockBookerContainer}>
            <CalendarBlockBooker startDate={startDate} endDate={endDate}/>
          </div>
          <div style={styleSheet.labelContainer}>
            <CalendarLabel></CalendarLabel>
          </div>
      </div>
    </div>
  )
}

const styleSheet = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: '0.5%',
    marginTop: '0.5%',
  },
  monthsContainer: {
  },
  sideContainer : {
    position: 'sticky',
    zIndex: 3,
    top: '10px',
    marginLeft: '20px',
    height: 'fit-content',
    flex: 1,
  }
};

export default CalendarPage