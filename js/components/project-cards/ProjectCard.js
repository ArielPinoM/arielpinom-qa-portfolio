export class ProjectCard extends HTMLElement {
  static _overlay = null;
  static _lightboxImg = null;
  static _closeBtn = null;
  static _lastFocusedElement = null;

  static getOverlay() {
    if (!ProjectCard._overlay) {
      ProjectCard._overlay = document.createElement("div");
      ProjectCard._overlay.className = "lightbox-overlay";
      ProjectCard._overlay.setAttribute("inert", "");
      ProjectCard._overlay.style.display = "none";

      ProjectCard._lightboxImg = document.createElement("img");
      ProjectCard._lightboxImg.className = "lightbox-img";
      ProjectCard._lightboxImg.alt = "Vista ampliada";

      ProjectCard._closeBtn = document.createElement("span");
      ProjectCard._closeBtn.className = "lightbox-close";
      ProjectCard._closeBtn.setAttribute("role", "button");
      ProjectCard._closeBtn.setAttribute("tabindex", "0");
      ProjectCard._closeBtn.textContent = "[x]";

      const content = document.createElement("div");
      content.className = "lightbox-content";
      content.appendChild(ProjectCard._lightboxImg);
      content.appendChild(ProjectCard._closeBtn);

      ProjectCard._overlay.appendChild(content);
      document.body.appendChild(ProjectCard._overlay);

      // Eventos de cierre
      ProjectCard._overlay.addEventListener("click", (e) => {
        if (e.target === ProjectCard._overlay) {
          ProjectCard._closeOverlay();
        }
      });
      ProjectCard._closeBtn.addEventListener(
        "click",
        ProjectCard._closeOverlay,
      );
      ProjectCard._closeBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          ProjectCard._closeOverlay();
        }
      });
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          ProjectCard._overlay.style.display === "flex"
        ) {
          ProjectCard._closeOverlay();
        }
      });
    }
    return ProjectCard._overlay;
  }

  static _closeOverlay() {
    if (!ProjectCard._overlay) return;
    ProjectCard._overlay.style.display = "none";
    ProjectCard._overlay.setAttribute("inert", "");
    ProjectCard._lightboxImg.src = "";
    if (ProjectCard._lastFocusedElement) {
      ProjectCard._lastFocusedElement.focus();
      ProjectCard._lastFocusedElement = null;
    }
  }

  constructor() {
    super(); // ← Obligatorio
    this._data = null;
  }

  async connectedCallback() {
    if (!this._data) {
      try {
        const res = await fetch(this.dataUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this._data = await res.json();
      } catch (err) {
        console.error(err);
        return;
      }
    }
    this.render(this._data);
    this.setupToggle();
    this.setupLightbox();
  }

  set projectData(data) {
    this._data = data;
    if (this.isConnected) {
      this.render(data);
      this.setupToggle(); // ← Reconectar eventos
      this.setupLightbox(); // ←
    }
  }

  render(data) {
    throw new Error("render() debe ser implementado por la subclase");
  }

  setupToggle() {
    const collapsed = this.querySelector(".card-collapsed");
    if (!collapsed) return;

    collapsed.addEventListener("click", (e) => {
      // Si el clic proviene de la imagen del proyecto, no hacemos toggle
      if (e.target.closest(".project-img")) return;
      this.classList.toggle("expanded");

      // Hacer scroll hacia la tarjeta
      setTimeout(() => {
        this.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    });

    // Accesibilidad con teclado
    collapsed.setAttribute("tabindex", "0");
    collapsed.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        collapsed.click();
      }
    });
  }

  setupLightbox() {
    this._overlay = ProjectCard.getOverlay();
    this._lightboxImg = ProjectCard._lightboxImg;
    this._closeBtn = ProjectCard._closeBtn;

    // Listener delegado para abrir el lightbox al hacer clic en cualquier imagen del proyecto
    this.addEventListener("click", (e) => {
      const img = e.target.closest(".project-img");
      if (img) {
        e.stopPropagation(); // Evita que el toggle se active
        ProjectCard._lastFocusedElement = document.activeElement;
        this._open(img.src);
      }
    });
  }

  _open(imgSrc) {
    this._lightboxImg.src = imgSrc;
    this._overlay.style.display = "flex";
    this._overlay.removeAttribute("inert");
    this._closeBtn.focus();
  }
}
