import { Navbar } from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceCard from '@/components/layout/ServiceCard'
import servicesData from '@/data/services.json'

export default function Services() {
  // Extract the services array from the JSON data
  const services = servicesData.services || []

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We offer a full suite of creative, production, and marketing services to help your brand stand out.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
} 