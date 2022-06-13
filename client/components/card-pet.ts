export function cardPet() {
  class CardPet extends HTMLElement {
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
        <div class="container-cards">
            <img src="" alt="" />
            <h3>Nombre de la Mascota</h3>
            <span>Ciudad</span>
            <div>Link a Reportar</div>
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
  customElements.define("card-pet", CardPet);
}
