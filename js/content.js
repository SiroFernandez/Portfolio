/* ==================================================================
   CONTENIDO DEL PORTFOLIO (ES / EN)
   ------------------------------------------------------------------
   Es el único archivo que necesitas tocar para cambiar textos,
   enlaces o proyectos.

   · Añadir un proyecto: copia un bloque de PROJECTS y rellénalo.
   · Enlaces de un proyecto: rellena "links", por ejemplo
       links: [{ label: { es: "Ver código", en: "View code" }, url: "https://github.com/..." }]
     Si lo dejas vacío ( links: [] ) no se muestra ningún enlace.
   · Filtros: "filters" usa las claves de FILTERS (java, web, ux…).
   · Imagen: "art" es la ruta a la ilustración en assets/works/.
   ================================================================== */

export const CONFIG = {
  emailUser: "sirofg04",          // parte antes de la @ (separada para despistar a los bots de spam)
  emailDomain: "gmail.com",
  linkedin: "https://www.linkedin.com/in/siro-fern%C3%A1ndez-garc%C3%ADa",
  github: "https://github.com/SiroFernandez"  // si lo dejas vacío, el enlace no se muestra
};

/* Filtros de la galería, agrupados. La clave se usa en cada proyecto. */
export const FILTERS = [
  {
    group: { es: "Tecnología", en: "Technology" },
    items: [
      { key: "java",   label: { es: "Java", en: "Java" } },
      { key: "spring", label: { es: "Spring Boot", en: "Spring Boot" } },
      { key: "js",     label: { es: "JavaScript", en: "JavaScript" } },
      { key: "php",    label: { es: "PHP", en: "PHP" } }
    ]
  },
  {
    group: { es: "Disciplina", en: "Discipline" },
    items: [
      { key: "web",      label: { es: "Web", en: "Web" } },
      { key: "realtime", label: { es: "Tiempo real", en: "Real time" } },
      { key: "desktop",  label: { es: "Escritorio", en: "Desktop" } },
      { key: "ux",       label: { es: "Diseño UX", en: "UX design" } }
    ]
  }
];

