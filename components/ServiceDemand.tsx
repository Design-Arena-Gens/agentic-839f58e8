"use client";

import { topDemandedServices } from "../lib/competitors";
import styles from "./ServiceDemand.module.css";

export default function ServiceDemand() {
  return (
    <section className="container">
      <div className="card">
        <h2 className="section-title">Services IA les plus sollicités</h2>
        <p className="section-subtitle">
          Synthèse des offres gagnantes observées chez la concurrence en Amérique du Nord. Ces
          services alimentent notre portefeuille prioritaire pour capter la demande.
        </p>
        <div className={styles.grid}>
          {topDemandedServices.map((item) => (
            <article key={item.service} className={styles.card}>
              <header>
                <h3>{item.service}</h3>
                <span className={styles.metric}>
                  Adoption: {Math.round(item.adoptionRate * 100)}%
                </span>
              </header>
              <p>{item.tooling.join(" • ")}</p>
              <footer>
                <div className={styles.growth}>
                  <span>Croissance YoY</span>
                  <strong>{Math.round(item.growthYoY * 100)}%</strong>
                </div>
                <div className={styles.socialFit}>
                  <span>Impact social media</span>
                  <strong>Top 3</strong>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
