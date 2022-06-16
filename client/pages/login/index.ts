import * as jwt from "jsonwebtoken"

export function loginPage(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content-login">
    <form-login></form-login>
    </div>
    </div>
    `;
  return div;
}
