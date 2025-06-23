import { Navbar } from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProjectCard from '@/components/layout/ProjectCard'
import projectsData from '@/data/projects.json'

export default function Portfolio() {
  // Extract the projects array from the JSON data
  const projects = projectsData.projects || []

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Portfolio & Case Studies</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Discover our portfolio of creative projects, campaigns, and case studies that have made a lasting impact for our clients.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.type}
              description={project.description}
              image="/images/projects/placeholder.jpg"
              client={project.clientName}
              year={new Date(project.startDate).getFullYear().toString()}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
} 