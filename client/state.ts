import { config } from "./config";
// const API_BASE_URL = config.apiUrl; me da undefined cuando lo traigo como variable de ambiente
const API_BASE_URL = "http://localhost:3000/api/v1";
console.log(API_BASE_URL);

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
  },
  listeners: [],

  init() {},

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

  logOut() {
    const state = this.getState();
    localStorage.removeItem("token");
    state.myData.login = false;
    return this.setState(state);
  },

  setToken(token: String) {
    localStorage.setItem("token", JSON.stringify(token));
  },

  async doReport(params: Object) {
    const res = await fetch(`${API_BASE_URL}/pets/report-pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    console.log("soy las respuesta del form report", data);
    // if (data.registrado) {
    //   state.myData.fullname = data.newUser.fullname;
    //   state.myData.email = data.newUser.email;
    //   state.myData.password = data.auth.password;
    // }
    // if(sendFormLogin.status === 400){
    //   return console.error("contraseña incorrecta")
    // }
    // const data = await sendFormLogin.json();
    // state.myData.token = data.signToken;
    // state.myData.login = true;
    // this.setState(state);
    // return data;
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
