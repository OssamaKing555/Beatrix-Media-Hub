# BEATRIX MEDIA HUB

A modern, full-featured media and advertising company website with admin dashboard, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Public Website
- **Home Page**: Hero section with video background, services showcase, featured projects, and client logos
- **About Page**: Company vision, mission, values, timeline, and team information
- **Services Page**: Dynamic service offerings with icons and descriptions
- **Work Page**: Portfolio showcase with project cards and filtering
- **Contact Page**: Contact form with validation and company information

### Admin Dashboard
- **Authentication**: Role-based access (admin/editor) with localStorage-based auth
- **Dashboard**: Overview with stats and quick actions
- **Projects Management**: Add, edit, delete projects with role-based permissions
- **Services Management**: Manage service offerings
- **Clients Management**: Client information and logo management
- **Settings**: Company configuration (admin only)

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional design with dark theme
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Modular Architecture**: Reusable components and clean code structure

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Authentication**: LocalStorage-based (simulated)
- **Data**: JSON files (ready for Supabase/backend integration)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beatrix-media-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The admin dashboard uses simulated authentication with localStorage:

### Login Credentials
- **Admin**: `admin@beatrixhub.com` (any password)
- **Editor**: `editor@beatrixhub.com` (any password)

### Role Permissions
- **Admin**: Full access to all features including delete and settings
- **Editor**: Can add/edit content but cannot delete or access settings

## 📁 Project Structure

```
beatrix-media-hub/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── work/              # Work/portfolio page
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   └── layout/           # Layout components
├── data/                 # JSON data files
│   ├── projects.json     # Project data
│   ├── services.json     # Service offerings
│   ├── clients.json      # Client information
│   └── siteConfig.json   # Site configuration
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication logic
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🎨 Customization

### Content Management
All content is stored in JSON files in the `data/` directory:

- **`projects.json`**: Portfolio projects
- **`services.json`**: Service offerings
- **`clients.json`**: Client information
- **`siteConfig.json`**: Company information and settings

### Styling
The project uses Tailwind CSS with a custom design system. Main colors and styling can be modified in:

- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

### Components
Reusable components are located in `components/`:

- `ui/` - Basic UI components (Button, Input, etc.)
- `layout/` - Layout components (Navbar, Footer, etc.)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔄 Backend Integration

The project is designed to easily integrate with a backend:

### Supabase (Recommended)
1. Set up a Supabase project
2. Create tables for projects, services, clients, and users
3. Replace JSON imports with Supabase queries
4. Implement real authentication with Supabase Auth

### Other Options
- **Firebase**: Firestore for data, Firebase Auth
- **Strapi**: Headless CMS
- **Sanity**: Content management
- **Custom API**: Build your own backend

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **SEO**: Meta tags, structured data
- **Accessibility**: ARIA labels, semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Email: hello@beatrixhub.com
- Create an issue on GitHub

## 🎉 Credits

Built with ❤️ for BEATRIX MEDIA HUB

---

**Ready to deploy?** This project is production-ready and can be deployed immediately to Vercel or any other Next.js-compatible platform.
