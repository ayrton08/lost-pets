class RegisterPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <comp-header></comp-header>
      <div class="content">
      <form-register></form-register>
    `;
    
  }
}
customElements.define("register-page", RegisterPage);
