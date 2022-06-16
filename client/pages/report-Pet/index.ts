export function doReportPet(params) {
  const login = localStorage.getItem("token");
  if (!login) {
    return (location.pathname = "login");
  }
  const div = document.createElement("div");
  div.className = "root";
  div.innerHTML = `
  <comp-header></comp-header>
  <h3 class="title-report">Reportar mascota perdida</h3>
  <form-report-pet></form-report-pet>
  `;

  return div;
}
