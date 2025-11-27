"use client";

import Hero from "../components/Hero";
import CompetitorInsights from "../components/CompetitorInsights";
import ServiceDemand from "../components/ServiceDemand";
import QuoteCalculator from "../components/QuoteCalculator";
import AutomationPlanner from "../components/AutomationPlanner";
import ClientPortal from "../components/ClientPortal";
import SignatureWorkflow from "../components/SignatureWorkflow";
import PaymentConfigurator from "../components/PaymentConfigurator";
import SocialPlaybook from "../components/SocialPlaybook";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Hero />
      <CompetitorInsights />
      <ServiceDemand />
      <SocialPlaybook />
      <QuoteCalculator />
      <AutomationPlanner />
      <ClientPortal />
      <SignatureWorkflow />
      <PaymentConfigurator />
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerCard}>
            <div>
              <h3>Prêt à lancer la prochaine campagne IA</h3>
              <p>
                Nos benchmarks nord-américains alimentent un moteur de tarification dynamique,
                100% automatisé du brief à la facturation. Déployable sur Vercel, connecté aux
                écosystèmes Meta, TikTok, HubSpot, Stripe et DocuSign.
              </p>
            </div>
            <div className={styles.footerActions}>
              <a className="button" href="#devis">
                Ouvrir un compte client
              </a>
              <span>Agent IA disponible 24/7 pour préqualifier les leads.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
