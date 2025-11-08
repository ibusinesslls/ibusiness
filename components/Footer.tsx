export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold">iBusiness MCHJ</h4>
          <p className="text-gray-400 mt-2 max-w-sm">
            Raqamli agentlik — web development, dizayn, marketing va AI yechimlar.
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <h5 className="font-semibold mb-2">Xizmatlar</h5>
            <ul className="text-gray-400">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Digital Marketing</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Kontakt</h5>
            <p className="text-gray-400">email@ibusiness.uz</p>
            <p className="text-gray-400">+998 90 123 45 67</p>
            <p className="text-gray-400">Tashkent, Uzbekistan</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} iBusiness MCHJ. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
