import { getToolkit } from "../data-service.js";

class QAToolkit extends HTMLElement {
  async connectedCallback() {
    this.renderLoading();
    const data = await getToolkit();
    this.render(data);
  }

  renderLoading() {
    this.innerHTML = `
      <section id="toolkit">
        <div class="container">
          <p class="section-label">habilidades técnicas</p>
          <h2 class="section-title">The Toolkit</h2>
          <div class="toolkit-grid">Loading...</div>
        </div>
      </section>
    `;
  }

  render(data) {
    const groups = data.groups || [];
    const gridHtml = groups.map(group => {
      const items = (group.items || []).map(item => `
        <li class="skill-item">
          <span class="skill-icon">›</span>
          <span class="skill-name">${item.name}</span>
        </li>
      `).join('');

      return `
        <div class="toolkit-quadrant">
          <div class="toolkit-quadrant-title">
            <span class="q-dot" style="background:var(${group.color})"></span>
            <span style="color:var(${group.color})">${group.title}</span>
          </div>
          <ul class="skill-list">
            ${items}
          </ul>
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <section id="toolkit">
        <div class="container">
          <p class="section-label">habilidades técnicas</p>
          <h2 class="section-title">The Toolkit</h2>
          <div class="toolkit-grid">
            ${gridHtml}
          </div>
        </div>
      </section>
    `;

  }
}

customElements.define('qa-toolkit', QAToolkit);
