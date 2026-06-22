import React, { createContext, useContext, useState, useEffect } from "react";
import { dayStatusDict, dayStatusIdDict } from "../constants";
import { dateToString } from "../util";
import { apiGet, apiPost, apiPut } from "../api/api";
import {UsersContext} from './UserContext'
import {useToast} from './ToastContext'

export const DayStatusContext = createContext();

export const DayStatusProvider = ({ children }) => {
  const { addToast } = useToast();

  const { users, loading: usersLoading } = useContext(UsersContext)

  const [dayStatusDict, setDayStatusDict] = useState({});
  
  const dayStatusIdDict = Object.fromEntries(
    Object.entries(dayStatusDict).map(([key, value]) => [value, key])
  );

  const statusOptions = Object.keys(dayStatusDict);
  
  const statusShortcuts = statusOptions.reduce((acc, status) => {
    const text = status.toLowerCase();
    for (const char of text) {
      if (char === ' ' || acc[char]) continue;
      acc[char] = status;
      break;
    }
    return acc;
  }, {});
  
  const [guestDayStatuses, setGuestDayStatuses] = useState({});
  const [dayStatuses, setDayStatuses] = useState({})

  const [loading, setLoading] = useState(true);

  const getStatuses = async () => {
    try {
      const res = await apiGet("/user-statuses");
      res.forEach((status) => {
        dayStatusDict[status.status.name] = status.id;
      });
      setDayStatusDict(dayStatusDict);
      return res;
    } catch (err) {
      console.error("Failed to fetch user statuses:", err);
      return null;
    }
  }

  const normalizeStatusId = (status) => {
    if (typeof status === 'number') return status;
    if (typeof status === 'string') return dayStatusDict[status] ?? null;
    return status;
  };

  const setStatus = async (date, id, status) => {
    try {
      const entry = dayStatuses[date]?.[id]
      if(entry) {
        const statusId = normalizeStatusId(status);
        const res = await apiPut("/user-day-statuses/" + entry.id, {
          day_id: entry.dayId,
          user_id: id,
          user_status_id: statusId,
        });
        return res;
      }else{
        const statusId = normalizeStatusId(status);
        const res = await apiPost("/user-day-statuses", {
          date: date,
          user_id: id,
          user_status_id: statusId,
        });
        return res;
      }
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
      await setStatus(dateStr, id, statusId).then(r => {
        if (r.status === 200 || r.status === 201) {
          calendarDict[dateStr] = {
            ...calendarDict[dateStr],
            [id]: {statusId: r.data.user_status_id, id: r.data.id, dayId: r.data.day_id},
          };
        }else{
          addToast("Failed to update status for " + dateStr, "danger");
        }
      })
      date.setDate(date.getDate() + 1);
    }
    setDayStatuses(calendarDict);
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

      lastPage = f.last_page ?? 1;
      const pageData = Array.isArray(f.data) ? f.data : f.data?.data || [];
      records = [...records, ...pageData];
      curPage++;
    }

    const calendarDict = {};
    const guestCalendarDict = {}
    
    records.sort((a,b)=> a.id - b.id)
    records.forEach((record) => {
      const id = record.id;
      const date = record.day.name;
      const dayId = record.day_id;
      const userId = parseInt(record.user_id);
      const statusId = record.user_status_id;
      
      const isGuest = users.find(user => user.id === userId)?.roles.includes('courier-guest');

      if (isGuest) {
        if (!guestCalendarDict[date]) {
          guestCalendarDict[date] = {};
        }
        guestCalendarDict[date][userId] = {statusId: statusId, id: id, dayId: dayId};
      }else{
        if (!calendarDict[date]) {
          calendarDict[date] = {};
        }
        calendarDict[date][userId] = {statusId: statusId, id: id, dayId: dayId};
      }

    });
    setGuestDayStatuses(guestCalendarDict);
    setDayStatuses(calendarDict);
    setLoading(false);
  };

  useEffect(() => {
    if (usersLoading) return;

    const loadStatuses = async () => {
      await getStatuses();
      await getAllStatuses();
    };

    loadStatuses();
  }, [usersLoading]);

  return (
    <DayStatusContext.Provider value={{ dayStatuses, setDayStatuses, loading, setStatuses,
      dayStatusDict, setDayStatusDict, dayStatusIdDict, statusOptions, statusShortcuts,
      guestDayStatuses, setGuestDayStatuses }}>
      {children}
    </DayStatusContext.Provider>
  );
};
