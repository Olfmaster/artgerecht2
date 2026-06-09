import LegalLayout, { Section, TodoBlock } from "@/components/LegalLayout";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung gemäß DSGVO für artgerecht — visuelle Kommunikation · Birgit Silberg.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Erklärung informiert Sie gemäß Art. 13 DSGVO über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten beim Besuch dieser Website."
    >
      <Section heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:
        </p>
        <p>
          Birgit Silberg
          <br />
          artgerecht — visuelle Kommunikation
          <br />
          <TodoBlock label="ANSCHRIFT" hint="bitte vor Launch ergänzen" />
          <br />
          E-Mail:{" "}
          <a
            href="mailto:email@artgerecht.tv"
            className="text-zinc-900 underline underline-offset-4 hover:text-rose-gold transition-colors"
          >
            email@artgerecht.tv
          </a>
          <br />
          Telefon: 06454 911981
        </p>
      </Section>

      <Section heading="2. Erhebung von Zugriffsdaten (Server-Logfiles)">
        <p>
          Beim Aufruf dieser Website werden durch unseren Hosting-Anbieter
          technische Zugriffsdaten in sogenannten Server-Logfiles
          gespeichert. Dazu gehören: IP-Adresse (gekürzt), Datum und Uhrzeit
          der Anfrage, aufgerufene Seite, übertragene Datenmenge, User-Agent.
          Diese Daten sind technisch erforderlich, um die Website auszuliefern
          und die Stabilität sowie Sicherheit zu gewährleisten (Rechtsgrundlage
          Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse).
        </p>
        <p>
          Hosting erfolgt über{" "}
          <TodoBlock label="HOSTING-PROVIDER" hint="z. B. Vercel — bitte ergänzen" />
          . Mit dem Anbieter besteht ein Auftragsverarbeitungsvertrag
          (Art. 28 DSGVO).
        </p>
      </Section>

      <Section heading="3. Kontaktformular">
        <p>
          Wenn Sie uns über das Kontaktformular auf dieser Website eine
          Nachricht senden, verarbeiten wir die von Ihnen mitgeteilten Daten
          (Name, E-Mail-Adresse, optionale Telefonnummer, Inhalt der
          Nachricht) ausschließlich zur Beantwortung Ihrer Anfrage. Die
          Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung
          (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Durchführung
          vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          Zum technischen Versand der eingegangenen Nachricht an unsere
          E-Mail-Adresse nutzen wir den Dienst{" "}
          <strong>Resend</strong> (Resend, Inc., 2261 Market Street #4818, San
          Francisco, CA 94114, USA). Mit Resend besteht ein
          Auftragsverarbeitungsvertrag. Eine Übermittlung in die USA kann
          stattfinden; sie ist durch Standardvertragsklauseln bzw. das
          EU-US Data Privacy Framework abgesichert.
        </p>
        <p>
          Ihre Anfrage und die zugehörigen Daten löschen wir, sobald die
          Bearbeitung abgeschlossen ist und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </Section>

      <Section heading="4. Cookies & Tracking">
        <p>
          Diese Website verwendet <strong>keine</strong> Tracking-Cookies und{" "}
          <strong>kein</strong> Webanalyse-Tool wie Google Analytics. Es werden
          ausschließlich technisch notwendige Daten verarbeitet, die für die
          Bereitstellung der Seite erforderlich sind.
        </p>
      </Section>

      <Section heading="5. Schriften und externe Inhalte">
        <p>
          Schriftarten (Geist) werden über{" "}
          <code className="bg-zinc-100 rounded px-1 py-0.5 text-sm">next/font</code>{" "}
          lokal vom eigenen Server ausgeliefert. Es findet keine Verbindung zu
          Google-Servern statt.
        </p>
      </Section>

      <Section heading="6. Ihre Rechte">
        <p>Ihnen stehen folgende Rechte zu:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Wenden Sie sich zur Ausübung dieser Rechte formlos an die oben
          genannte E-Mail-Adresse.
        </p>
      </Section>

      <Section heading="7. Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
          beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts
          oder des Orts der mutmaßlichen Verletzung (Art. 77 DSGVO).
        </p>
      </Section>

      <Section heading="8. Aktualität">
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und wurde zuletzt
          aktualisiert im Mai 2026.
        </p>
      </Section>
    </LegalLayout>
  );
}
