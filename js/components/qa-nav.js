import { getSocialLinks } from "../data-service.js";

class QANav extends HTMLElement {
  async connectedCallback() {
    /* try {
      const socialLinks = await getSocialLinks();
      this.render(socialLinks);
    } catch (error) {
      console.error('No se pudieron cargar los enlaces sociales:', error);
      this.render({ github: '#', linkedin: '#' }); // fallback
    } */
    const socialLinks = await getSocialLinks();
    this.render(socialLinks);
  }

  render(socialLinks) {
    this.innerHTML = /*html*/ `
        <nav>
            <!-- Logo "~/apm.qa" --> 
            <div class="nav-logo">
                <span>~/</span>apm<span>.qa</span>
            </div>
            
            <!-- Links de navegación -->
            <ul class="nav-links">
                <li><a href="#about">about</a></li>
                <li><a href="#projects">test_suite</a></li>
                <li><a href="#toolkit">toolkit</a></li>
                <li><a href="#contact">open_issue</a></li>
                <li><a href="${socialLinks.github}" target= "_blank" class="badge badge-passed" style="border-radius:4px;">GitHub ↗</a></li>
                <li><a href="${socialLinks.linkedin}" target= "_blank" rel="noopener" class="badge badge-passed" style="border-radius:4px;">LinkedIn ↗</a></li>
            </ul>
        </nav>
    `;
  }
}

customElements.define("qa-nav", QANav);
