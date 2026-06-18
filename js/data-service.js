let socialData = null;
let profileData = null;
let statsData = null;
// Projects
let cachedProjects = null;
let urbanRoutesData = null;

/**
 * Obtiene los enlaces sociales desde social.json.
 * Los almacena en caché para no hacer múltiples fetch.
 * @returns {Promise<Object>} Objeto con github, linkedin, email...
 */
export async function getSocialLinks() {
  if (socialData) return socialData; // Retorna datos en caché si ya se han cargado
  try {
    const response = await fetch("./data/social.json");
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    socialData = await response.json(); // Almacena en caché
    return socialData;
  } catch (error) {
    console.error("No se pudieron cargar los enlaces sociales:", error);
    // Devuelve los valores por defecto para que la UI no se rompa
    return {
      github: "#",
      linkedin: "#",
      email: "#",
    };
  }
}

export async function getProfile() {
  if (profileData) return profileData;
  try {
    const response = await fetch("./data/profile.json");
    if (!response.ok)
      throw new Error(` ${response.status}: ${response.statusText}`);
    profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error("No se pudo cargar el perfil:", error);
    return {
      name: "Ariel Pino",
      role: "QA Engineer",
      specialties: "Automation · Python",
      badges: [],
      terminalLines: [],
    };
  }
}

export async function getProjects() {
  if (cachedProjects) return cachedProjects;
  try{
    // 1. Obtiene la lista de IDs y componentes
    const listRes = await fetch("./data/projects/list.json");
    const list = await listRes.json();

    // 2. Carga cada proyecto en paralelo
    const projectPromises = list.map(async (item) => {
      const res = await fetch(`./data/projects/${item.id}.json`);
      if (!res.ok) throw new Error(`No se pudo cargar ${item.id}.json`);
      const data = await res.json();
      return { ...data, component: item.component }; // Guarda también el nombre del componente por si se necesita
    });

    cachedProjects = await Promise.all(projectPromises);
    return cachedProjects;
  } catch (error) {
    console.error("Error cargando proyectos:", error)
    return [];
  }
}
