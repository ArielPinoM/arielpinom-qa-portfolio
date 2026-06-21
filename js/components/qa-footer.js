import { getSocialLinks } from "../data-service.js";

class QAFooter extends HTMLElement {
  async connectedCallback() {
    const social = await getSocialLinks();
    this.render(social);
  }

  render(social) {
    this.innerHTML = /*html*/ `
      <footer>
        <div class="container">
          <div class="footer-inner">
            <div class="footer-status">
              <div class="footer-dot"></div>
              <span class="footer-text">All systems operational · v1.0.0-rc</span>
            </div>
            <span class="footer-text">Ariel · QA Engineer · 2026</span>
            <div class="footer-links">
              <a href="${social.github}" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="${social.linkedin}" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('qa-footer', QAFooter);
