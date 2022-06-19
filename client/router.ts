import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/home", component: "home-page" },
  { path: "/login", component: "login-page" },
  { path: "/register", component: "register-page" },
  { path: "/view-reports", component: "report-map-page" },
  { path: "/my-data", component: "my-data-page" },
  { path: "/my-reports", component: "my-reports-page" },
  { path: "/do-report", component: "report-page" },
  { path: "/(.*)", component: "welcome-page" },
]);
