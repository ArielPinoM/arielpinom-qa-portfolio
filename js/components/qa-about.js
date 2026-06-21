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
                    </div>
                </div>
            </section>
        `;
  }
}

customElements.define("qa-about", QAAbout);
