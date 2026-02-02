import React, { createContext, useState, useEffect } from "react";
import { apiGet } from "../api/api"; 
import { dayStatusDict } from "../constants";
import { dateToString } from "../util";

export const DayStatusContext = createContext();

export const DayStatusProvider = ({ children }) => {
  const [dayStatuses, setDayStatuses] = useState([])
  const [loading, setLoading] = useState(true);

  const setStatuses = (start, end, id, status) => {
    var calendarDict = {...dayStatuses};
    let date = new Date(start);
    let endDate = new Date(end)

    while (date <= endDate) {
      const key = dateToString(date);
      if (!(key in calendarDict)){
        calendarDict[key] = {}
      }
      calendarDict[key][id] = dayStatusDict[status]
      date.setDate(date.getDate() + 1);
    }
    setDayStatuses(calendarDict)
  }

  const processData = (data) => {
    let dict = {}
    for (let status of data){
      if(status.user){
        let date = status.day.name
        if (!(date in dict)){
            dict[date] = {}
        }
        dict[date] = { ...dict[date], [status.user.id]: status.user_status_id }
      }
    }
    return dict
  }

  useEffect( () => {
    const fetchUsers = async (page) => {
      try {
        const data = await apiGet("/user-day-statuses?page="+page);
        return data
      } catch (err) {
        console.error("Failed to fetch day statuses:", err);
        return null;
      }
    };

    const getAllDayStatuses = async () => {

      let data = []
      let lastPage = 1
      let curPage = 1
      while (lastPage && curPage <= lastPage){
  
        let f = await fetchUsers(curPage);
        if (f){
          lastPage = f.last_page
          data = [...data, f.data]
          curPage++
        }else{
          break;
        }
      }
      setDayStatuses(processData(data.flat()))
      setLoading(false)
    }

    getAllDayStatuses()

  }, []);

  return (
    <DayStatusContext.Provider value={{ dayStatuses, setDayStatuses, loading, setStatuses }}>
      {children}
    </DayStatusContext.Provider>
  );
};
