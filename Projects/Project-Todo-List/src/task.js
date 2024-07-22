// export class Task {
//   constructor(name, date) {
//     this.name = name;
//     this.date = date;
//   }
// }

export function Task(name, date) {
  this.name = name;
  this.date = date;
}

Task.prototype.getName = function () {
  return this.name;
};

Task.prototype.getDate = function () {
  return this.date;
};
