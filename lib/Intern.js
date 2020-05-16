const Employee = require("./Employee");

class Intern extends Employee {
   constructor(name, id, email, school) {
      super(name, id, email, school);
      this.school = school;
   }

   getSchool() {
      return this.school;
   }

   getRole() {
      return "Intern";
   }

   createCard() {
      return `
      <div class="card shadow" style="width: 250px">
         <div class="card-header bg-primary text-light h2">
            ${this.name}<br />
            <span class="h4"><i class="fas fa-user-graduate"></i> Intern</span>
         </div>
         <div class="card-body" style="background-color: #f1f1f1;">
            <ul class="list-group">
               <li class="list-group-item">ID: ${this.id}</li>
               <li class="list-group-item">
                  Email:
                  <a href="mailto:${this.email}"
                     >${this.email}</a
                  >
               </li>
               <li class="list-group-item">School: ${this.school}</li>
            </ul>
         </div>
      </div>
      `;
   }
}

module.exports = Intern;