export const PROJECTS = [
  {
    id: "match4all",
    art: "assets/works/match4all.svg?v=20261023b",
    featured: true,
    filters: ["java", "spring", "web", "realtime"],
    stack: ["Java", "Spring Boot", "WebSockets", "HTML", "Maven"],
    links: [{ label: { es: "Ver código en GitHub", en: "View code on GitHub" }, url: "https://github.com/SiroFernandez/Match4All" }],
    es: {
      name: "Match4All",
      summary: "Plataforma para gestionar el fútbol amateur: ligas, torneos y estadísticas en tiempo real para organizadores, jugadores y árbitros.",
      kind: "Proyecto universitario · Ingeniería Web · Equipo de 3",
      artAlt: "Estudio en perspectiva de un campo de fútbol, con líneas de fuga y un marcador conectado a los jugadores.",
      plaque: [["Contexto", "Ingeniería Web (optativa)"], ["Equipo", "3 personas"], ["Rol", "Desarrollo en todas las partes, junto al equipo"]],
      highlights: [
        "Cuatro roles con su propio flujo: administrador, capitán, árbitro y jugador.",
        "Marcador y clasificación que se actualizan al instante mediante WebSockets.",
        "Pruebas externas automatizadas de los flujos principales."
      ],
      detail: "Match4All sustituye los grupos de chat y las hojas de cálculo con las que suele organizarse el fútbol amateur por una sola plataforma. Hay cuatro roles: el administrador crea las competiciones y genera el calendario de partidos cuando se cierra la inscripción, los capitanes crean equipos, los inscriben y gestionan la plantilla, los árbitros registran goles, tarjetas e incidencias durante el partido, y los jugadores consultan sus estadísticas. Cada evento que registra el árbitro actualiza al instante, mediante websockets, el marcador del partido y la clasificación de la competición. Incluye pruebas externas automatizadas de los flujos principales (crear equipo, crear liga, inscribir un equipo y arbitrar un partido). Lo hicimos en equipo de tres y todos participamos en todas las partes. Asignatura optativa de Ingeniería Web."
    },
    en: {
      name: "Match4All",
      summary: "A platform to manage amateur football: leagues, tournaments and live statistics for organisers, players and referees.",
      kind: "University project · Web Engineering · Team of 3",
      artAlt: "Perspective study of a football pitch, with vanishing lines and a scoreboard connected to the players.",
      plaque: [["Context", "Web Engineering (elective)"], ["Team", "3 people"], ["Role", "Development across every part, with the team"]],
      highlights: [
        "Four roles, each with its own flow: admin, captain, referee and player.",
        "Score and standings updated instantly through WebSockets.",
        "Automated external tests for the main flows."
      ],
      detail: "Match4All replaces the group chats and spreadsheets amateur football is usually organised with by a single platform. There are four roles: admins create competitions and generate the match calendar once registration closes, captains create teams, register them and manage the squad, referees record goals, cards and incidents during the match, and players check their own statistics. Every event the referee records instantly updates, via websockets, both the match score and the competition standings. It includes automated external tests for the main flows (creating a team, creating a league, registering a team and refereeing a match). We built it as a team of three and everyone worked on every part. It was an elective Web Engineering course."
    }
  },
  {
    id: "ecosistema",
    art: "assets/works/ecosistema.svg?v=20261023b",
    filters: ["java", "desktop"],
    stack: ["Java", "Swing", "JSON", { es: "Hilos", en: "Threads" }, "MVC", { es: "Patrones de diseño", en: "Design patterns" }],
    links: [],
    es: {
      name: "Simulador de ecosistema",
      summary: "Simulador en Java de un ecosistema con ovejas y lobos, regiones con comida y una interfaz gráfica para ejecutarlo en directo.",
      kind: "Proyecto universitario · Tecnología de la Programación II · En pareja",
      artAlt: "Diagrama circular dividido en regiones, con ovejas, lobos y trayectorias de caza.",
      plaque: [["Contexto", "Tecnología de la Programación II"], ["Equipo", "En pareja"], ["Rol", "Diseño y desarrollo de todas las partes"]],
      highlights: [
        "Arquitectura MVC con los patrones Factory/Builder, Strategy y Observer.",
        "Tres modos de ejecución con hilos: normal, Thread y SwingWorker.",
        "Ejecución por consola con entrada y salida en JSON, o con interfaz gráfica en Swing."
      ],
      detail: "Simulador de un ecosistema en Java. Ovejas y lobos se mueven por un mapa dividido en regiones, comen, se reproducen, huyen o cazan según su estado (normal, apareamiento, hambre o peligro). Las regiones pueden ser normales o de comida dinámica, que se regenera con el tiempo, y cada animal elige a su pareja, su presa o su peligro con distintas estrategias (primero, más cercano o más joven). Se puede ejecutar por línea de comandos, leyendo y escribiendo la simulación en JSON, o con una interfaz gráfica en Swing que muestra el mapa, las tablas de especies y regiones y permite cambiar las regiones. Aplica el patrón MVC y los patrones Factory/Builder, Strategy y Observer, e incluye tres modos de ejecución para trabajar con hilos (normal, Thread y SwingWorker), que fue la parte más desafiante. Lo hicimos entre dos personas y los dos participamos en todas las partes del proyecto."
    },
    en: {
      name: "Ecosystem simulator",
      summary: "A Java simulator of an ecosystem with sheep and wolves, food regions and a graphical interface to run it live.",
      kind: "University project · Programming Technology II · Pair project",
      artAlt: "Circular diagram divided into regions, with sheep, wolves and hunting paths.",
      plaque: [["Context", "Programming Technology II"], ["Team", "Pair project"], ["Role", "Design and development of every part"]],
      highlights: [
        "MVC architecture with the Factory/Builder, Strategy and Observer patterns.",
        "Three threaded execution modes: normal, Thread and SwingWorker.",
        "Runs from the command line with JSON input and output, or through a Swing GUI."
      ],
      detail: "An ecosystem simulator in Java. Sheep and wolves move around a map divided into regions, eat, reproduce, flee or hunt depending on their state (normal, mating, hunger or danger). Regions can be regular or dynamic-food regions, which regrow over time, and each animal picks its mate, prey or threat using different strategies (first, closest or youngest). It can run from the command line, reading and writing the simulation as JSON, or through a Swing graphical interface that shows the map, the species and region tables and lets you change the regions. It applies the MVC pattern and the Factory/Builder, Strategy and Observer design patterns, and includes three execution modes to work with threads (normal, Thread and SwingWorker), which was the most challenging part. We built it as a pair and both of us worked on every part of the project."
    }
  },
  {
    id: "torneos",
    art: "assets/works/torneos.svg?v=20261023b",
    filters: ["php", "js", "web", "realtime"],
    stack: ["PHP", "JavaScript"],
    links: [],
    es: {
      name: "Gestión de torneos en tiempo real",
      summary: "Web para gestionar torneos de videojuegos por eliminatorias, con clasificaciones y emparejamientos en tiempo real.",
      kind: "Proyecto universitario · Web · En equipo",
      artAlt: "Cuadro eliminatorio dibujado como una arquería clásica que culmina en una corona de laurel.",
      plaque: [["Contexto", "Proyecto web universitario"], ["Equipo", "En equipo"], ["Rol", "Desarrollo de todas las partes"]],
      highlights: [
        "Torneos en formato eliminatorio, de principio a fin.",
        "Clasificaciones y emparejamientos actualizados en tiempo real.",
        "Nuestra primera aplicación web, y un buen reto."
      ],
      detail: "Aplicación web desarrollada en PHP y JavaScript para organizar torneos de videojuegos en formato eliminatorio. Las clasificaciones y los emparejamientos con el rival se actualizaban en tiempo real. La hicimos en equipo y todos participamos en todas las partes del proyecto. Fue nuestra primera aplicación web, y un buen reto."
    },
    en: {
      name: "Real-time tournament management",
      summary: "Web app to manage knockout video game tournaments, with standings and matchups updated in real time.",
      kind: "University project · Web · Team",
      artAlt: "Knockout bracket drawn as a classical arcade that ends in a laurel wreath.",
      plaque: [["Context", "University web project"], ["Team", "Team project"], ["Role", "Development of every part"]],
      highlights: [
        "Knockout tournaments, from first round to final.",
        "Standings and matchups updated in real time.",
        "Our first web application, and a real challenge."
      ],
      detail: "A web application built with PHP and JavaScript to organise video game tournaments in a knockout format. Standings and matchups against the next opponent were updated in real time. We built it as a team and everyone worked on every part of the project. It was our first web application, and a real challenge."
    }
  },
  {
    id: "alimentacion",
    art: "assets/works/alimentacion.svg?v=20261023b",
    featured: true,
    filters: ["ux"],
    stack: [{ es: "Entrevistas a usuarios", en: "User interviews" }, { es: "Prototipado", en: "Prototyping" }],
    links: [],
    es: {
      name: "Control alimenticio",
      summary: "Diseño de una app móvil para personas con restricciones alimentarias, desde las entrevistas hasta el prototipo.",
      kind: "Proyecto universitario · Diseño de sistemas interactivos",
      artAlt: "Estudio botánico de una granada junto al boceto de una pantalla de móvil con un aviso.",
      plaque: [["Contexto", "Diseño de Sistemas Interactivos"], ["Equipo", "En equipo"], ["Rol", "Entrevistas con usuarios y prototipado"]],
      highlights: [
        "Fui quien más participó en las entrevistas con usuarios.",
        "Avisos de alérgenos, restaurantes adecuados y consulta de productos de supermercado.",
        "Contribuyó a que obtuviera matrícula de honor en la asignatura."
      ],
      detail: "Proyecto de la asignatura de Diseño de Sistemas Interactivos: diseñamos en equipo el prototipo de una app para personas con alergias, veganismo, vegetarianismo, celiaquía o dieta halal. La app avisa de alérgenos, sugiere restaurantes adecuados y permite consultar productos de supermercado. No llegó a programarse ni a publicarse, porque el trabajo se centró en el diseño. Fui quien más participó en las entrevistas con usuarios, y el proyecto contribuyó a que obtuviera matrícula de honor en la asignatura."
    },
    en: {
      name: "Food tracking",
      summary: "Design of a mobile app for people with dietary restrictions, from user interviews to prototype.",
      kind: "University project · Interactive systems design",
      artAlt: "Botanical study of a pomegranate next to a sketch of a phone screen showing an alert.",
      plaque: [["Context", "Interactive Systems Design"], ["Team", "Team project"], ["Role", "User interviews and prototyping"]],
      highlights: [
        "I took the lead on the user interviews.",
        "Allergen alerts, suitable restaurants and supermarket product lookup.",
        "It contributed to me earning the top grade (Matrícula de Honor) in the course."
      ],
      detail: "Project for the Interactive Systems Design course: as a team we designed the prototype of an app for people with allergies, or who are vegan, vegetarian, coeliac or follow a halal diet. The app warns about allergens, suggests suitable restaurants and lets users browse supermarket products. It was never coded or released, because the work focused on design. I took the lead on the user interviews, and the project contributed to me earning the top grade (Matrícula de Honor) in the course."
    }
  }
];

