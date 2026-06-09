import React, { createContext, useState, useEffect } from "react";
import { dayStatusDict } from "../constants";
import { dateToString } from "../util";

export const DayStatusContext = createContext();

export const DayStatusProvider = ({ children }) => {
  const [dayStatuses, setDayStatuses] = useState({})
  const [loading, setLoading] = useState(true);

  const setStatuses = (start, end, id, status) => {
    var calendarDict = { ...dayStatuses };
    let date = new Date(start);
    let endDate = new Date(end);

    while (date <= endDate) {
      const key = dateToString(date);
      if (!(key in calendarDict)) {
        calendarDict[key] = {};
      }
      calendarDict[key][id] = dayStatusDict[status];
      date.setDate(date.getDate() + 1);
    }
    setDayStatuses(calendarDict);
  };

  useEffect(() => {
    const today = new Date();
    const dayStatusesDummy = {};

    for (let offset = 0; offset < 5; offset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);
      const key = dateToString(date);
      dayStatusesDummy[key] = {
        1: dayStatusDict.WORKING,
        2: offset % 2 === 0 ? dayStatusDict.OFF : dayStatusDict.WORKING,
        3: dayStatusDict.HOLIDAY
      };
    }

    setDayStatuses(dayStatusesDummy);
    setLoading(false);
  }, []);

  return (
    <DayStatusContext.Provider value={{ dayStatuses, setDayStatuses, loading, setStatuses }}>
      {children}
    </DayStatusContext.Provider>
  );
};
