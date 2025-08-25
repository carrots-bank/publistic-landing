import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Получаем данные из формы
    const form = await req.formData();
    const name = (form.get("name") ?? "").toString().trim();
    const email = (form.get("email") ?? "").toString().trim();
    const messenger = (form.get("messenger") ?? "").toString().trim();
    const comment = (form.get("comment") ?? "").toString().trim();

    // honeypot (ловушка для спама)
    const website = (form.get("website") ?? "").toString().trim();
    if (website) {
      // Если поле заполнено — игнорируем (бот)
      return NextResponse.redirect(new URL("/", req.url), { status: 303 });
    }

    // 2. Собираем текст для Telegram
    const text =
      `🆕 Новая заявка на консультацию\n\n` +
      `👤 Имя: ${name}\n` +
      `✉️ Email: ${email}\n` +
      (messenger ? `💬 Messenger: ${messenger}\n` : "") +
      (comment ? `📝 Комментарий: ${comment}\n` : "") +
      `\n— Publistic Landing`;

    // 3. Берём токен и chat_id из переменных окружения
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    // 4. Отправляем сообщение в Telegram
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram error:", body);
      return NextResponse.json({ ok: false, error: "Telegram error" }, { status: 500 });
    }

    // 5. После отправки — редиректим пользователя (чтобы он не видел JSON)
    return NextResponse.redirect(new URL("/", req.url), { status: 303 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
