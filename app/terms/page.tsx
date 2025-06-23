'use client'

import { motion } from 'framer-motion'
import { FileText, User, Shield, AlertTriangle, MessageSquare, Landmark } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Beatrix Media Hub platform and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services."
    },
    {
      icon: User,
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. We reserve the right to refuse service, terminate accounts, or remove or edit content in our sole discretion."
    },
    {
      icon: Shield,
      title: "3. Content Ownership and Intellectual Property",
      content: "You retain ownership of all content you submit to the platform. By submitting content, you grant Beatrix Media Hub a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the service. We own all rights to our platform and services, including all associated intellectual property."
    },
    {
      icon: AlertTriangle,
      title: "4. Prohibited Conduct",
      content: "You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system to access the service; (iii) transmitting spam or other unsolicited email; (iv) attempting to interfere with the system integrity or security."
    },
    {
      icon: MessageSquare,
      title: "5. Disclaimers and Limitation of Liability",
      content: "The service is provided on an 'as is' and 'as available' basis. Beatrix Media Hub does not warrant that the service will be uninterrupted, secure, or error-free. In no event shall Beatrix Media Hub be liable for any indirect, incidental, special, consequential or punitive damages."
    },
    {
      icon: Landmark,
      title: "6. Governing Law",
      content: "These Terms shall be governed by the laws of the Arab Republic of Egypt, without respect to its conflict of laws principles. Any claim or dispute between you and Beatrix Media Hub that arises in whole or in part from the service shall be decided exclusively by a court of competent jurisdiction located in Cairo, Egypt."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Please read these terms carefully before using our platform.
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  <p className="mt-2 text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 