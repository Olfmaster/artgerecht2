# artgerecht.tv

Website für **artgerecht — visuelle Kommunikation** (Birgit Silberg), gebaut mit
Next.js 16 (App Router), React 19, Tailwind v4 und GSAP. Die Referenzen werden über
ein eingebettetes [Sanity](https://www.sanity.io) Studio unter `/studio` gepflegt.

## Getting Started

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000). Die Seiteninhalte liegen unter
`app/(site)/`, das CMS-Studio unter `app/studio/`.

## Environment Variables

Lege lokal eine `.env.local` an (Vorlage: `.env.example`). Dieselben Variablen müssen
auch beim Hosting-Provider (z. B. Vercel → Project → Settings → Environment Variables)
für **Production** _und_ **Preview** gesetzt werden:

| Variable | Pflicht | Beschreibung |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **ja** | Sanity Project ID (`dr14du9l`). Ohne diese schlägt der Build fehl, weil die `/studio`-Route die Config beim Build auswertet. |
| `NEXT_PUBLIC_SANITY_DATASET` | **ja** | Dataset-Name, i. d. R. `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | nein | API-Datum, Default `2024-10-01`. |
| `RESEND_API_KEY` | empfohlen | API-Key für das Kontaktformular ([Resend](https://resend.com)). Ohne Key läuft das Formular im Dev-Modus (nur Server-Log). |
| `CONTACT_EMAIL` | nein | Zieladresse des Formulars. Default `email@artgerecht.tv`. |
| `CONTACT_FROM` | nein | Absender (muss ein in Resend verifizierter Sender sein). |

> Die `NEXT_PUBLIC_*`-Variablen landen im Client-Bundle (das eingebettete Studio
> braucht sie im Browser) — das ist bei Sanity Project ID / Dataset so vorgesehen
> und unkritisch. Geheim bleiben muss nur `RESEND_API_KEY` (kein `NEXT_PUBLIC_`-Prefix).

## Inhalte pflegen (Sanity Studio)

Birgit verwaltet die Referenzen unter `/studio`:

1. Einmalig: Domain für den Login freigeben (CORS):
   ```bash
   npx sanity login
   npx sanity cors add http://localhost:3000 --credentials
   npx sanity cors add https://www.artgerecht.tv --credentials
   ```
2. `/studio` öffnen, einloggen → **Referenzen** → Bild, Titel, Beschreibung erfassen,
   per Drag-&-Drop sortieren, **Publish**.

Solange keine Referenz veröffentlicht ist, zeigt die Startseite die Monogramm-Platzhalter.
Die Startseite cached die Referenzen 60 Sekunden (Revalidate), neue Inhalte erscheinen
also kurz nach dem Publish.

## Deploy on Vercel

Repo mit Vercel verbinden, die Environment Variables oben setzen, deployen. Nach dem
Setzen der Live-Domain die CORS-Origin (siehe oben) auf die echte Domain prüfen.
Details: [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
