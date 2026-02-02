export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export const monthIndexes = {"January":0,"February":1,"March":2,"April":3,"May":4,"June":5,"July":6,"August":7,"September":8,"October":9,"November":10,"December":11};

export const shiftOptions = ["WORKING","OFF", "OFF req", "DISPATCH", "HOLIDAY", "MECH"]

export const statusDictionary = {
    "w" : "WORKING",
    "o" : "OFF",
    "r" : "OFF req",
    "d" : "DISPATCH",
    "h" : "HOLIDAY",
    "m" : "MECH"
}

export const numMonthsInCalendar = 12

export const guestColor = 'orange'

export const userRoles = ["superadmin", "admin", "manager", "client_admin", "courier", "guest"]

export const rolesDict = {"superadmin" : 1, "admin": 2, "manager" : 3, "client_admin" : 4, "courier" : 5, "guest" : 6}
export const rolesIdDict = { 1: "superadmin", 2: "admin", 3: "manager", 4: "client_admin", 5: "courier", 6: "guest" }

export const usersPerPage = 10

export const dayStatusDict = {"WORKING" : 2,"OFF" : 3, "OFF req" : 3, "DISPATCH" : 2, "HOLIDAY" : 1, "MECH": 2}
export const dayStatusIdDict = {1: "HOLIDAY", 2: "WORKING", 3: "OFF req"}