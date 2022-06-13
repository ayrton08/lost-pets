export function infoPet() {
    class InfoPet extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.render();
      }
  
      render() {
        this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        div.className = "root";
        div.innerHTML = `
        <div>
        <form class="form-report">
            <label>
              <h3>Tu Nombre</h3>
              <input type="text" name="email" class="input-email" placeholder="Your Name" />
            </label>
            <label class="container-password">
              <h3>Tu Telefono</h3>
              <input type="text" name="password" class="password-first" placeholder="Your Cellphone" />
            </label>
            <label>
                <h2>¿Donde lo viste?</h2>
                <textarea name="last-place" class="last-place"></textarea>
            </label>
            <br>
            <button>Enviar</button>
        </form>
        </div>
          ${this.getStyles()}`;
        this.shadowRoot.appendChild(div);
      }
      getStyles() {
        return `
                <style>
                .root{
                  display: flex;
                  flex-direction: column;
                  padding: 20px;
                  width: 50%;
                  text-align: center;
                  border: solid 3px;
                  gap: 20px;
                  background-color: #ABEBC6;
  
  
                }
               </style>
                `;
      }
    }
    customElements.define("form-infopet", InfoPet);
  }
  