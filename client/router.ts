import { homePage } from "./pages/home";
import { registerPage } from "./pages/register";
import { reportPage } from "./pages/view-report-pet";
import { welcomePage } from "./pages/welcome";
import { loginPage } from "./pages/login";
import { doReportPet } from "./pages/report-Pet";
import { myReportsPage } from "./pages/my-reports";
import { myDataPage } from "./pages/my-data";
import { petInfoPage } from "./pages/pet-info";

const routes = [
  {
    path: /\/welcome/,
    component: welcomePage,
  },
  {
    path: /\/home/,
    component: homePage,
  },
  {
    path: /\/view-report/,
    component: reportPage,
  },
  {
    path: /\/register/,
    component: registerPage,
  },
  {
    path: /\/login/,
    component: loginPage,
  },
  {
    path: /\/do-report/,
    component: doReportPet,
  },
  {
    path: /\/my-reports/,
    component: myReportsPage,
  },
  {
    path: /\/my-data/,
    component: myDataPage,
  },
  {
    path: /\/pet-info/,
    component: petInfoPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path, data) {
    history.pushState(data, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  if (location.pathname === "/") {
    goTo("/welcome", "");
  } else {
    handleRoute(location.pathname);
  }
  if (location.host.includes(".github.io")) {
    goTo("/welcome", {});
  }

  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}
