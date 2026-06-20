import { ProjectCard } from "./ProjectCard.js";

class ChicagoTaxiCard extends ProjectCard {
  get dataUrl() {
    return "./data/projects/chicago-taxi.json";
  }

  set projectData(data) {
    this._data = data;
    if (this.isConnected) {
      this.render(data);
      this.setupToggle();
      this.setupLightbox();
    }
  }

  render(data) {
    // Vista colapsada: miniatura + info resumida
    const collapsedHTML = /*html*/ `
        <div class="card-collapsed">
            <div class="card-header">
                <div>
                    <span class="collapsed-arrow">▶</span>
                    <span>test_session :: ${data.component}</span>
                </div>
                <span style="color:var(--c-passed);">${data.metrics.tests} tests</span>
            </div>
            <div>
                <img class="collapsed-img" src="${data.image1}" alt="${data.name}" />
            </div>
            <div class="test-id">${data.id} · ${data.file}</div>
            <div class="collapsed-title">${data.name}</div>
            <div class="test-description">${data.description}</div>
            <span class="badge badge-info">[ 🎓 BOOTCAMP ]</span>
        </div>
    `;

    // Generar las columnas de habilidades
    const abilitiesHTML = (data.abilities || [])
      .map((group) => {
        const color = group.color || "var(--c-info)"; // fallback
        const listItems = group.abilities
          .map(
            (ability) => `
                <li class="ability-item">
                    <span class="ability-icon">></span>
                    ${ability}
                </li>
            `,
          )
          .join("");

        return `
                <div class="abilities-col">
                    <div class="abilities-label">
                        <span class="abilities-dot" style="background: ${color}"></span>
                        ${group.title}
                    </div>
                    <ul class="abilities-list">
                        ${listItems}
                    </ul>
                </div>
            `;
      })
      .join("");

    // Contenido detallado (métricas, stack, enlaces, habilidades)
    const detailsHTML = /*html*/ `
        <div class="card-body-inner">
            <!-- test-card -->
            <div class="test-card">
                <div class="test-card-header">
                    <div class="test-card-header-secondary">
                        <img class="project-img" src="${data.image1}">
                        <img class="project-img" src="${data.image2}">
                    </div>
                    <div class="test-card-header-primary">
                        <div class="test-h2">Objetivo</div>
                        <div class="test-description">${data.objective}</div>
                        <div class="test-h2">Problemática</div><div class="test-description">${data.problemStatement}</div>
                        <div class="test-h2">Aprendizajes y Logros</div>
                        <div class="test-description">${data.keyLearningsAndAchievements}</div>

                    </div>
                </div>
                <div class="test-card-body">
                    <div class="metrics-row">
                        <div class="metric">
                            <div class="metric-val" style="color:var(--c-passed);">${data.metrics.coverage}%</div>
                            <div class="metric-key">Test Coverage</div>
                        </div>
                        <div class="metric">
                            <div class="metric-val" style="color:var(--c-info);">${data.metrics.testsRun}</div>
                            <div class="metric-key">Executed Tests</div>
                        </div>
                        <div class="metric">
                            <div class="metric-val" style="color:var(--c-passed);">${data.metrics.passed}</div>
                            <div class="metric-key">Passed</div>
                        </div>
                        <div class="metric">
                            <div class="metric-val" style="color:var(--c-flaky);">${data.metrics.skipped}</div>
                            <div class="metric-key">Skipped</div>
                        </div>
                        <div class="metric">
                            <div class="metric-val" style="color:var(--c-failed);">${data.metrics.failures}</div>
                            <div class="metric-key">Failures</div>
                        </div>
                    </div>
                    <div class="abilities-row">
                        ${abilitiesHTML}
                    </div>
                    <div class="test-card-footer">
                        <div class="stack-tags">
                            ${data.stack.map((t) => `<span class="stack-tag">${t}</span>`).join("")}
                        </div>
                        <div class="card-links">
                            <a href="${data.github}" target="_blank" class="card-link">⎇ GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Estructura final
    this.innerHTML = /*html*/ `
        ${collapsedHTML}
        <div class="card-body-wrapper">
        ${detailsHTML}
        </div>
    `;

    // Aseguramos que el componente tenga la clase base (para el CSS)
    this.classList.add("chicago-taxi-card");
  }
}

customElements.define("chicago-taxi-card", ChicagoTaxiCard);
