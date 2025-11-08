// components/PortfolioGrid.tsx
import Link from "next/link";

const projects = [
  { slug: "project-1", title: "UltraOil e-commerce", subtitle: "Product design + listing", img: "/projects/p1.jpg" },
  { slug: "project-2", title: "AutoServ Booking", subtitle: "Web app & CRM", img: "/projects/p2.jpg" },
  { slug: "project-3", title: "Brand Refresh", subtitle: "Branding & identity", img: "/projects/p3.jpg" },
];

export default function PortfolioGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Tanlangan ishlanmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="h-44 bg-gray-200 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
