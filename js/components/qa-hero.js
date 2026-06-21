import { getProfile, getProjects } from "../data-service.js";

class QAHero extends HTMLElement {
  async connectedCallback() {
        const profileData = await getProfile();
        this.render(profileData);
        await this.startTerminal(profileData.terminalLines || []);
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

  async startTerminal(lines) {
    const output = this.querySelector("#terminal-output");
    if(!output) return;

        // Calcula totales a partir de proyectos
        let totals = { passed: 0, failed: 0, skipped: 0 };
        let totalTests = 0;
        try {
            const projects = await getProjects();
            totals = projects.reduce((acc, p) => {
                const m = p.metrics || {};
                acc.passed += m.passed || 0;
                acc.failed += m.failures || 0;
                acc.skipped += (m.skipped ?? m.omitted ?? 0);
                return acc;
            }, totals);
            totalTests = projects.reduce((sum, p) => sum + (p.metrics?.tests ?? p.metrics?.tests ?? 0), 0);
        } catch (e) {
            // ignore, keep defaults
        }

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
                // Reemplaza la línea estática de summary por los totales dinámicos
                const summaryRegex = /passed,?\s*\d+\s*failed/i;
                const collectedRegex = /collected\s*\d+\s*items/i;
                if (typeof text === 'string' && summaryRegex.test(text)) {
                    line.textContent = `${totals.passed} passed, ${totals.failed} failed, ${totals.skipped} skipped`;
                } else if (typeof text === 'string' && collectedRegex.test(text)) {
                    line.textContent = `collected ${totalTests} items`;
                } else {
                    line.textContent = text;
                }
            }
            output.appendChild(line);
            output.scrollTop = output.scrollHeight; // Auto-scroll
        }, delay);
    });
  }
}

customElements.define("qa-hero", QAHero);
