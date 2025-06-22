import { Navbar } from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function About() {
  const timeline = [
    {
      year: '2022',
      title: 'Founded',
      description: 'BEATRIX MEDIA HUB was established with a vision to revolutionize media production in the MENA region.'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Launched our digital marketing division and expanded our client base across multiple industries.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Incorporated cutting-edge AI technology into our production pipeline for enhanced creativity and efficiency.'
    },
    {
      year: '2025',
      title: 'Vision',
      description: 'Leading the future of media production with innovative solutions and global partnerships.'
    }
  ]

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.'
    },
    {
      title: 'Excellence',
      description: 'Every project we undertake meets the highest standards of quality and creativity.'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster strong partnerships with our clients.'
    },
    {
      title: 'Impact',
      description: 'We create work that makes a difference and drives meaningful results for our clients.'
    }
  ]

  const team = [
    {
      name: 'Sarah Ahmed',
      position: 'Creative Director',
      bio: 'Leading our creative vision with over 10 years of experience in brand development and design.'
    },
    {
      name: 'Mohamed Hassan',
      position: 'Technical Director',
      bio: 'Overseeing all technical aspects of our projects with expertise in development and production.'
    },
    {
      name: 'Layla Mansour',
      position: 'Strategy Director',
      bio: 'Driving our strategic initiatives and ensuring every project aligns with business objectives.'
    },
    {
      name: 'Omar Khalil',
      position: 'Production Manager',
      bio: 'Managing our production pipeline and ensuring smooth delivery of all projects.'
    }
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            About BEATRIX
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We are a forward-thinking creative agency that specializes in digital innovation, 
            brand development, and multimedia production. Founded with a vision to bridge the gap between 
            creativity and technology, we help brands and businesses create meaningful connections with their audiences.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                To be the leading creative force in the MENA region, pushing boundaries and setting new standards in media production and digital marketing.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We envision a future where every brand has the power to tell their story in the most compelling and innovative ways possible.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                To deliver exceptional creative solutions that drive results, build meaningful connections, and inspire audiences across all platforms.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We're committed to excellence, innovation, and creating lasting impact for our clients and their audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300">
              From startup to industry leader.
            </p>
          </div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The creative minds behind every successful project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-white font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{member.position}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something extraordinary together.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
} 