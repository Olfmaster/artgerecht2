// Smoke-test the contact-action server function in isolation.
// Verifies: (a) validation, (b) email format check, (c) length cap,
// (d) the no-API-key fallback path that just console.logs.
import { sendContactMessage } from "../lib/contact-action.js";

function fd(obj) {
  const f = new FormData();
  for (const [k, v] of Object.entries(obj)) f.set(k, v);
  return f;
}

const cases = [
  {
    name: "missing required fields → error",
    input: fd({ name: "", email: "", message: "" }),
    expect: (r) => r.status === "error" && /Name, E-Mail/.test(r.message),
  },
  {
    name: "bad email → error",
    input: fd({ name: "Anna", email: "not-an-email", message: "Hallo" }),
    expect: (r) => r.status === "error" && /E-Mail/.test(r.message),
  },
  {
    name: "message too long → error",
    input: fd({ name: "A", email: "a@b.co", message: "x".repeat(5001) }),
    expect: (r) => r.status === "error" && /5000/.test(r.message),
  },
  {
    name: "valid input without RESEND_API_KEY → success (fallback)",
    input: fd({
      name: "Birgit Test",
      email: "test@example.com",
      phone: "0123",
      message: "Hallo, ich möchte gestalten lassen.",
    }),
    expect: (r) => r.status === "success",
  },
];

let pass = 0;
for (const c of cases) {
  const res = await sendContactMessage({}, c.input);
  const ok = c.expect(res);
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}  →  ${JSON.stringify(res)}`);
  if (ok) pass++;
}
console.log(`\n${pass}/${cases.length} passed`);
process.exit(pass === cases.length ? 0 : 1);
