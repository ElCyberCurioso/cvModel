/* ==========================================================================
   CONFIGURACIÓN DEL CV  ·  CV CONFIGURATION
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para personalizar la página.
   Todo el contenido, los colores y el orden de las secciones salen de aquí.

   TEXTOS BILINGÜES: cualquier texto puede ser
     - un texto simple:         "Madrid"            (igual en todos los idiomas)
     - un objeto por idioma:    { es: "Remoto", en: "Remote" }
   Lo mismo vale para listas: { es: ["…"], en: ["…"] }

   Tras editar, ejecuta `node tools/build.js` (o deja que lo haga GitHub Actions)
   para regenerar la versión legible por IA/ATS: HTML estático, cv.*.md y resume.json.
   Consulta README.md para la referencia completa.
   ========================================================================== */

window.CV = {
  /* ---------- Idiomas, metadatos y SEO ---------- */
  meta: {
    languages: ["es", "en"], // Idiomas disponibles (el primero es el predeterminado)
    defaultLang: "es",
    locales: { es: "es-ES", en: "en-US" }, // Formato de fechas y números por idioma
    url: "", // URL pública final, ej: "https://usuario.github.io/" (canonical, hreflang, sitemap)
    ogImage: "", // Imagen 1200x630 para redes sociales (opcional)
    title: {
      es: "Alex Rivera — Full Stack Developer",
      en: "Alex Rivera — Full Stack Developer",
    },
    description: {
      es: "Currículum y portfolio de Alex Rivera, desarrollador Full Stack con 8+ años de experiencia en TypeScript, React, Node.js y AWS.",
      en: "Resume and portfolio of Alex Rivera, Full Stack Developer with 8+ years of experience in TypeScript, React, Node.js and AWS.",
    },
  },

  /* ---------- Apariencia ---------- */
  theme: {
    mode: "dark", // "dark" | "light" | "auto"
    accent: "violet", // violet | ocean | emerald | sunset | rose | amber | custom
    customColors: { primary: "#8b5cf6", secondary: "#22d3ee" }, // si accent = "custom"
    customizer: true, // Panel flotante de colores (ideal para demo; false para el cliente)
    animations: true,
  },

  /* ---------- Perfil ---------- */
  profile: {
    name: "Alex Rivera",
    initials: "AR",
    photo: "", // Ej: "assets/img/foto.jpg". Vacío = iniciales
    roles: {
      es: ["Full Stack Developer", "Arquitecto Cloud", "Especialista en React", "Mentor Open Source"],
      en: ["Full Stack Developer", "Cloud Architect", "React Specialist", "Open Source Mentor"],
    },
    tagline: {
      es: "Diseño y construyo productos digitales rápidos, escalables y accesibles. Más de 8 años convirtiendo ideas complejas en software que la gente disfruta usar.",
      en: "I design and build fast, scalable and accessible digital products. 8+ years turning complex ideas into software people enjoy using.",
    },
    location: { es: "Madrid, España", en: "Madrid, Spain" },
    email: "alex.rivera@example.com",
    phone: "+34 600 000 000",
    website: "", // Web personal (opcional)
    availability: {
      open: true,
      text: { es: "Disponible para nuevos proyectos", en: "Available for new projects" },
    },
    // PDF del CV. Puede ser uno por idioma. Vacío = genera versión imprimible
    resumeUrl: { es: "", en: "" },
    mainStack: ["TypeScript", "React", "Node.js", "AWS"],
    // Idiomas que habla la persona (aparecen en el CV en texto y en datos estructurados)
    languages: [
      { code: "es", name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
      { code: "en", name: { es: "Inglés", en: "English" }, level: { es: "Avanzado (C1)", en: "Advanced (C1)" } },
    ],
    socials: [
      { type: "github", label: "GitHub", url: "https://github.com/" },
      { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/" },
      { type: "x", label: "X / Twitter", url: "https://x.com/" },
      { type: "mail", label: "Email", url: "mailto:alex.rivera@example.com" },
    ],
  },

  /* ---------- Hero ---------- */
  hero: {
    hello: { es: "Hola, soy", en: "Hi, I'm" },
    ctaPrimary: { label: { es: "Ver proyectos", en: "View projects" }, href: "#projects" },
    ctaSecondary: { label: { es: "Descargar CV", en: "Download CV" } },
    codeFile: "developer.ts",
    codeComment: { es: "Siempre aprendiendo algo nuevo", en: "Always learning something new" },
    codeReturn: { es: "¡Hablemos! 🚀", en: "Let's talk! 🚀" },
    badges: [
      { icon: "zap", text: "100 Lighthouse" },
      { icon: "star", text: { es: "2.4k ★ en GitHub", en: "2.4k ★ on GitHub" } },
      { icon: "users", text: { es: "Mentor en 3 bootcamps", en: "Mentor at 3 bootcamps" } },
    ],
  },

  /* ---------- Cifras destacadas ---------- */
  stats: [
    { value: 8, suffix: "+", label: { es: "Años de experiencia", en: "Years of experience" } },
    { value: 45, suffix: "+", label: { es: "Proyectos entregados", en: "Projects delivered" } },
    { value: 30, suffix: "+", label: { es: "Clientes satisfechos", en: "Happy clients" } },
    { value: 2.4, suffix: "k", decimals: 1, label: { es: "Estrellas en GitHub", en: "GitHub stars" } },
  ],

  /* ---------- Orden y textos de las secciones ----------
     eyebrow: usa el nombre estándar de la sección ("Experiencia", "Skills"…). Forma parte
     del encabezado <h2> y es lo que usan los ATS/IA para reconocer cada bloque del CV.
     Cambia el orden del array para reordenar la página. enabled: false la oculta. */
  sections: [
    {
      id: "about",
      enabled: true,
      nav: { es: "Sobre mí", en: "About" },
      eyebrow: { es: "Sobre mí", en: "About me" },
      title: { es: "Código con propósito, producto con criterio", en: "Code with purpose, products with judgment" },
      subtitle: {
        es: "Un poco sobre quién soy, cómo trabajo y qué me motiva cada día.",
        en: "A bit about who I am, how I work and what drives me every day.",
      },
    },
    {
      id: "skills",
      enabled: true,
      nav: { es: "Habilidades", en: "Skills" },
      eyebrow: { es: "Habilidades", en: "Skills" },
      title: { es: "Herramientas que domino", en: "Tools I master" },
      subtitle: {
        es: "Tecnologías con las que trabajo a diario en producción y que sigo perfeccionando.",
        en: "Technologies I use daily in production and keep sharpening.",
      },
    },
    {
      id: "experience",
      enabled: true,
      nav: { es: "Experiencia", en: "Experience" },
      eyebrow: { es: "Experiencia", en: "Experience" },
      title: { es: "Trayectoria profesional", en: "Career path" },
      subtitle: {
        es: "Empresas y equipos con los que he construido producto real, a escala.",
        en: "Companies and teams I've built real products with, at scale.",
      },
    },
    {
      id: "projects",
      enabled: true,
      nav: { es: "Proyectos", en: "Projects" },
      eyebrow: { es: "Proyectos", en: "Projects" },
      title: { es: "Proyectos destacados", en: "Featured projects" },
      subtitle: {
        es: "Una selección de trabajos personales y profesionales de los que me siento orgulloso.",
        en: "A selection of personal and professional work I'm proud of.",
      },
    },
    {
      id: "education",
      enabled: true,
      nav: { es: "Formación", en: "Education" },
      eyebrow: { es: "Formación", en: "Education" },
      title: { es: "Educación y certificaciones", en: "Education & certifications" },
      subtitle: {
        es: "La base académica y las acreditaciones que respaldan mi trabajo.",
        en: "The academic background and credentials behind my work.",
      },
    },
    {
      id: "testimonials",
      enabled: true,
      nav: { es: "Testimonios", en: "Testimonials" },
      eyebrow: { es: "Testimonios", en: "Testimonials" },
      title: { es: "Lo que dicen de mí", en: "What people say" },
      subtitle: {
        es: "Opiniones de compañeros, managers y clientes con los que he colaborado.",
        en: "Feedback from teammates, managers and clients I've worked with.",
      },
    },
    {
      id: "contact",
      enabled: true,
      nav: { es: "Contacto", en: "Contact" },
      eyebrow: { es: "Contacto", en: "Contact" },
      title: { es: "¿Construimos algo juntos?", en: "Shall we build something together?" },
      subtitle: {
        es: "Estoy abierto a nuevas oportunidades, colaboraciones y proyectos freelance. Respondo en menos de 24 horas.",
        en: "I'm open to new opportunities, collaborations and freelance projects. I reply within 24 hours.",
      },
    },
  ],

  /* ---------- Sobre mí ---------- */
  about: {
    paragraphs: {
      es: [
        "Soy desarrollador <strong>Full Stack</strong> con más de 8 años de experiencia creando aplicaciones web para startups y empresas tecnológicas. Me especializo en el ecosistema <strong>TypeScript</strong>: interfaces en React y Next.js, APIs en Node.js e infraestructura en AWS.",
        "Me obsesiona la calidad: código limpio, tests que dan confianza, rendimiento medible y experiencias accesibles para todos. Disfruto tanto diseñando la arquitectura de un sistema como puliendo el último detalle de una animación.",
        "Fuera del trabajo contribuyo a proyectos open source, escribo sobre desarrollo web y mentorizo a personas que están dando sus primeros pasos en la programación.",
      ],
      en: [
        "I'm a <strong>Full Stack</strong> developer with 8+ years of experience building web applications for startups and tech companies. I specialize in the <strong>TypeScript</strong> ecosystem: React and Next.js interfaces, Node.js APIs and AWS infrastructure.",
        "I'm obsessed with quality: clean code, tests you can trust, measurable performance and experiences that are accessible to everyone. I enjoy designing a system's architecture as much as polishing the last detail of an animation.",
        "Outside work I contribute to open source, write about web development and mentor people taking their first steps in programming.",
      ],
    },
    facts: [
      { icon: "map-pin", label: { es: "Ubicación", en: "Location" }, value: { es: "Madrid, España", en: "Madrid, Spain" } },
      { icon: "briefcase", label: { es: "Modalidad", en: "Work mode" }, value: { es: "Remoto · Híbrido", en: "Remote · Hybrid" } },
      { icon: "globe", label: { es: "Idiomas", en: "Languages" }, value: { es: "Español · Inglés C1", en: "Spanish · English C1" } },
      { icon: "clock", label: { es: "Zona horaria", en: "Time zone" }, value: "CET (UTC+1)" },
    ],
  },

  /* ---------- Habilidades ----------
     icon: clase de Devicon (https://devicon.dev). Vacío = iniciales.
     colored: false para iconos monocromo (logos negros en modo oscuro). */
  skillLevels: [
    { min: 90, label: { es: "Experto", en: "Expert" } },
    { min: 75, label: { es: "Avanzado", en: "Advanced" } },
    { min: 50, label: { es: "Intermedio", en: "Intermediate" } },
    { min: 0, label: { es: "Básico", en: "Basic" } },
  ],
  skills: [
    {
      category: "Frontend",
      icon: "layout",
      items: [
        { name: "TypeScript", icon: "devicon-typescript-plain", level: 95 },
        { name: "React", icon: "devicon-react-original", level: 95 },
        { name: "Next.js", icon: "devicon-nextjs-plain", level: 90, colored: false },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-original", level: 88 },
        { name: "Vue.js", icon: "devicon-vuejs-plain", level: 70 },
      ],
    },
    {
      category: "Backend",
      icon: "server",
      items: [
        { name: "Node.js", icon: "devicon-nodejs-plain", level: 92 },
        { name: "NestJS", icon: "devicon-nestjs-original", level: 85 },
        { name: "Python", icon: "devicon-python-plain", level: 78 },
        { name: "GraphQL", icon: "devicon-graphql-plain", level: 82 },
        { name: "Go", icon: "devicon-go-original-wordmark", level: 60 },
      ],
    },
    {
      category: { es: "Datos", en: "Data" },
      icon: "database",
      items: [
        { name: "PostgreSQL", icon: "devicon-postgresql-plain", level: 88 },
        { name: "MongoDB", icon: "devicon-mongodb-plain", level: 80 },
        { name: "Redis", icon: "devicon-redis-plain", level: 75 },
        { name: "Prisma", icon: "devicon-prisma-original", level: 85, colored: false },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: "cloud",
      items: [
        { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", level: 85, colored: false },
        { name: "Docker", icon: "devicon-docker-plain", level: 88 },
        { name: "Kubernetes", icon: "devicon-kubernetes-plain", level: 70 },
        { name: "GitHub Actions", icon: "devicon-githubactions-plain", level: 85 },
        { name: "Terraform", icon: "devicon-terraform-plain", level: 68 },
      ],
    },
  ],
  marquee: [], // Vacío = se genera desde skills

  /* ---------- Experiencia ----------
     Fechas "AAAA-MM". end: null = puesto actual. */
  experience: [
    {
      role: "Senior Full Stack Engineer",
      company: "Nébula Labs",
      url: "https://example.com",
      type: { es: "Tiempo completo", en: "Full-time" },
      location: { es: "Remoto", en: "Remote" },
      start: "2022-03",
      end: null,
      summary: {
        es: "Lidero el desarrollo de la plataforma de analítica en tiempo real utilizada por más de 300 empresas.",
        en: "I lead development of the real-time analytics platform used by 300+ companies.",
      },
      achievements: {
        es: [
          "Rediseñé la arquitectura frontend hacia micro-frontends, reduciendo el tiempo de build un 65%.",
          "Implementé un pipeline de eventos con Kafka y WebSockets que procesa 2M de eventos/día.",
          "Mentoricé a 5 desarrolladores junior y definí las guías de código del equipo.",
        ],
        en: [
          "Re-architected the frontend into micro-frontends, cutting build time by 65%.",
          "Built a Kafka + WebSockets event pipeline processing 2M events/day.",
          "Mentored 5 junior developers and defined the team's coding guidelines.",
        ],
      },
      stack: ["React", "TypeScript", "Node.js", "Kafka", "AWS"],
    },
    {
      role: "Full Stack Developer",
      company: "Orbital Fintech",
      url: "https://example.com",
      type: { es: "Tiempo completo", en: "Full-time" },
      location: { es: "Madrid, España", en: "Madrid, Spain" },
      start: "2019-06",
      end: "2022-02",
      summary: {
        es: "Desarrollo de la app de banca digital y los servicios de pagos de la compañía.",
        en: "Built the company's digital banking app and payment services.",
      },
      achievements: {
        es: [
          "Construí el nuevo onboarding digital, aumentando la conversión de registro un 38%.",
          "Migré servicios monolíticos a microservicios en NestJS con 90% de cobertura de tests.",
          "Reduje el tiempo de carga de la app web de 4,2 s a 1,1 s con SSR y optimización de assets.",
        ],
        en: [
          "Built the new digital onboarding, increasing sign-up conversion by 38%.",
          "Migrated monolithic services to NestJS microservices with 90% test coverage.",
          "Cut web app load time from 4.2 s to 1.1 s with SSR and asset optimization.",
        ],
      },
      stack: ["Next.js", "NestJS", "PostgreSQL", "Docker", "GraphQL"],
    },
    {
      role: "Frontend Developer",
      company: "Codecraft Studio",
      url: "https://example.com",
      type: { es: "Tiempo completo", en: "Full-time" },
      location: { es: "Barcelona, España", en: "Barcelona, Spain" },
      start: "2017-09",
      end: "2019-05",
      summary: {
        es: "Agencia digital: desarrollo de sitios y aplicaciones para clientes internacionales.",
        en: "Digital agency: websites and applications for international clients.",
      },
      achievements: {
        es: [
          "Entregué más de 20 proyectos web para clientes de retail, turismo y educación.",
          "Creé una librería de componentes interna que aceleró el desarrollo un 40%.",
        ],
        en: [
          "Delivered 20+ web projects for retail, travel and education clients.",
          "Created an internal component library that sped up development by 40%.",
        ],
      },
      stack: ["React", "Vue.js", "SASS", "WordPress"],
    },
    {
      role: { es: "Desarrollador Web Junior", en: "Junior Web Developer" },
      company: "Freelance",
      url: "",
      type: { es: "Autónomo", en: "Self-employed" },
      location: { es: "Remoto", en: "Remote" },
      start: "2016-01",
      end: "2017-08",
      summary: {
        es: "Primeros proyectos profesionales para pymes y emprendedores locales.",
        en: "First professional projects for small businesses and local entrepreneurs.",
      },
      achievements: {
        es: ["Diseñé y desarrollé webs corporativas y tiendas online para más de 10 clientes."],
        en: ["Designed and built corporate websites and online stores for 10+ clients."],
      },
      stack: ["JavaScript", "PHP", "MySQL"],
    },
  ],

  /* ---------- Proyectos ----------
     image: captura 16:10 (vacío = portada generada). category: filtros. */
  projects: [
    {
      title: "Pulse Analytics",
      description: {
        es: "Plataforma SaaS de analítica de producto en tiempo real con dashboards personalizables, alertas y exportación de informes.",
        en: "Real-time product analytics SaaS with customizable dashboards, alerts and report exports.",
      },
      image: "",
      category: ["SaaS", "Full Stack"],
      tags: ["Next.js", "tRPC", "PostgreSQL", "Redis"],
      metric: { es: "300+ empresas lo usan", en: "Used by 300+ companies" },
      featured: true,
      links: { demo: "https://example.com", code: "https://github.com/" },
    },
    {
      title: "DevFlow CLI",
      description: {
        es: "Herramienta de línea de comandos open source que automatiza flujos de Git, releases semánticas y changelogs.",
        en: "Open source command-line tool that automates Git workflows, semantic releases and changelogs.",
      },
      image: "",
      category: ["Open Source", { es: "Herramientas", en: "Tools" }],
      tags: ["Node.js", "TypeScript", "Commander"],
      metric: { es: "2.1k ★ en GitHub", en: "2.1k ★ on GitHub" },
      featured: true,
      links: { code: "https://github.com/" },
    },
    {
      title: "Shopwave",
      description: {
        es: "E-commerce headless con pagos, inventario en tiempo real y panel de administración. Lighthouse 100 en rendimiento.",
        en: "Headless e-commerce with payments, real-time inventory and an admin panel. Lighthouse 100 performance.",
      },
      image: "",
      category: ["Full Stack", "E-commerce"],
      tags: ["React", "Stripe", "NestJS", "Docker"],
      metric: { es: "+45% de conversión", en: "+45% conversion" },
      featured: false,
      links: { demo: "https://example.com", code: "https://github.com/" },
    },
    {
      title: "Atlas Design System",
      description: {
        es: "Sistema de diseño accesible (WCAG AA) con más de 60 componentes, tokens de diseño y documentación en Storybook.",
        en: "Accessible (WCAG AA) design system with 60+ components, design tokens and Storybook docs.",
      },
      image: "",
      category: ["Frontend", "Open Source"],
      tags: ["React", "Storybook", "CSS Variables"],
      metric: { es: "60+ componentes", en: "60+ components" },
      featured: false,
      links: { demo: "https://example.com", code: "https://github.com/" },
    },
    {
      title: "Lingo AI",
      description: {
        es: "Asistente de traducción contextual con IA para equipos de soporte, integrado con Slack y Zendesk.",
        en: "AI-powered contextual translation assistant for support teams, integrated with Slack and Zendesk.",
      },
      image: "",
      category: [{ es: "IA", en: "AI" }, "SaaS"],
      tags: ["Python", "FastAPI", "LLMs", "React"],
      metric: { es: "12 idiomas", en: "12 languages" },
      featured: false,
      links: { demo: "https://example.com" },
    },
    {
      title: "Infra Blueprints",
      description: {
        es: "Colección de módulos Terraform listos para producción: VPC, EKS, RDS y observabilidad con buenas prácticas.",
        en: "Production-ready Terraform modules: VPC, EKS, RDS and observability following best practices.",
      },
      image: "",
      category: ["Cloud", "Open Source"],
      tags: ["Terraform", "AWS", "Kubernetes"],
      metric: { es: "Usado en 40+ repos", en: "Used in 40+ repos" },
      featured: false,
      links: { code: "https://github.com/" },
    },
  ],

  /* ---------- Formación ---------- */
  education: [
    {
      degree: { es: "Grado en Ingeniería Informática", en: "B.Sc. in Computer Engineering" },
      institution: "Universidad Politécnica de Madrid",
      start: "2012",
      end: "2016",
      description: {
        es: "Especialidad en Ingeniería del Software. Proyecto fin de grado con matrícula de honor.",
        en: "Software Engineering major. Final project awarded with highest honors.",
      },
    },
    {
      degree: { es: "Máster en Cloud Computing", en: "M.Sc. in Cloud Computing" },
      institution: "Universidad Online de Tecnología",
      start: "2020",
      end: "2021",
      description: {
        es: "Arquitecturas distribuidas, contenedores, serverless y seguridad en la nube.",
        en: "Distributed architectures, containers, serverless and cloud security.",
      },
    },
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2023", url: "" },
    { name: "Certified Kubernetes Application Developer", issuer: "The Linux Foundation", date: "2022", url: "" },
    { name: "Professional Scrum Master I", issuer: "Scrum.org", date: "2021", url: "" },
  ],

  /* ---------- Testimonios ---------- */
  testimonials: [
    {
      quote: {
        es: "Alex es de esas personas que elevan el nivel de todo el equipo. Su criterio técnico y su capacidad para explicar decisiones complejas son excepcionales.",
        en: "Alex is one of those people who raise the bar for the whole team. Their technical judgment and ability to explain complex decisions are exceptional.",
      },
      name: "Laura Méndez",
      role: "CTO · Nébula Labs",
    },
    {
      quote: {
        es: "Entregó un producto impecable, antes de plazo y con una comunicación constante. Volveríamos a trabajar juntos sin dudarlo.",
        en: "Delivered a flawless product, ahead of schedule and with constant communication. We'd work together again in a heartbeat.",
      },
      name: "Daniel Ortega",
      role: { es: "Fundador · Shopwave", en: "Founder · Shopwave" },
    },
    {
      quote: {
        es: "Un mentor paciente y generoso. Gracias a sus revisiones de código aprendí más en seis meses que en años por mi cuenta.",
        en: "A patient and generous mentor. Thanks to their code reviews I learned more in six months than in years on my own.",
      },
      name: "Marta Vidal",
      role: "Frontend Developer · Orbital Fintech",
    },
  ],

  /* ---------- Contacto ----------
     formEndpoint: URL de Formspree, Getform, etc. Vacío = abre el cliente de correo. */
  contact: {
    formEndpoint: "",
    subject: { es: "Contacto desde tu portfolio", en: "Contact from your portfolio" },
  },

  /* ---------- Textos de la interfaz ---------- */
  ui: {
    es: {
      langName: "Español",
      langLabel: "Idioma",
      mainNav: "Navegación principal",
      skipLink: "Saltar al contenido",
      follow: "Sígueme",
      phone: "Teléfono",
      location: "Ubicación",
      website: "Web",
      skillsCount: "tecnologías",
      filterProjects: "Filtrar proyectos",
      present: "Actualidad",
      current: "Actual",
      year: "año",
      years: "años",
      month: "mes",
      months: "meses",
      all: "Todos",
      featured: "Destacado",
      demo: "Ver demo",
      code: "Código",
      copy: "Copiar email",
      copied: "Email copiado al portapapeles",
      certifications: "Certificaciones",
      education: "Educación",
      viewCredential: "Ver credencial",
      formName: "Nombre",
      formEmail: "Email",
      formMessage: "Mensaje",
      formNamePh: "Tu nombre",
      formEmailPh: "tu@email.com",
      formMessagePh: "Cuéntame sobre tu proyecto o propuesta…",
      formSend: "Enviar mensaje",
      formSending: "Enviando…",
      formSuccess: "¡Mensaje enviado! Te responderé pronto.",
      formError: "No se pudo enviar. Escríbeme directamente por email.",
      formMailto: "Abriendo tu cliente de correo…",
      formNote: "Sin spam. Tus datos no se comparten.",
      toTop: "Volver arriba",
      menu: "Abrir menú",
      theme: "Cambiar tema",
      customize: "Personalizar",
      customizerTitle: "Personaliza la plantilla",
      customizerAccent: "Color de acento",
      customizerMode: "Modo",
      dark: "Oscuro",
      light: "Claro",
      customizerNote: "Panel de demostración. Desactívalo en data/cv.js → theme.customizer",
      scroll: "Scroll",
      techMarquee: "Tecnologías con las que trabajo",
      footer: "Diseñado y desarrollado con",
      rights: "Todos los derechos reservados.",
      machineReadable: "Versión para IA / ATS",
      // Encabezados estándar del CV en texto (Markdown, JSON y lectores de IA)
      resume: {
        summary: "Resumen profesional",
        experience: "Experiencia profesional",
        skills: "Habilidades técnicas",
        projects: "Proyectos",
        education: "Formación",
        certifications: "Certificaciones",
        languages: "Idiomas",
        references: "Referencias",
        contact: "Contacto",
        stack: "Tecnologías",
        links: "Enlaces",
      },
    },
    en: {
      langName: "English",
      langLabel: "Language",
      mainNav: "Main navigation",
      skipLink: "Skip to content",
      follow: "Follow me",
      phone: "Phone",
      location: "Location",
      website: "Website",
      skillsCount: "technologies",
      filterProjects: "Filter projects",
      present: "Present",
      current: "Current",
      year: "yr",
      years: "yrs",
      month: "mo",
      months: "mos",
      all: "All",
      featured: "Featured",
      demo: "Live demo",
      code: "Code",
      copy: "Copy email",
      copied: "Email copied to clipboard",
      certifications: "Certifications",
      education: "Education",
      viewCredential: "View credential",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formNamePh: "Your name",
      formEmailPh: "you@email.com",
      formMessagePh: "Tell me about your project or offer…",
      formSend: "Send message",
      formSending: "Sending…",
      formSuccess: "Message sent! I'll get back to you soon.",
      formError: "Couldn't send it. Please email me directly.",
      formMailto: "Opening your email client…",
      formNote: "No spam. Your data is never shared.",
      toTop: "Back to top",
      menu: "Open menu",
      theme: "Toggle theme",
      customize: "Customize",
      customizerTitle: "Customize the template",
      customizerAccent: "Accent color",
      customizerMode: "Mode",
      dark: "Dark",
      light: "Light",
      customizerNote: "Demo panel. Disable it in data/cv.js → theme.customizer",
      scroll: "Scroll",
      techMarquee: "Technologies I work with",
      footer: "Designed and built with",
      rights: "All rights reserved.",
      machineReadable: "AI / ATS version",
      resume: {
        summary: "Professional summary",
        experience: "Work experience",
        skills: "Technical skills",
        projects: "Projects",
        education: "Education",
        certifications: "Certifications",
        languages: "Languages",
        references: "References",
        contact: "Contact",
        stack: "Tech stack",
        links: "Links",
      },
    },
  },
};
