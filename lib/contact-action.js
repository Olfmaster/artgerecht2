"use server";

const FIELDS = ["name", "email", "phone", "message"];

export async function sendContactMessage(_prevState, formData) {
  const data = Object.fromEntries(
    FIELDS.map((key) => {
      const raw = formData.get(key);
      return [key, typeof raw === "string" ? raw.trim() : ""];
    })
  );

  if (!data.name || !data.email || !data.message) {
    return {
      status: "error",
      message: "Bitte füllen Sie Name, E-Mail und Nachricht aus.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return {
      status: "error",
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    };
  }

  if (data.message.length > 5000) {
    return {
      status: "error",
      message: "Bitte kürzen Sie Ihre Nachricht auf maximal 5000 Zeichen.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? "email@artgerecht.tv";
  const from = process.env.CONTACT_FROM ?? "artgerecht Website <onboarding@resend.dev>";

  const subject = `Neue Anfrage von ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    "",
    "Nachricht:",
    data.message,
  ].join("\n");

  if (!apiKey) {
    console.warn(
      "[contact-action] RESEND_API_KEY ist nicht gesetzt — Nachricht nur geloggt."
    );
    console.log({ to, from, subject, text });
    return {
      status: "success",
      message: "Vielen Dank! Ihre Nachricht ist eingegangen.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[contact-action] Resend-Fehler:", res.status, body);
      return {
        status: "error",
        message:
          "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an email@artgerecht.tv.",
      };
    }
  } catch (err) {
    console.error("[contact-action] Netzwerkfehler:", err);
    return {
      status: "error",
      message:
        "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an email@artgerecht.tv.",
    };
  }

  return {
    status: "success",
    message: "Vielen Dank! Ihre Nachricht ist angekommen — Birgit meldet sich zeitnah.",
  };
}