/* Textos de la interfaz */
export const I18N = {
  es: {
    pageTitle: "Siro Fernández García · Portfolio",
    skip: "Saltar al contenido",
    menu: "Menú",
    navProjects: "Proyectos",
    navSkills: "Habilidades",
    navAbout: "Sobre mí",
    navContact: "Contacto",
    heroEyebrow: "Portfolio",
    heroRole: "Ingeniería Informática · Universidad Complutense de Madrid",
    heroLead: "Estudiante de Ingeniería Informática en la Universidad Complutense de Madrid. Desarrollo software y me interesan la ciberseguridad y las apps móviles.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contacto",
    scroll: "Desplázate",
    facts: [["4", "proyectos expuestos"], ["8", "lenguajes de programación"], ["4", "idiomas"], ["2022", "inicio del grado"]],

    projectsEyebrow: "La galería",
    projectsTitle: "Proyectos",
    projectsIntro: "Proyectos de asignaturas distintas, de la arquitectura de software al diseño con usuarios. Abre cualquiera para ver su ficha completa.",
    filterLabel: "Filtrar por",
    filterAll: "Todos",
    filterCount: (n) => n === 1 ? "1 proyecto" : `${n} proyectos`,
    viewWork: "Ver proyecto",
    stackLabel: "Tecnologías y métodos",
    techLabel: "Técnica",
    highlightsLabel: "Claves del proyecto",
    prevWork: "Proyecto anterior",
    nextWork: "Proyecto siguiente",
    close: "Cerrar",
    of: "de",
    newTab: "(se abre en una pestaña nueva)",

    skillsEyebrow: "El taller",
    skillsTitle: "Habilidades",
    skillsIntro: "Rigor de ingeniería y sensibilidad de diseño: las dos mitades con las que trabajo, y dónde las he aplicado.",
    balance: [
      {
        title: "Ingeniería",
        items: [
          ["Arquitectura", "MVC · Factory/Builder, Strategy y Observer", "Simulador de ecosistema"],
          ["Tiempo real", "Actualizaciones en vivo con WebSockets", "Match4All"],
          ["Concurrencia", "Hilos: Thread y SwingWorker", "Simulador de ecosistema"],
          ["Calidad", "Pruebas externas automatizadas", "Match4All"]
        ]
      },
      {
        title: "Diseño",
        items: [
          ["Investigación", "Entrevistas con usuarios", "Control alimenticio"],
          ["Prototipado", "De las entrevistas al prototipo", "Control alimenticio"],
          ["Interfaces", "Fundamentos de UI/UX y Figma", null],
          ["Método", "Metodologías ágiles (Scrum)", null]
        ]
      }
    ],
    skills: [
      ["Lenguajes", "Python, Java, JavaScript, TypeScript, C, C++, SQL, PHP"],
      ["Bases de datos", "MySQL, MongoDB"],
      ["Gestión", "Metodologías ágiles (Scrum)"],
      ["Seguridad", "Fundamentos de seguridad y protección de datos"],
      ["Sistemas y redes", "Administración básica de Linux y servidores Windows, configuración de redes locales"],
      ["Diseño", "Fundamentos de diseño de interfaces (UI/UX), Figma"]
    ],
    langsTitle: "Idiomas",
    langs: [["Español", "nativo", 4], ["Inglés", "avanzado", 3], ["Portugués", "medio-bajo", 2], ["Alemán", "básico", 1]],
    levelOf: "nivel",

    aboutEyebrow: "El autor",
    aboutTitle: "Sobre mí",
    aboutQuote: "Creo que la tecnología debe desarrollarse con criterio ético y responsable.",
    aboutText: "Combino una base técnica sólida con interés por el desarrollo de software y la gestión de proyectos de TI. Me motiva resolver problemas de forma creativa y creo que la tecnología debe desarrollarse con criterio ético y responsable. Trabajo con metodologías ágiles (Scrum) y me adapto rápido a entornos que cambian.",
    principles: [
      ["Criterio", "Tecnología desarrollada con ética y responsabilidad."],
      ["Creatividad", "Resolver problemas buscando la solución más clara."],
      ["Adaptación", "Equipos ágiles y entornos que cambian."]
    ],
    eduLabel: "Formación",
    degree: "Grado en Ingeniería Informática",
    uni: "Universidad Complutense de Madrid · 2022 – actualidad",
    eduSpec: "Especialidad: Tecnologías de la Información.",
    eduKey: "Competencias clave: ciberseguridad, auditoría de sistemas, redes y sistemas operativos.",

    contactEyebrow: "Correspondencia",
    contactTitle: "Contacto",
    contactText: "Si quieres comentar alguno de mis proyectos, escríbeme.",
    copyBtn: "Copiar email",
    copied: "Email copiado al portapapeles.",
    footer: "© 2026 Siro Fernández García",
    backTop: "Volver arriba"
  },

  en: {
    pageTitle: "Siro Fernández García · Portfolio",
    skip: "Skip to content",
    menu: "Menu",
    navProjects: "Projects",
    navSkills: "Skills",
    navAbout: "About",
    navContact: "Contact",
    heroEyebrow: "Portfolio",
    heroRole: "Computer Engineering · Complutense University of Madrid",
    heroLead: "Computer Engineering student at Complutense University of Madrid. I build software and I’m interested in cybersecurity and mobile apps. I’m looking for an internship or a part-time contract.",
    ctaProjects: "See projects",
    ctaContact: "Contact",
    scroll: "Scroll",
    facts: [["4", "projects on show"], ["8", "programming languages"], ["4", "spoken languages"], ["2022", "degree started"]],

    projectsEyebrow: "The gallery",
    projectsTitle: "Projects",
    projectsIntro: "Projects from different courses, from software architecture to designing with users. Open any of them to see the full record.",
    filterLabel: "Filter by",
    filterAll: "All",
    filterCount: (n) => n === 1 ? "1 project" : `${n} projects`,
    viewWork: "View project",
    stackLabel: "Technologies and methods",
    techLabel: "Medium",
    highlightsLabel: "Key points",
    prevWork: "Previous project",
    nextWork: "Next project",
    close: "Close",
    of: "of",
    newTab: "(opens in a new tab)",

    skillsEyebrow: "The workshop",
    skillsTitle: "Skills",
    skillsIntro: "Engineering rigour and a feel for design: the two halves I work with, and where I have used them.",
    balance: [
      {
        title: "Engineering",
        items: [
          ["Architecture", "MVC · Factory/Builder, Strategy and Observer", "Ecosystem simulator"],
          ["Real time", "Live updates with WebSockets", "Match4All"],
          ["Concurrency", "Threads: Thread and SwingWorker", "Ecosystem simulator"],
          ["Quality", "Automated external tests", "Match4All"]
        ]
      },
      {
        title: "Design",
        items: [
          ["Research", "User interviews", "Food tracking"],
          ["Prototyping", "From interviews to prototype", "Food tracking"],
          ["Interfaces", "UI/UX fundamentals and Figma", null],
          ["Method", "Agile methodologies (Scrum)", null]
        ]
      }
    ],
    skills: [
      ["Languages", "Python, Java, JavaScript, TypeScript, C, C++, SQL, PHP"],
      ["Databases", "MySQL, MongoDB"],
      ["Management", "Agile methodologies (Scrum)"],
      ["Security", "Fundamentals of security and data protection"],
      ["Systems and networks", "Basic Linux and Windows Server administration, local network configuration"],
      ["Design", "Fundamentals of interface design (UI/UX), Figma"]
    ],
    langsTitle: "Spoken languages",
    langs: [["Spanish", "native", 4], ["English", "advanced", 3], ["Portuguese", "lower-intermediate", 2], ["German", "basic", 1]],
    levelOf: "level",

    aboutEyebrow: "The author",
    aboutTitle: "About me",
    aboutQuote: "I believe technology should be built with ethics and responsibility in mind.",
    aboutText: "I combine a solid technical foundation with an interest in software development and IT project management. I enjoy solving problems creatively, and I believe technology should be built with ethics and responsibility in mind. I work with agile methodologies (Scrum) and adapt quickly to changing environments.",
    principles: [
      ["Judgement", "Technology built with ethics and responsibility."],
      ["Creativity", "Solving problems by looking for the clearest answer."],
      ["Adaptability", "Agile teams and changing environments."]
    ],
    eduLabel: "Education",
    degree: "BSc in Computer Engineering",
    uni: "Complutense University of Madrid · 2022 – present",
    eduSpec: "Specialisation: Information Technologies.",
    eduKey: "Key skills: cybersecurity, systems auditing, networks and operating systems.",

    contactEyebrow: "Correspondence",
    contactTitle: "Contact",
    contactText: "If you have an internship opportunity or want to talk about any of my projects, get in touch.",
    copyBtn: "Copy email",
    copied: "Email copied to clipboard.",
    footer: "© 2026 Siro Fernández García",
    backTop: "Back to top"
  }
};
