"use client";

import styles from "./SocialPlaybook.module.css";

const playbook = [
  {
    platform: "Meta (Facebook & Instagram)",
    strategy: "Advantage+ Shopping + IA créative",
    notes: [
      "Créas générées par IA testées via cluster multi-angles (FR/EN)",
      "Audiences lookalike basées sur les meilleures conversions QC/ON",
      "Pilotage budget dynamique selon signaux de rentabilité journalière"
    ],
    cadence: "Daily smart budget (IA) + live ops créatifs 3x/semaine"
  },
  {
    platform: "TikTok Ads",
    strategy: "Spark Ads + UGC IA",
    notes: [
      "Diffusion micro-influenceurs locaux + clones IA validés",
      "Scripts auto-adaptés selon la météo & tendances culturelles",
      "KPIs suivis: Hook Rate, Watch Time, CPA incrémental"
    ],
    cadence: "Rotation créative tous les 4 jours, reciblage 2x/semaine"
  },
  {
    platform: "LinkedIn Ads",
    strategy: "ABM B2B alimenté par signaux d'intention",
    notes: [
      "Synchronisation événements HubSpot / Salesforce en temps réel",
      "Content AI: carrousels, docs interactifs, webinars automatisés",
      "Optimisation IA sur engagement DM + conversions multi-touch"
    ],
    cadence: "Pipelines ABM 14 jours, nurture sequences automatisées"
  }
];

export default function SocialPlaybook() {
  return (
    <section className="container">
      <div className="card">
        <h2 className="section-title">Playbook social media</h2>
        <p className="section-subtitle">
          Chaque offre est conçue pour performer en acquisition payante sur les réseaux sociaux —
          priorité Meta, TikTok et LinkedIn — avec orchestrations IA pour la création et
          l&apos;optimisation continue.
        </p>
        <div className={styles.grid}>
          {playbook.map((item) => (
            <article key={item.platform} className={styles.card}>
              <header>
                <span className="tag">{item.platform}</span>
                <h3>{item.strategy}</h3>
              </header>
              <ul>
                {item.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <footer>
                <span>Cadence</span>
                <strong>{item.cadence}</strong>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
