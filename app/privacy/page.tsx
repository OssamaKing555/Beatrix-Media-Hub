'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, UserCheck, Cookie, Mail, FileText } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Our Commitment to Privacy",
      content: "At Beatrix Media Hub, we are deeply committed to protecting your privacy. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your personal information. We aim to be transparent about what data we collect and how we use it to provide you with a secure and seamless experience."
    },
    {
      icon: UserCheck,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, company information, and any other information you choose to provide. We also collect technical information automatically, such as your IP address, browser type, and usage data through cookies and similar technologies."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "Your information is used to operate, maintain, and improve our services. This includes personalizing your experience, processing transactions, communicating with you, and providing customer support. We may also use your data for security purposes, to prevent fraud, and to comply with legal obligations."
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service."
    },
    {
      icon: FileText,
      title: "Data Sharing and Disclosure",
      content: "We do not sell your personal data. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis. We may also disclose your information if required by law or in response to valid requests by public authorities."
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@beatrixhub.com. We are happy to address any concerns you may have about your data and our privacy practices."
    }
  ]

  return (
    <div style={{ padding: 40 }}>
      <h1>Privacy Policy</h1>
      <p>This is the privacy policy for Beatrix Media Hub.</p>
      <p>Last updated: {new Date().toISOString()}</p>
    </div>
  );
} 