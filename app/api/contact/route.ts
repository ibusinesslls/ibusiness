// app/api/contact/route.ts
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

// POST /api/contact
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // oddiy server-side validatsiya
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ ok: false, error: "name, email and message are required" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: "Telegram env vars not set" }, { status: 500 });
    }

    const text = `📩 *Yangi lead*\n\n*Ism:* ${escapeMarkdown(body.name)}\n*Email:* ${escapeMarkdown(body.email)}\n*Kompaniya:* ${escapeMarkdown(body.company || "-")}\n*Xabar:*\n${escapeMarkdown(body.message)}`;

    // yuborish (MarkdownV2 yordamida format)
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ ok: false, error: "Telegram API error", details: errText }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}

// Sehrli funksiya: MarkdownV2 uchun maxsus belgilarni escape qiladi
function escapeMarkdown(str: string) {
  // MarkdownV2 maxsus belgilar
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/~/g, "\\~")
    .replace(/`/g, "\\`")
    .replace(/>/g, "\\>")
    .replace(/#/g, "\\#")
    .replace(/\+/g, "\\+")
    .replace(/-/g, "\\-")
    .replace(/=/g, "\\=")
    .replace(/\|/g, "\\|")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\./g, "\\.")
    .replace(/!/g, "\\!");
}
