// CONTAINER
//OF KEY VALUE PAIRS OF TASK AND DUE DATES
// WITH A PROJECT DONT  ALLOW
//TASK WITH THE SAME NAME
let projectCount = 0;
export function Project(projectName, isNew = true) {
  this.projectID = projectCount;
  this.taskList = [];
  this.projectName = projectName;
  if (isNew) {
    projectCount++;
  }
}

Project.prototype.add = function (task) {
  this.taskList.push(task);
};

Project.prototype.remove = function (index) {
  this.taskList.splice(index, 1);
};

Project.prototype.getTasks = function () {
  return this.taskList;
};
