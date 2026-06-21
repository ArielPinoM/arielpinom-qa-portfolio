import { getProfile } from "../data-service.js";

class QAAbout extends HTMLElement {
  async connectedCallback() {
        const profileData = await getProfile();
        this.render(profileData);
  }

  render(profileData) {
    // Obtener párrafos about
    const aboutParagraphs = profileData.about.map(text => `<p class="about-para">${text}</p>`).join("");

    this.innerHTML = /*html*/ `
            <section id="about">
                <div class="container">
                    <p class="section-label">PERFIL PROFESIONAL</p>
                    <h2 class="section-title">About.yml</h2>
                    <div class="about-grid">
                        <div class="photo-col">
                            <div class="photo-frame">
                                <!-- REEMPLAZAR SRC -->
                                <img class="photo-img" src alt="Ariel - QA Engineer" onerror="this.style.display='none'" onload="this.nextElementSibling.style.display='none'" style="display: none;">
                                <!-- Placeholder visible cuando no hay imagen -->
                                <div class="photo-ghost">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b949e" stroke-width="1.2">
                                        <circle cx="12" cy="8" r="4"></circle>
                                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path>
                                    </svg>
                                    <span class="photo-ghost-label">
                                        src="assets/
                                        <br>
                                        tu-foto.jpg"
                                    </span>
                                </div>
                            </div>
                            <div class="photo-meta">
                                <span class="photo-name">${profileData.name}</span>
                                <span class="photo-role">${profileData.role}</span>
                                <span class="photo-loc">${profileData.location}</span>
                            </div>
                        </div>
                        <div class="about-text-wrap">
                            <div class="about-text-bar">
                                <span class="dot" style="background:#e74c3c"></span>
                                <span class="dot" style="background:#f1c40f"></span>
                                <span class="dot" style="background:#2ecc71"></span>
                                <span style="margin-left:6px">profile.md — read-only</span>
                            </div>
                            <div class="about-body">
                                ${aboutParagraphs}
                            </div>
                        </div>
                        <div class="sidebar">
                        <div class="goal-badge">
                            <span class="gl">TARGET_ROLE =</span>
                            "QA Engineer Junior"<br>
                            <span style="color:var(--t3)">sector =</span> <span style="color:var(--c-info)">any_tech</span><br>
                            <span style="color:var(--t3)">focus  =</span> <span style="color:var(--c-passed)">test_automation</span>
                        </div>

                        <div class="side-card">
                            <div class="side-card-head">
                            <span class="q-dot" style="background:var(--c-passed)"></span>
                            Focus areas
                            </div>
                            <div class="side-card-body">
                            <ul class="focus-list">
                                <li class="focus-item"><span class="fi">›</span>Pruebas de caja negra / aceptación</li>
                                <li class="focus-item"><span class="fi">›</span>Automatización Python / pytest / Selenium</li>
                                <li class="focus-item"><span class="fi">›</span>Validación de bases de datos SQL</li>
                                <li class="focus-item"><span class="fi">›</span>Matrices de prueba exhaustivas</li>
                                <li class="focus-item"><span class="fi">›</span>CI/CD con GitHub Actions</li>
                            </ul>
                            </div>
                        </div>

                        <div class="side-card">
                            <div class="side-card-head">
                            <span class="q-dot" style="background:var(--c-info)"></span>
                            Soft skills
                            </div>
                            <div class="side-card-body">
                            <div class="tags-wrap">
                                <span class="stag">Comunicación directa</span>
                                <span class="stag">Pensamiento lógico</span>
                                <span class="stag">Alta disciplina</span>
                                <span class="stag">Orientado a evidencia</span>
                                <span class="stag">Autodidacta</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
  }
}

customElements.define("qa-about", QAAbout);
