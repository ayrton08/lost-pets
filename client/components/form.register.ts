import { mainState } from "../state";
export function formRegister() {
  class FormRegister extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const div = document.createElement("div");
      div.className = "container";
      div.innerHTML = `
        <div>
            <form class="form-register">
                <label>
                  <h3>Fullname</h3>
                  <input type="text" name="fullname" class="input-fullname" placeholder="Your Name" />
                </label>

                <label>
                  <h3>Email</h3>
                  <input type="email" name="email" class="input-email" placeholder="Your Email" />
                  <div class="email-exist"></div>
                </label>

                <label class="container-password">
                  <h3>Password</h3>
                  <input type="password" name="password" class="password-first" placeholder="Your Password" />
                </label>
                <label >
                  <input type="password" name="password-repeat" class="password-second" placeholder="Repeat Password"/>
                  <button class="show-password">🙈</button>
                </label>

                <button class="send-form">Register</button>
            </form>
        </div>
                ${this.getStyles()}    
            `;

      // const showPassword = document.querySelector(".show-password");
      // console.log(showPassword)
      // showPassword.addEventListener("click", () => {
      //   const passwordOne = document.querySelector(".password-first");
      //   const passwordTwo = document.querySelector(".password-second");
      //   if (
      //     passwordOne["type"] === "password" &&
      //     passwordTwo["type"] === "password"
      //   ) {
      //     passwordOne["type"] = "text";
      //     passwordTwo["type"] = "text";
      //   } else {
      //     passwordOne["type"] = "password";
      //     passwordTwo["type"] = "password";
      //   }
      // });

      const formRegister = document.querySelector("form-register");

      formRegister.addEventListener("submit", async (e) => {
        const emailExist = document.querySelector(".email-exist");
        emailExist.textContent = "⌛";
        emailExist["style"].fontSize = "50px";
        e.preventDefault();

        const fullname = e.target["fullname"].value;
        const email = e.target["email"].value;
        const password = e.target["password"].value;
        const passwordRepeat = e.target["password-repeat"].value;

        if (!fullname) {
          console.error("falta el nombre");
        }
        if (!email) {
          console.error("falta el email");
        }
        if (!password && !passwordRepeat) {
          console.error("falta la contraseña");
        }
        if (password !== passwordRepeat) {
          console.error("contraseñas no coincide");
        }
        if (
          fullname &&
          email &&
          password &&
          passwordRepeat &&
          password === passwordRepeat
        ) {
          console.log("Registrando...");
          const body = { fullname, email, password };
          const res = await mainState.signIn(body);
          if (res.registrado) {
            emailExist["style"].fontSize = "20px";
            emailExist.textContent =
              "Registro exitoso! Te enviaremos a loguearte ✅";
            emailExist["style"].color = "#009933";
            return (location.pathname = "login");
          } else {
            emailExist["style"].fontSize = "20px";
            emailExist.textContent = "El email ingresado ya existe";
            emailExist["style"].color = "red";
            return console.error(res);
          }
        }
      });

      this.appendChild(div);
    }

    getStyles() {
      return `
            <style>
            .form-register{
              display: flex;
              flex-direction: column;
              background-color: #A2D9CE;
              justify-content: center;
              align-items: center;
              border: solid 2px;
              gap: 10px;
              padding: 20px;
              width: 100%;
            },
            
           </style>
            `;
    }
  }
  customElements.define("form-register", FormRegister);
}
