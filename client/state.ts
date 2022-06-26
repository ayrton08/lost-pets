import { config } from "./config";
const API_BASE_URL = config.apiUrl;
console.log("url", API_BASE_URL);

const mainState = {
  data: {
    myData: {
      login: false,
      fullname: false,
      token: "",
      password: "",
      email: "",
      location: {
        lat: "",
        lng: "",
      },
    },
    reportId: "",
    reportUrl: "",
  },
  listeners: [],

  getState() {
    return this.data;
  },

  async signIn(dataForm: Object) {
    const state = this.getState();
    const sendFormRegister = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const data = await sendFormRegister.json();
    if (data.registrado) {
      state.myData.fullname = data.newUser.fullname;
      state.myData.email = data.newUser.email;
      state.myData.password = data.auth.password;
    }

    this.setState(state);
    return data;
  },

  async login(email: String, password: String) {
    const state = this.getState();
    const sendFormLogin = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (sendFormLogin.status === 400) {
      return console.error("contraseña incorrecta");
    }

    const data = await sendFormLogin.json();
    state.myData.token = data.signToken;
    state.myData.login = true;

    this.setState(state);
    return data;
  },

  async updateDataUser(fullname?, password?) {
    const token = localStorage.getItem("token");
    const sendFormUpdate = await fetch(`${API_BASE_URL}/users/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ fullname, password }),
    });
    const dataForm = await sendFormUpdate.json();
    return dataForm;
  },

  async myData() {
    const token = localStorage.getItem("token");
    const sendFormData = await fetch(`${API_BASE_URL}/auth/my-data`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const dataForm = await sendFormData.json();
    return dataForm;
  },

  logOut() {
    const state = this.getState();
    localStorage.removeItem("token");
    state.myData.login = false;
    return this.setState(state);
  },

  setToken(token) {
    return localStorage.setItem("token", token);
  },

  async doReport(dataForm: Object, UserId) {
    const res = await fetch(`${API_BASE_URL}/pets/report-pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${UserId}`,
      },
      body: JSON.stringify(dataForm),
    });
    const data = await res.json();
  },

  async updateReport(dataForm: Object, UserId, idPet) {
    const id = idPet;
    const res = await fetch(`${API_BASE_URL}/pets/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${UserId}`,
      },
      body: JSON.stringify({ dataForm }),
    });
    const data = await res.json();
  },

  async findMyReports(token: String) {
    const res = await fetch(`${API_BASE_URL}/users/my-pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  },

  async findById(id) {
    const res = await fetch(`${API_BASE_URL}/pets/by-id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pet = await res.json();
    return pet;
  },

  async sendInfoPet(params: {}) {
    const res = await fetch(`${API_BASE_URL}/users/info-pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    return localStorage.setItem("myData", JSON.stringify(this.data.myData));
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { mainState };
