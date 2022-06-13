import { initRouter } from "./router";
import { formRegister } from "./components/form.register";
import { formLogin } from "./components/form.login";
import { header } from "./components/header/header";
import { infoPet } from "./components/form.info-pet";
import { cardPet } from "./components/card-pet";
import { reportPet } from "./components/form.report-pet";

(function () {
  reportPet()
  cardPet()
  infoPet()
  header()
  formRegister();
  formLogin();
  const root = document.querySelector(".root");
  initRouter(root);
})();
