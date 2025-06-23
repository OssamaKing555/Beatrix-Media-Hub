export const siteConfig = {
  site: {
    name: "BEATRIX MEDIA HUB",
    tagline: "We Don't Follow Trends – We Create Them.",
    description: "A leading media and advertising company specializing in creative content production, digital marketing, and brand activation campaigns.",
    url: "https://beatrixhub.com",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    language: "en",
    rtl: false,
    timezone: "Africa/Cairo"
  },
  contact: {
    email: "hello@beatrixhub.com",
    phone: "+20 2 1234 5678",
    address: "Cairo, Egypt",
    social: {
      facebook: "https://facebook.com/beatrixhub",
      twitter: "https://twitter.com/beatrixhub",
      instagram: "https://instagram.com/beatrixhub",
      linkedin: "https://linkedin.com/company/beatrixhub",
      youtube: "https://youtube.com/beatrixhub"
    }
  },
  navigation: {
    main: [
      {
        title: "About",
        href: "/about",
        description: "Our story, mission, and team"
      },
      {
        title: "Services",
        href: "/services",
        description: "What we offer",
        children: [
          {
            title: "Design Services",
            href: "/services#design",
            description: "Brand identity and graphic design"
          },
          {
            title: "Production Services",
            href: "/services#production",
            description: "Video and event production"
          },
          {
            title: "Advertising",
            href: "/services#advertising",
            description: "Digital advertising campaigns"
          },
          {
            title: "AI Tools",
            href: "/services#ai-tools",
            description: "AI-powered content creation"
          },
          {
            title: "Consulting",
            href: "/services#consulting",
            description: "Business strategy and consulting"
          }
        ]
      },
      {
        title: "Portfolio",
        href: "/portfolio",
        description: "Our work and case studies"
      },
      {
        title: "Consulting",
        href: "/consulting",
        description: "Book expert consultations"
      },
      {
        title: "Platforms",
        href: "/platforms",
        description: "Access internal platforms",
        auth: true
      }
    ],
    footer: [
      {
        title: "Company",
        links: [
          { title: "About", href: "/about" },
          { title: "Careers", href: "/careers" },
          { title: "Contact", href: "/contact" },
          { title: "Blog", href: "/blog" }
        ]
      },
      {
        title: "Services",
        links: [
          { title: "Design", href: "/services#design" },
          { title: "Production", href: "/services#production" },
          { title: "Advertising", href: "/services#advertising" },
          { title: "AI Tools", href: "/services#ai-tools" },
          { title: "Consulting", href: "/services#consulting" }
        ]
      },
      {
        title: "Platforms",
        links: [
          { title: "Freelancers", href: "/platforms/freelancers" },
          { title: "Clients", href: "/platforms/clients" },
          { title: "Startups", href: "/platforms/startups" },
          { title: "Partners", href: "/become-a-partner" }
        ]
      },
      {
        title: "Legal",
        links: [
          { title: "Terms", href: "/terms" },
          { title: "Privacy", href: "/privacy" },
          { title: "Cookies", href: "/cookies" }
        ]
      }
    ]
  },
  features: {
    auth: {
      enabled: true,
      providers: ["email"],
      requireEmailVerification: true
    },
    platforms: {
      enabled: true,
      roles: [
        "super_admin",
        "supervisor",
        "freelancer",
        "client",
        "producer",
        "distributor",
        "startup",
        "expert"
      ]
    },
    marketplace: {
      enabled: true,
      categories: [
        "templates",
        "assets",
        "mockups",
        "luts",
        "files"
      ]
    },
    consulting: {
      enabled: true,
      booking: true,
      calendar: true
    },
    fileUpload: {
      enabled: true,
      maxSize: "100MB",
      allowedTypes: ["image", "video", "document", "archive"]
    },
    messaging: {
      enabled: true,
      realTime: true
    }
  },
  ui: {
    theme: {
      primary: "#8b5cf6",
      secondary: "#64748b",
      accent: "#f59e0b",
      background: "#0f172a",
      foreground: "#f8fafc"
    },
    animations: {
      enabled: true,
      prefersReducedMotion: true
    },
    customCursor: {
      enabled: false,
      shape: "default"
    }
  },
  admin: {
    dashboard: {
      enabled: true,
      analytics: true,
      userManagement: true,
      contentEditor: true
    },
    visualEditor: {
      enabled: true,
      dragAndDrop: true,
      livePreview: true
    }
  },
  seo: {
    defaultTitle: "BEATRIX MEDIA HUB - We Don't Follow Trends – We Create Them.",
    description: "A leading media and advertising company specializing in creative content production, digital marketing, and brand activation campaigns.",
    keywords: ["media", "advertising", "content production", "digital marketing", "brand activation", "creative agency"],
    author: "BEATRIX MEDIA HUB",
    defaultImage: "/og-image.jpg",
    twitterHandle: "@beatrixhub",
    facebookAppId: "123456789"
  }
} as const; 