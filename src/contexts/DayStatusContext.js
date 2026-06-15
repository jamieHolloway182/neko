import React, { createContext, useState, useEffect } from "react";
import { dayStatusDict } from "../constants";
import { dateToString } from "../util";
import { apiGet, apiPost } from "../api/api";

export const DayStatusContext = createContext();

export const DayStatusProvider = ({ children }) => {
  const [dayStatuses, setDayStatuses] = useState({})
  const [loading, setLoading] = useState(true);

  const normalizeStatusId = (status) => {
    if (typeof status === 'number') return status;
    if (typeof status === 'string') return dayStatusDict[status] ?? status;
    return status;
  };

  const setStatus = async (date, id, status) => {
    try {
      const statusId = normalizeStatusId(status);
      const res = await apiPost("/user-day-statuses", {
        day_id: date,
        user_id: id,
        user_status_id: statusId,
      });
      return res;
    } catch (err) {
      console.error("Failed to set day status:", err);
      throw err;
    }
  };

  const setStatuses = async (start, end, id, status) => {
    const calendarDict = { ...dayStatuses };
    let date = new Date(start);
    const endDate = new Date(end);
    const statusId = normalizeStatusId(status);

    while (date <= endDate) {
      const dateStr = dateToString(date);
      await setStatus(dateStr, id, statusId);
      calendarDict[dateStr] = {
        ...calendarDict[dateStr],
        [id]: statusId,
      };
      date.setDate(date.getDate() + 1);
    }
    setDayStatuses(calendarDict);
    await getAllStatuses();
  };

  const fetchStatuses = async (page) => {
    try {
      const data = await apiGet("/user-day-statuses?page="+page);
      return data
    } catch (err) {
      console.error("Failed to fetch day statuses:", err);
      return null;
    }
  }

  const getAllStatuses = async () => {
    let records = [];
    let lastPage = 1;
    let curPage = 1;

    while (lastPage && curPage <= lastPage) {
      const f = await fetchStatuses(curPage);
      if (!f) break;

      lastPage = f.data?.last_page ?? 0;
      const pageData = Array.isArray(f.data) ? f.data : f.data?.data || [];
      records = [...records, ...pageData];
      curPage++;
    }
    console.log(records)
    const calendarDict = {};

    records.forEach((record) => {
      const date = record.day.name;
      const userId = record.user_id;
      const statusId = record.user_status_id;

      if (!calendarDict[date]) {
        calendarDict[date] = {};
      }
      calendarDict[date][userId] = statusId;
    });

    console.log("Fetched day statuses:", calendarDict);
    setDayStatuses(calendarDict);
    setLoading(false);
  };

  useEffect(() => {
    getAllStatuses()
  }, []);

  return (
    <DayStatusContext.Provider value={{ dayStatuses, setDayStatuses, loading, setStatuses }}>
      {children}
    </DayStatusContext.Provider>
  );
};
