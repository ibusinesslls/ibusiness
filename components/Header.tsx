export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-gray-900">
        <span className="text-blue-600">iBusiness</span> Agency
      </h1>
      <nav className="flex gap-6 text-gray-700 font-medium">
        <a href="/" className="hover:text-blue-600 transition">Home</a>
        <a href="/about" className="hover:text-blue-600 transition">About</a>
        <a href="/services" className="hover:text-blue-600 transition">Services</a>
        <a href="/portfolio" className="hover:text-blue-600 transition">Portfolio</a>
        <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
      </nav>
      <a href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Let's Talk
      </a>
    </header>
  );
}
