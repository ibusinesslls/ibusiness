// app/portfolio/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";

const data = {
  "project-1": {
    title: "UltraOil e-commerce",
    description: "Mahsulot catalog, photography, listing optimization va SEO.",
    images: ["/projects/p1.jpg","/projects/p1-2.jpg"]
  },
  "project-2": { title: "AutoServ Booking", description: "Booking platform for garages.", images: ["/projects/p2.jpg"] },
  "project-3": { title: "Brand Refresh", description: "Brand identity and guidelines.", images: ["/projects/p3.jpg"] },
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = data[params.slug];
  if (!project) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/portfolio" className="text-sm text-blue-600 mb-4 inline-block">← Orqaga</Link>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.images.map((src)=>(
          <div key={src} className="rounded overflow-hidden bg-gray-100">
            <img src={src} alt={project.title} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
