export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4">Welcome to Alikeb Rent Tracker</h1>
      <p className="text-gray-700 text-lg max-w-xl mb-8">
        A fast, modern, and user-friendly platform for landlords and tenants to track, view, and manage rent payments in real time.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/login?role=landlord" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg shadow transition duration-300">
          Landlord Login
        </a>
        <a href="/login?role=tenant" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow transition duration-300">
          Tenant Login
        </a>
      </div>
    </div>
  );
}
