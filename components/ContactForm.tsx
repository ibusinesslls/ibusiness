"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text?: string }>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ ok: true, text: "Xabaringiz yuborildi! Tez orada bog'lanamiz." });
        setName(""); setEmail(""); setCompany(""); setMessage("");
      } else {
        setStatus({ ok: false, text: data?.error || "Xatolik yuz berdi" });
      }
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Tarmoqli xatolik" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-4">
      <input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ism" className="w-full p-3 border rounded"/>
      <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-3 border rounded"/>
      <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Kompaniya (ixtiyoriy)" className="w-full p-3 border rounded"/>
      <textarea required value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} placeholder="Xabar" className="w-full p-3 border rounded"></textarea>

      <div className="flex gap-3">
        <button disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded">
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
        <button type="button" onClick={()=>{ setName(""); setEmail(""); setCompany(""); setMessage(""); setStatus(null); }} className="px-4 py-2 border rounded">
          Tozalash
        </button>
      </div>

      {status && (
        <div className={`p-3 rounded ${status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status.text}
        </div>
      )}
    </form>
  );
}
