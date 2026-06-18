class UrbanRoutesCard extends HTMLElement {
  async connectedCallback() {
    if (!this._data) {
        // Fallback: carga por su cuenta si no se le inyectaron datos
        try {
            const res = await fetch('../../../data/projects/urban-routes.json');
        } catch (err) {
            console.log(err)
            return;
        }
    }
    this.render(this._data);
  }

  set projectData(data) {
    this._data = data;
    if(this.isConnected) this.render(data);
  }

  render(data) {
    this.innerHTML = /*html*/ `
    <div class="suite-header">
        <div class="suite-header-left">
            <span style="color:var(--c-passed);">▶</span>
            <span>test_session :: ${data.component}</span>
        </div>
        <span style="color:var(--c-passed);">${data.metrics.tests} tests</span>
    </div>
    <div class="test-card">
        <div class="test-card-header">
            <div>
                <div class="test-id">${data.id} · ${data.file}</div>
                <div class="test-name">${data.name}</div>
                <div class="test-description">${data.description}</div>
                <div class="test-h2">Objetivo</div>
                <div class="test-description">${data.objective}</div>
                <div class="test-h2">Problemática</div><div class="test-description">${data.problemStatement}</div>
                <div class="test-h2">Aprendizajes y Logros</div>
                <div class="test-description">${data.keyLearningsAndAchievements}</div>

            </div>
            <span class="status-badge badge-info">[ 🎓 BOOTCAMP ]</span>
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
        `;
  }
}

customElements.define("urban-routes-card", UrbanRoutesCard);
