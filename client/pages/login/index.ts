import * as jwt from "jsonwebtoken"

export function loginPage(params) {
  const div = document.createElement("div");
  div.className = "contenedor-register";
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content">
    <form-login></form-login>
    </div>
    </div>
    `;
  return div;
}
