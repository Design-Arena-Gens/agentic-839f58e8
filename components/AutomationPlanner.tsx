"use client";

import { useMemo } from "react";
import styles from "./AutomationPlanner.module.css";
import { automationModules } from "../lib/pricing";

const automationStreams = [
  {
    phase: "Acquisition",
    automations: [
      "Scraping signaux d'intention & enrichissement CRM (6sense, Clay)",
      "Publication cross-channel autopilot (Meta, TikTok, LinkedIn)",
      "Variantes créatives générées selon la vélocité des KPI"
    ]
  },
  {
    phase: "Conversion",
    automations: [
      "Qualification intelligente des leads et routage SDR IA",
      "Tests A/B multi-variables orchestrés via scripts IA",
      "Playbooks e-mail/SMS déclenchés par l'intention détectée"
    ]
  },
  {
    phase: "Clôture & rétention",
    automations: [
      "Génération automatique des cahiers des charges & contrats",
      "Signature électronique intégrée et relances automatisées",
      "Facturation, dépôts et suivi des milestones dans le portail client"
    ]
  }
];

export default function AutomationPlanner() {
  const automationScore = useMemo(() => {
    const baseScore = automationModules.reduce((acc, module) => acc + module.surcharge, 0);
    return Math.round(baseScore / (automationModules.length * 5));
  }, []);

  return (
    <section className="container">
      <div className="card">
        <h2 className="section-title">Chaîne d&apos;automatisation</h2>
        <p className="section-subtitle">
          Toutes les interactions — de la demande de devis à la signature et au paiement — sont
          pilotées par des automatisations modulaires. Voici le blueprint opérationnel.
        </p>
        <div className={styles.wrapper}>
          <aside className={styles.score}>
            <div className={styles.scoreCircle}>
              <span>{automationScore}</span>
              <small>Indice<br />d&apos;automatisation</small>
            </div>
            <p>
              +53 workflows sont déjà prêts. Chaque module se connecte aux API de Meta, TikTok,
              HubSpot, Stripe et DocuSign pour garantir un on-boarding ultra rapide & sans friction.
            </p>
            <ul>
              <li>
                <strong>Portail client</strong> Actualisation en temps réel des briefs, SOW et tâches.
              </li>
              <li>
                <strong>Marketing Ops</strong> Synchronisation data vers Snowflake & dashboards BI.
              </li>
              <li>
                <strong>Comptabilité</strong> Génération d&apos;avoirs, dépôts, paiements fractionnés.
              </li>
            </ul>
          </aside>
          <div className={styles.timeline}>
            {automationStreams.map((stream) => (
              <div key={stream.phase} className={styles.stream}>
                <header>
                  <span>{stream.phase}</span>
                </header>
                <ul>
                  {stream.automations.map((automation) => (
                    <li key={automation}>{automation}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
