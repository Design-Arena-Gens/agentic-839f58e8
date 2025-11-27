"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className="container">
        <div className={styles.heroCard}>
          <span className="badge">Intelligence concurrentielle Québec & Amérique du Nord</span>
          <h1>
            Atlas IA Marketing<span className={styles.accent}>.</span>
          </h1>
          <p>
            Nous consolidons les signaux de marché nord-américains pour offrir un portefeuille de
            services IA ultra-demandés, un calculateur de devis instantané et un portail client
            entièrement automatisé — optimisé pour des campagnes sociales haute performance.
          </p>
          <div className={styles.metrics}>
            <div>
              <strong>+27%</strong>
              <span>ROAS moyen par rapport aux benchmarks QC</span>
            </div>
            <div>
              <strong>4.5 semaines</strong>
              <span>Cycle d&apos;acquisition client compressé</span>
            </div>
            <div>
              <strong>72 flux</strong>
              <span>Tâches automatisées du brief à la facturation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
