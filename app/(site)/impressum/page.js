import LegalLayout, { Section, TodoBlock } from "@/components/LegalLayout";

export const metadata = {
  title: "Impressum",
  description:
    "Impressum und Angaben gemäß §5 TMG für artgerecht — visuelle Kommunikation · Birgit Silberg.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalLayout
      eyebrow="Rechtliches"
      title="Impressum"
      intro="Angaben gemäß §5 TMG."
    >
      <Section heading="Anbieter">
        <p>
          Birgit Silberg
          <br />
          artgerecht — visuelle Kommunikation
          <br />
          <TodoBlock label="STRASSE & HAUSNUMMER" hint="bitte vor Launch ergänzen" />
          <br />
          <TodoBlock label="PLZ & ORT" hint="bitte vor Launch ergänzen" />
          <br />
          Deutschland
        </p>
      </Section>

      <Section heading="Kontakt">
        <p>
          Telefon:{" "}
          <a
            href="tel:+4906454911981"
            className="text-zinc-900 underline underline-offset-4 hover:text-rose-gold transition-colors"
          >
            06454 911981
          </a>
          <br />
          E-Mail:{" "}
          <a
            href="mailto:email@artgerecht.tv"
            className="text-zinc-900 underline underline-offset-4 hover:text-rose-gold transition-colors"
          >
            email@artgerecht.tv
          </a>
          <br />
          Web:{" "}
          <a
            href="https://www.artgerecht.tv"
            className="text-zinc-900 underline underline-offset-4 hover:text-rose-gold transition-colors"
          >
            www.artgerecht.tv
          </a>
        </p>
      </Section>

      <Section heading="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27a UStG:{" "}
          <TodoBlock label="USt-ID ODER KLEINUNTERNEHMER §19 UStG" hint="bitte vor Launch ergänzen" />
        </p>
      </Section>

      <Section heading="Verantwortlich für den Inhalt nach §55 Abs. 2 RStV">
        <p>
          Birgit Silberg
          <br />
          Anschrift wie oben.
        </p>
      </Section>

      <Section heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-zinc-900 underline underline-offset-4 hover:text-rose-gold transition-colors"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </Section>

      <Section heading="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>

      <Section heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß §7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
          Inhalte umgehend entfernen.
        </p>
      </Section>

      <Section heading="Urheberrecht">
        <p>
          Die durch artgerecht erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </Section>
    </LegalLayout>
  );
}
