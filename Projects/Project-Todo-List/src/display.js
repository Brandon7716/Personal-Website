//DISPLAY CONTROLLER
//EDIT TASK NAMES AND DUE DATES
// WHEN PASSED THE PROJECT
import { Project } from "./project.js";
import { Task } from "./task.js";
import { getDailyTasks } from "./today.js";
import { getWeeklyTasks } from "./week.js";
// TO DO:
//implenet HOME,
//TODAY,
//THIS WEEK,
// enable rediting of task
// enable task deletion
// enable project delection
// enable location storage
// implement better interface other than prompt

export const displayController = (() => {
  const homeBtn = document.querySelector("#home");
  const todayBtn = document.querySelector("#today");
  const weekBtn = document.querySelector("#week");
  const addProjBtn = document.querySelector("#btn-add");
  const projectListDiv = document.querySelector("#project-list");
  const addTaskBtn = document.querySelector("#btn-add-task");
  const projectPreviewListDiv = document.querySelector("#project-preview-list");
  const projectTitle = document.querySelector("#project-title");
  let projectList = [];
  let ungroupedProj = new Project("ungrouped");
  let selectedProj = ungroupedProj;
  projectList.push(ungroupedProj);

  todayBtn.addEventListener("click", () => {
    let dailyTask = getDailyTasks(projectList);
    selectedProj = dailyTask;
    displayProj(selectedProj);
  });

  weekBtn.addEventListener("click", () => {
    let weeklyTasks = getWeeklyTasks(projectList);
    selectedProj = weeklyTasks;
    displayProj(selectedProj);
  });

  addTaskBtn.addEventListener("click", () => {
    let taskName = prompt("Enter Task.");
    if (taskName !== null && taskName !== "") {
      let task = new Task(taskName);
      selectedProj.add(task);
      displayProj(selectedProj);
    }
  });

  const displayProj = function (proj) {
    projectPreviewListDiv.innerHTML = "";
    projectTitle.textContent = proj.projectName;
    for (let i = 0; i < proj.taskList.length; i++) {
      let currTask = proj.taskList[i];
      projectPreviewListDiv.appendChild(createTaskDiv(currTask, i));
    }
  };

  const createTaskDiv = function (task, i) {
    let taskDiv = document.createElement("div");
    taskDiv.classList = "project-preview-task";
    const taskText = document.createElement("p");
    taskText.textContent = task.name;
    taskDiv.appendChild(taskText);

    if (task.date === undefined) {
      createDateInput(task, i, taskDiv);
    } else {
      createDateText(task, i, taskDiv);
    }
    return taskDiv;
  };

  const createDateInput = function (task, i, taskDiv) {
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = i;
    dateInput.classList = "date";
    taskDiv.appendChild(dateInput);
    dateInput.addEventListener("input", () => {
      //IMPORTANT, TASK IS PASSED BY REFERNCE AND IS THE REASON
      // WE CAN UPDATE THE DATES AND THE ASSOCIATED PROJECT OBJECT TASKLIST WILL
      // BE CHANGED WITHOUT NEEDING TO ACCESS THAT SPECIFIC ARRAYLIST.
      // console.log(projectList[1].taskList[0] === task);
      task.date = dateInput.value;
      displayProj(selectedProj);
    });
  };

  const createDateText = function (task, i, taskDiv) {
    const dateText = document.createElement("p");
    dateText.id = i;
    dateText.classList = "date";
    dateText.addEventListener("click", () => {
      taskDiv.removeChild(dateText);
      createDateInput(task, i, taskDiv);
    });
    dateText.textContent = task.date;
    taskDiv.appendChild(dateText);
  };

  addProjBtn.addEventListener("click", (e) => {
    const name = prompt("Enter Project Name");
    if (name != "" && name != undefined) {
      let newProj = new Project(name);
      projectList.push(newProj);

      let newProjectListBtn = createProjectListButton(name);
      newProjectListBtn.setAttribute("data-project-id", newProj.projectID);
      newProjectListBtn.addEventListener("click", (e) => {
        let projID = parseInt(e.target.getAttribute("data-project-id"));
        selectedProj = projectList[projID];
        displayProj(selectedProj);
        let selectedBtn = e.target;
        setActiveButton(selectedBtn);
      });

      projectListDiv.appendChild(newProjectListBtn);
    }
  });

  const createProjectListButton = function (name) {
    const projectItemDiv = document.createElement("div");
    const projectItemIcon = document.createElement("i");
    const projectItemText = document.createElement("p");

    projectItemText.textContent = name;
    projectItemDiv.classList = "btn-default small";
    projectItemIcon.classList = "fa-solid fa-list-check";
    projectItemDiv.classList.add("project-item");

    projectItemDiv.appendChild(projectItemIcon);
    projectItemDiv.appendChild(projectItemText);
    return projectItemDiv;
  };

  const setActiveButton = function (btnPressed) {
    const projectBtns = document.querySelectorAll("[data-project-id]");
    projectBtns.forEach((btn) => {
      btn.style.backgroundColor = "transparent";
    });
    btnPressed.style.backgroundColor = "#adb5bd";
  };
})();
