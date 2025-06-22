import Link from 'next/link'
import siteConfig from '@/data/siteConfig.json'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BEATRIX MEDIA HUB</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              We are a forward-thinking creative agency that specializes in digital innovation, 
              brand development, and multimedia production. We help brands create meaningful 
              connections with their audiences through cutting-edge technology and exceptional design.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
              <p>{siteConfig.contact.address}</p>
              <p className="text-sm">Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BEATRIX MEDIA HUB. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 