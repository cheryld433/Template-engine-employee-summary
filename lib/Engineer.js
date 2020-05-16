const Employee = require("./Employee");

class Engineer extends Employee {
   constructor(name, id, email, github) {
      super(name, id, email, github);
      this.github = github;
   }

   getGithub() {
      return this.github;
   }

   getRole() {
      return "Engineer";
   }

   createCard() {
      let theHTML = `
      <div class="card shadow" style="width: 250px">
      <div class="card-header bg-primary text-light h2">
         ${this.name}<br />
         <span class="h4"><i class="fas fa-glasses"></i> Engineer</span>
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
            <li class="list-group-item">
               GitHub:
               <a href="https://www.github.com/${this.github}"
                  >${this.github}</a>
            </li>
         </ul>
      </div>
   </div>`;

      return theHTML;
   }
}

module.exports = Engineer;
