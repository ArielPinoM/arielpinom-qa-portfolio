import { getProjects } from "../data-service.js";

class QAStats extends HTMLElement {
  async connectedCallback() {
    const projects = await getProjects();
    this.calculateAndRender(projects);
  }

  calculateAndRender(projects) {
    const testsWritten = projects.reduce(
      (sum, p) => sum + (p.metrics?.tests ?? 0),
      0,
    );
    const testsExecuted = projects.reduce(
      (sum, p) => sum + (p.metrics?.testsRun ?? p.metrics?.tests ?? 0),
      0,
    );
    const projectsCount = projects.length;
    // Herramientas únicas (opcional, puedes sumar una lista predefinida o contar stacks únicos)
    const allTools = new Set();
    projects.forEach((p) => p.stack?.forEach((t) => allTools.add(t)));
    const toolsCount = allTools.size;
    const passedCount = projects.reduce(
      (sum, p) => sum + (p.metrics?.passed || 0),
      0,
    );
    const passRatePercent = testsExecuted
      ? Math.round((passedCount / testsExecuted) * 100)
      : 0;

    this.innerHTML = /*html*/ `
        <div class="container" style="padding-top:60px;">
            <div class="stats-row">
                <div class="stat-cell">
                    <div class="stat-num" style="color:var(--c-passed);" id="cnt-tests">0</div>
                    <div class="stat-label">Tests escritos</div>
                </div>
                <div class="stat-cell">
                    <div class="stat-num" style="color:var(--c-info);" id="cnt-projects">0</div>
                    <div class="stat-label">Proyectos</div>
                </div>
                <div class="stat-cell">
                    <div class="stat-num" style="color:var(--c-flaky);" id="cnt-tools">0</div>
                    <div class="stat-label">Herramientas</div>
                </div>
                <div class="stat-cell">
                  <div class="stat-num" style="color:var(--c-passed);" id="cnt-pass-rate">0%</div>
                  <div class="stat-label">Pass rate (portfolio)</div>
                </div>
            </div>
        </div>
        `;

    this.animateCounters({
      testsWritten,
      projectsCount,
      toolsCount,
      passRatePercent,
    });
  }

  animateCounters({
    testsWritten,
    projectsCount,
    toolsCount,
    passRatePercent,
  }) {
    const animate = (el, target, duration, suffix = "") => {
      let start = 0;
      const step = Math.max(1, Math.ceil(target / (duration / 16)));
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = start + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate(this.querySelector("#cnt-tests"), testsWritten, 1200);
          animate(this.querySelector("#cnt-projects"), projectsCount, 600);
          animate(this.querySelector("#cnt-tools"), toolsCount, 800);
          animate(
            this.querySelector("#cnt-pass-rate"),
            passRatePercent,
            800,
            "%",
          );
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(this.querySelector(".stats-row"));
  }
}

customElements.define("qa-stats", QAStats);
