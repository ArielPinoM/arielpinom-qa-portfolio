import { getSocialLinks } from "../data-service.js";

class QAContact extends HTMLElement {
  async connectedCallback() {
    const social = await getSocialLinks();
    this.render(social);
    this.setupForm(social.email);
  }

  render(social) {
    this.innerHTML = /*html*/ `
      <section id="contact">
        <div class="container">
          <p class="section-label">formulario de contacto</p>
          <h2 class="section-title">Abrir un Issue</h2>

          <div class="issue-form">
            <div class="issue-form-header">
              <span class="status-dot"></span>
              <span>New Issue</span>
              <span class="issue-num">#new</span>
              <span class="issue-meta">ariel-portfolio / contact.yml</span>
            </div>
            <form class="issue-form-body" novalidate>
              <div class="form-group">
                <label class="form-label">Summary / Asunto <span class="required">*</span></label>
                <input class="form-input" name="summary" type="text" placeholder="ej: Oferta para posición QA Automation · ACME Corp" required>
              </div>

              <div class="form-group">
                <label class="form-label">Issue Type / Severidad <span class="required">*</span></label>
                <div class="severity-group">
                  <div>
                    <input type="radio" name="severity" id="sev-job" class="severity-opt" value="Oferta laboral" checked>
                    <label for="sev-job" class="severity-label">
                      <span class="severity-tag">💼 Oferta laboral</span>
                      <span>Reclutamiento o vacante</span>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="severity" id="sev-tech" class="severity-opt" value="Duda técnica">
                    <label for="sev-tech" class="severity-label">
                      <span class="severity-tag">🔧 Duda técnica</span>
                      <span>Sobre el código o proyectos</span>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="severity" id="sev-biz" class="severity-opt" value="Colaboración">
                    <label for="sev-biz" class="severity-label">
                      <span class="severity-tag">🤝 Colaboración</span>
                      <span>Proyecto o freelance</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Reporter / Tu nombre <span class="required">*</span></label>
                <input class="form-input" name="reporter" type="text" placeholder="Tu nombre completo" required>
              </div>

              <div class="form-group">
                <label class="form-label">Assignee Email <span class="required">*</span></label>
                <input class="form-input" name="assignee" type="email" placeholder="tu@empresa.com" required>
              </div>

              <div class="form-group">
                <label class="form-label">Steps to Reproduce / Mensaje <span class="required">*</span></label>
                <textarea class="form-textarea" name="message" placeholder="Describe el contexto, la oportunidad o tu consulta con el mayor detalle posible..." required></textarea>
              </div>

              <div class="form-footer">
                <span class="form-hint">
                  <span>~</span>
                  Respuesta en &lt; 48h · Estado: <span>OPEN</span>
                </span>
                <button class="btn-submit" type="submit">→ Submit Issue</button>
              </div>
              <div class="form-status" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  setupForm(targetEmail) {
    const form = this.querySelector('form');
    const status = this.querySelector('.form-status');
    if (!form) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      const summary = formData.get('summary')?.trim();
      const reporter = formData.get('reporter')?.trim();
      const assignee = formData.get('assignee')?.trim();
      const message = formData.get('message')?.trim();
      const severity = formData.get('severity');

      if (!summary || !reporter || !assignee || !message) {
        status.textContent = 'Por favor completa todos los campos requeridos.';
        status.style.color = '#e74c3c';
        return;
      }

      const subject = encodeURIComponent(`Issue: ${summary}`);
      const body = encodeURIComponent(`Tipo: ${severity}\nReporter: ${reporter}\nAssignee: ${assignee}\n\nMensaje:\n${message}`);
      const mailto = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      status.textContent = 'Abriendo cliente de correo...';
      status.style.color = '#2ecc71';
    });
  }
}

customElements.define('qa-contact', QAContact);
