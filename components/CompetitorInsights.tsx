"use client";

import { macroSignals, competitors } from "../lib/competitors";
import styles from "./CompetitorInsights.module.css";

const automationScoreColor = (score: number) => {
  if (score >= 0.8) return "success";
  if (score >= 0.65) return "warning";
  return "";
};

export default function CompetitorInsights() {
  return (
    <section className="container">
      <div className="card">
        <div className={styles.header}>
          <div>
            <h2 className="section-title">Panorama concurrentiel</h2>
            <p className="section-subtitle">
              Benchmarks des agences IA marketing en Amérique du Nord (focus Québec) pour calibrer
              l&apos;offre et les positionnements prix.
            </p>
          </div>
          <div className={styles.summary}>
            <div>
              <span className="muted">Indice d&apos;automatisation moyen</span>
              <strong>{Math.round(macroSignals.avgAutomationIndex * 100)}%</strong>
            </div>
            <div>
              <span className="muted">Lead time d&apos;acquisition</span>
              <strong>{macroSignals.procurementTimelineWeeks} semaines</strong>
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Agence</th>
                <th>Hub</th>
                <th>Focales</th>
                <th>Stack IA</th>
                <th>Retainer moyen</th>
                <th>Automatisation</th>
                <th>Différenciateurs</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor) => (
                <tr key={competitor.name}>
                  <td>
                    <strong>{competitor.name}</strong>
                    <div className="muted">{competitor.contractTerm}</div>
                  </td>
                  <td>{competitor.hq}</td>
                  <td>
                    <div className={styles.tagList}>
                      {competitor.focus.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.stackList}>
                      {competitor.aiStack.map((stack) => (
                        <span key={stack}>{stack}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <strong>{competitor.averageRetainer.toLocaleString("fr-CA")} $ CAD</strong>
                    <div className="muted">
                      Mise à jour: {competitor.implementationFee.toLocaleString("fr-CA")} $ setup
                    </div>
                  </td>
                  <td>
                    <span className={`status-dot ${automationScoreColor(competitor.automationCoverage)}`} />
                    {Math.round(competitor.automationCoverage * 100)}%
                  </td>
                  <td>
                    <ul className={styles.diffList}>
                      {competitor.differentiators.map((diff) => (
                        <li key={diff}>{diff}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.insightRow}>
          {macroSignals.spendingShift.map((shift) => (
            <div key={shift.segment} className={styles.insightCard}>
              <span className={styles.segment}>{shift.segment}</span>
              <strong>{Math.round(shift.shift * 100)}% croissance budget</strong>
              <p>{shift.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
