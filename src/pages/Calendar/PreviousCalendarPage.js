import React, {useState} from 'react'
import PageSelector from '../../components/Layout/PageSelector'
import Calendar from '../../components/Calendar/Calendar';
import { now } from '../../util';

const PreviousCalendarPage = () => {

  const pages = Array.from(
    { length: now().getFullYear() - 2023 + 1 },
    (_, i) => `${2023 + i}`
  )

  const [active, setActive] = useState(pages[0]);

  const startDate = new Date(active+'-01-01');
  var cur = now()
  const endDate =
    startDate.getFullYear() === cur.getFullYear()
      ? new Date(cur.getTime() - 24 * 60 * 60 * 1000)
      : new Date(active + '-12-31');

  return (
    <div className="text-center text-light" style={{width:"70%"}}>
      <PageSelector
      className="pb-1"
        items={pages}
        active={active}
        onChange={setActive}
      />
      <Calendar startDate={startDate} endDate={endDate}></Calendar>
    </div>
  );
};

export default PreviousCalendarPage