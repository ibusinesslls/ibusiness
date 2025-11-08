import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Kontakt</h1>
      <p className="text-gray-600 mb-6">Biz bilan bog'laning — so'rovingizni qoldiring, tez orada javob beramiz.</p>
      <ContactForm />
    </main>
  );
}
