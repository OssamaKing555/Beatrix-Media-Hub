export default function CareersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold mb-4">Careers at Beatrix Media Hub</h1>
        <p className="text-lg text-gray-600 mb-6">We're always looking for creative, passionate people to join our team.</p>
        <div className="inline-block px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold text-lg mb-4">No open positions at the moment</div>
        <p className="text-gray-500">Check back soon or send your CV to <a href="mailto:careers@beatrixhub.com" className="underline text-blue-600">careers@beatrixhub.com</a></p>
      </div>
    </div>
  );
} 