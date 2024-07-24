//FILTER ALL PROEJCTS AND SHOW ONLY
// THE ONES WITH A DUE DATE OF TODAY+6 days
// SO SHOW A DUE PROJECTS WITHIN THE WEEK
// with the start date being whatever TODAY
// IS

import { Project } from "./project.js";
export function getWeeklyTasks(projects) {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const daysInMillis = 86400000;
  const elapsedDays = 6;
  const endDate = new Date(startDate.getTime() + elapsedDays * daysInMillis);

  let week = new Project("This week", false);
  if (projects) {
    for (let i = 0; i < projects.length; i++) {
      let currProj = projects[i];
      let taskList = currProj.getTasks();
      for (let j = 0; j < taskList.length; j++) {
        let currTask = taskList[j];
        let currTaskDate = currTask.date;
        if (currTaskDate) {
          let parsedDate = parseFormattedDate(currTaskDate);
          // console.log(`${startDate} + ${parsedDate} + ${endDate}`);
          if (
            parsedDate.getTime() >= startDate.getTime() &&
            parsedDate.getTime() <= endDate.getTime()
          ) {
            week.add(currTask);
          }
        }
      }
    }
    return week;
  }
}

function parseFormattedDate(inputValue) {
  const parts = inputValue.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1] - 1);
  const day = parseInt(parts[2]);
  return new Date(year, month, day);
}
