// Your code here
function createEmployeeRecord(arr) {
    const obj = {}
    obj.timeInEvents = []
    obj.timeOutEvents = []
    obj.firstName = arr[0]
    obj.familyName = arr[1]
    obj.title = arr[2]
    obj.payPerHour = arr[3]
    return obj
}

function createEmployeeRecords(arr) {
    const records =  []
    arr.forEach(element => {
       records.push(createEmployeeRecord(element))
    })
    return records
}

function createTimeInEvent(employee, time) {
    let [date, hour] = time.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}

function createTimeOutEvent(employee, time) {
    let [date, hour] = time.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}

function hoursWorkedOnDate(employee, datE) {
    const inTime = employee.timeInEvents.find(e => {
        return e.date === datE
    })

    const outTime = employee.timeOutEvents.find(e => {
        return e.date === datE
    })
    const worked = (outTime.hour/100) - (inTime.hour/100)
    return worked
}

function wagesEarnedOnDate(employee, date) {
    const wages = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wages
}

function allWagesFor(employee){
    const dates = employee.timeInEvents.map(e => {
        return e.date
    })

    const hours = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return hours
}

function calculatePayroll(employees) {
    return employees.reduce((total, emp) => {
        return total + allWagesFor(emp)
    }, 0)
}

