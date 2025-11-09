"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export default function ContactForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Ism to‘ldirilishi shart.";
    if (!email.trim()) errors.email = "Email to‘ldirilishi shart.";
    else {
      // oddiy email regex
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) errors.email = "Iltimos haqiqiy email kiriting.";
    }
    if (!message.trim()) errors.message = "Xabar maydoni bo‘sh bo‘la olmaydi.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!validate()) {
      setStatus({ ok: false, text: "Iltimos formani toʻgʻri toʻldiring." });
      return;
    }

    setLoading(true);
    try {
      let token = "";
      if ((window as any).grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        token = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "contact" });
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, recaptchaToken: token }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // reset and redirect
        setName(""); setEmail(""); setCompany(""); setMessage("");
        router.push("/thanks");
        return;
      } else {
        setStatus({ ok: false, text: data?.error || "Xatolik yuz berdi. Iltimos qayta urinib ko‘ring." });
      }
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Tarmoq xatosi" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-4" aria-labelledby="contact-heading" noValidate>
      <h2 id="contact-heading" className="sr-only">Kontakt</h2>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Ism <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={`mt-1 block w-full p-3 border rounded ${fieldErrors.name ? "border-red-400" : ""}`}
        />
        {fieldErrors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className={`mt-1 block w-full p-3 border rounded ${fieldErrors.email ? "border-red-400" : ""}`}
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Kompaniya (ixtiyoriy)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-1 block w-full p-3 border rounded"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Xabar <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`mt-1 block w-full p-3 border rounded ${fieldErrors.message ? "border-red-400" : ""}`}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-60"
        >
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>

        <button
          type="button"
          onClick={() => { setName(""); setEmail(""); setCompany(""); setMessage(""); setFieldErrors({}); setStatus(null); }}
          className="px-4 py-2 border rounded"
        >
          Tozalash
        </button>
      </div>

      {/* Status banner */}
      {status && (
        <div role="status" className={`p-3 rounded ${status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status.text}
        </div>
      )}

      <p className="text-xs text-gray-500">Shaxsiy ma'lumotlaringiz maxfiy saqlanadi. <a href="/privacy" className="text-blue-600">Privacy policy</a>.</p>
    </form>
  );
}


