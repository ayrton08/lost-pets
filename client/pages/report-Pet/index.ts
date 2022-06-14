export function doReportPet(params) {
  const div = document.createElement("div");
  div.className = "root";
  div.innerHTML = `
      <comp-header></comp-header>
      <h3>Reportar mascota perdida </h3>
      <form-report-pet></form-report-pet>
      `;
  

  return div;
}
