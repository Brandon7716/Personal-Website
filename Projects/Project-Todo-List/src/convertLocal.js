import { Project } from "./project";
import { Task } from "./task";
//Rebuild proj from json in local storage
export function convertLocalObjToProject(obj) {
  let proj = new Project(obj.projectName, false);
  proj.projectID = obj.projectID;
  //Build out the Task array.
  for (let i = 0; i < obj.taskList.length; i++) {
    let currTask = obj.taskList[i];
    let name = currTask.name;
    let date = currTask.date;
    proj.add(new Task(name, date));
  }

  return proj;
}
