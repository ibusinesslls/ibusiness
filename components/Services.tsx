export default function Services() {
  const items = [
    { title: "Web Development", desc: "Tez, SEO-optimallashtirilgan saytlar (Next.js, React).", icon: "🌐" },
    { title: "UI/UX Design", desc: "Foydalanuvchi markazida dizayn — konversiya uchun optimallashtirilgan.", icon: "🎨" },
    { title: "Digital Marketing", desc: "Strategiya, ads, SEO va content marketing bilan o‘sish.", icon: "📈" },
    { title: "AI Solutions", desc: "Botlar, image-generation va avtomatlashtirish yechimlari.", icon: "🤖" },
    { title: "Branding", desc: "Logotip, vizual identitet va brend qo‘llanma.", icon: "🛠️" },
    { title: "Support & Maintenance", desc: "Monitoring, backup va yangilanishlar — tinch uyqu uchun.", icon: "🛡️" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Bizning xizmatlar</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          iBusiness MCHJ kompleks raqamli xizmatlar taklif etadi — web, dizayn, marketing va AI yechimlar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it) => (
            <div key={it.title} className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="text-4xl mb-4">{it.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
