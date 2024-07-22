//FILTER ALL PROEJCTS AND SHOW ONLY
// THE ONES WITH A DUE DATE OF TODAY
import { Project } from "./project.js";
export function getDailyTasks(projects) {
  let today = new Project("Today", false);
  const startDate = formatDate(new Date());
  for (let i = 0; i < projects.length; i++) {
    let currProj = projects[i];
    let taskList = currProj.getTasks();
    for (let j = 0; j < taskList.length; j++) {
      let currTask = taskList[j];
      let currTaskDate = currTask.date;
      if (currTaskDate == startDate) {
        today.add(currTask);
      }
    }
  }
  return today;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
