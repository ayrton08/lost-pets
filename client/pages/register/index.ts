export function registerPage(params) {
  const div = document.createElement("div");
  div.className = "contenedor-register";
  div.innerHTML = `
      <comp-header></comp-header>
      <div class="content">
      <form-register></form-register>
    `;
  return div;
}
