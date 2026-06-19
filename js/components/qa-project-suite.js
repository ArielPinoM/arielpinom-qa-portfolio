import { getProjects } from "../data-service.js";

class QAProjectSuite extends HTMLElement {
    async connectedCallback() {
        const projects = await getProjects();
        this.render(projects);
    }

    render(projects) {
        // Crea las etiquetas de las tarjetas y les pasa los datos
        const cardsHTML = projects.map(project => `<${project.component}></${project.component}>`).join('');

        this.innerHTML = /*html*/`
            <section id="projects">
                <div class="container">
                    <p class="section-label">suite de pruebas</p>
                    <h2 class="section-title">The Test Suite</h2>
                    <div class="projects-grid">
                    ${cardsHTML}
                    </div>
                </div>
            </section>
        `;

        // Una vez que los elementos están en el DOM, les asignamos los datos
        projects.forEach(project => {
            const card = this.querySelector(project.component);
            if (card) card.projectData = project;
        });
    }
}

customElements.define('qa-project-suite', QAProjectSuite);