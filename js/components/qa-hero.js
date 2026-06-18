import { getProfile } from "../data-service.js";

class QAHero extends HTMLElement {
  async connectedCallback() {
    const profileData = await getProfile();
    this.render(profileData);
    this.startTerminal(profileData.terminalLines || []);
  }

  render(profileData) {
    this.innerHTML = /*html*/ `
            <section id="hero">
                <div class="grid-overlay"></div>
                <div class="container">
                    <div class="hero-inner">
                    <div class="hero-copy">
                        <p class="section-label">QA Engineer</p>
                        <h1 class="hero-headline">
                        <span class="name">${profileData.name}</span><br>
                        Quality Assurance<br>Engineer
                        </h1>
                        <p class="hero-sub">
                        <!-- Dot -->
                        <span class="dot"></span>
                        Automation · Python · Pytest · Selenium
                        </p>
                        <div class="hero-badges">
                        <span class="badge badge-passed">✓ PASSED: Automation</span>
                        <span class="badge badge-info">ℹ INFO: API Testing</span>
                        <span class="badge badge-passed">✓ PASSED: SQL / DB</span>
                        <span class="badge badge-flaky">~ ACTIVE: Learning</span>
                        </div>
                        <div class="hero-cta">
                        <a href="#projects" class="btn btn-primary">→ Ver Test Suite</a>
                        <a href="#contact" class="btn btn-ghost">↗ Abrir un Issue</a>
                        </div>
                    </div>

                    <div class="terminal">
                        <div class="terminal-bar">
                        <div class="terminal-dot td-red"></div>
                        <div class="terminal-dot td-yellow"></div>
                        <div class="terminal-dot td-green"></div>
                        <span class="terminal-title">bash — pytest --collect-only</span>
                        </div>
                        <div class="terminal-body" id="terminal-output">
                        <!-- JS llena esto -->
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        `;
  }

  startTerminal(lines) {
    const output = this.querySelector("#terminal-output");
    if(!output) return;

    // Limpia cualquier contenido previo
    output.innerHTML = '';

    lines.forEach(({text, class: cls, delay, cursor}) => {
        setTimeout(() => {
            const line = document.createElement('span');
            line.className = 't-line ' + (cls || '');
            if (cursor) {
                line.innerHTML = '<span class="t-prompt">$</span> <span class="cursor"></span>';
            } else if (text ==='') {
                line.innerHTML = '&nbsp;'; // Espacio para líneas vacías
            } else {
                line.textContent = text;
            }
            output.appendChild(line);
            output.scrollTop = output.scrollHeight; // Auto-scroll
        }, delay);
    });
  }
}

customElements.define("qa-hero", QAHero);
