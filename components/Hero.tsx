export default function Hero() {
  return (
    <section className="text-center py-28 bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
        Biz raqamli dunyoda <span className="text-blue-600">brendingizni o‘stiramiz</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        iBusiness MCHJ — marketing, web va AI yechimlar ishlab chiqadigan agentlik.  
        Brendlar uchun o‘sish strategiyasi va texnologiyani uyg‘unlashtiramiz.
      </p>
      <a
        href="/contact"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Bepul konsultatsiya
      </a>
    </section>
  );
}
