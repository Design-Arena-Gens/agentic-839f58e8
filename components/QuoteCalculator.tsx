"use client";

import { FormEvent, useMemo, useState } from "react";
import { calculateQuote } from "../lib/quote";
import { automationModules, paymentModels, serviceOptions } from "../lib/pricing";
import styles from "./QuoteCalculator.module.css";

const defaultState = {
  selectedServices: ["social-ai", "ugc-engine"],
  monthlyAdSpend: 35000,
  customerType: "B2C" as const,
  regions: 2,
  automationIds: ["brief-to-ads", "sow-tracker"],
  paymentModelId: "retainer-flex",
  preferredCurrency: "CAD" as const
};

type State = typeof defaultState;

const currencySymbol = {
  CAD: "CAD $",
  USD: "USD $"
};

export default function QuoteCalculator() {
  const [state, setState] = useState<State>(defaultState);
  const [submitted, setSubmitted] = useState(false);

  const quote = useMemo(() => calculateQuote(state), [state]);
  const competitorAverage = useMemo(() => {
    const baseline = state.selectedServices.length * 6100;
    const spendAdjustment = Math.min(1.35, Math.max(0.75, state.monthlyAdSpend / 50000));
    return baseline * spendAdjustment;
  }, [state.selectedServices.length, state.monthlyAdSpend]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const toggleService = (serviceId: string) => {
    setState((prev) => {
      const selected = prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId];
      return { ...prev, selectedServices: selected };
    });
  };

  const toggleAutomation = (automationId: string) => {
    setState((prev) => {
      const automationIds = prev.automationIds.includes(automationId)
        ? prev.automationIds.filter((id) => id !== automationId)
        : [...prev.automationIds, automationId];
      return { ...prev, automationIds };
    });
  };

  return (
    <section id="devis" className="container">
      <div className="card">
        <div className={styles.header}>
          <div>
            <h2 className="section-title">Calculateur de devis IA</h2>
            <p className="section-subtitle">
              Génération instantanée de devis compétitifs avec modulation automatique selon le
              segment client, les régions ciblées et le panier d&apos;automatisation.
            </p>
          </div>
          <div className={styles.comparison}>
            <span>Écart cible vs concurrence</span>
            <strong>
              -{Math.round(((competitorAverage - quote.total) / competitorAverage) * 100)}%
            </strong>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Services IA inclus</legend>
            <div className={styles.services}>
              {serviceOptions.map((option) => {
                const checked = state.selectedServices.includes(option.id);
                return (
                  <label key={option.id} className={`${styles.serviceCard} ${checked ? styles.serviceCardSelected : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(option.id)}
                    />
                    <div>
                      <div className={styles.serviceTitle}>
                        <h3>{option.name}</h3>
                        <span>{option.basePrice.toLocaleString("fr-CA")} $</span>
                      </div>
                      <p>{option.description}</p>
                      <div className={styles.kpis}>
                        {option.kpis.map((kpi) => (
                          <span key={kpi}>{kpi}</span>
                        ))}
                      </div>
                      <small>
                        Plage concurrentielle: {option.minPrice.toLocaleString("fr-CA")} -{" "}
                        {option.maxPrice.toLocaleString("fr-CA")} $ CAD
                      </small>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-2">
            <label>
              Segment client
              <select
                value={state.customerType}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    customerType: event.target.value as State["customerType"]
                  }))
                }
              >
                <option value="B2C">B2C retail / eCommerce</option>
                <option value="B2B">B2B industriel / SaaS</option>
                <option value="Marketplace">Marketplace / Plateformes</option>
              </select>
            </label>
            <label>
              Dépense média mensuelle (CAD)
              <input
                type="number"
                value={state.monthlyAdSpend}
                min={5000}
                step={1000}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    monthlyAdSpend: Number(event.target.value)
                  }))
                }
              />
            </label>
          </div>

          <div className="grid grid-2">
            <label>
              Nombre de régions linguistiques gérées
              <input
                type="number"
                min={1}
                max={5}
                value={state.regions}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    regions: Number(event.target.value)
                  }))
                }
              />
            </label>
            <label>
              Devise préférée
              <select
                value={state.preferredCurrency}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    preferredCurrency: event.target.value as State["preferredCurrency"]
                  }))
                }
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Modules d&apos;automatisation</legend>
            <div className={styles.automationGrid}>
              {automationModules.map((module) => {
                const checked = state.automationIds.includes(module.id);
                return (
                  <label key={module.id} className={`${styles.automationCard} ${checked ? styles.automationCardSelected : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAutomation(module.id)}
                    />
                    <div>
                      <div className={styles.serviceTitle}>
                        <h4>{module.name}</h4>
                        <span>+ {module.surcharge.toLocaleString("fr-CA")} $</span>
                      </div>
                      <p>{module.description}</p>
                      <small>{module.impact}</small>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-2">
            <label>
              Modèle de paiement
              <select
                value={state.paymentModelId}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    paymentModelId: event.target.value
                  }))
                }
              >
                {paymentModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="button">
            Générer le devis automatisé
          </button>
        </form>

        <aside className={styles.output}>
          <div className={styles.pricingCard}>
            <h3>Projection tarifaire</h3>
            <div className={styles.pricingRow}>
              <span>Base services</span>
              <strong>
                {currencySymbol[quote.currency]} {quote.base.toLocaleString("fr-CA", { maximumFractionDigits: 0 })}
              </strong>
            </div>
            <div className={styles.pricingRow}>
              <span>Automatisation</span>
              <strong>
                {currencySymbol[quote.currency]}{" "}
                {quote.automationTotal.toLocaleString("fr-CA", { maximumFractionDigits: 0 })}
              </strong>
            </div>
            <div className={styles.pricingRow}>
              <span>Frais transaction</span>
              <strong>
                {currencySymbol[quote.currency]}{" "}
                {quote.transactionFees.toLocaleString("fr-CA", { maximumFractionDigits: 0 })}
              </strong>
            </div>
            <div className={styles.totalRow}>
              <span>Total mensuel</span>
              <strong>
                {currencySymbol[quote.currency]}{" "}
                {quote.total.toLocaleString("fr-CA", { maximumFractionDigits: 0 })}
              </strong>
            </div>
            <div className={styles.depositRow}>
              <span>Déposit à la signature</span>
              <strong>
                {currencySymbol[quote.currency]}{" "}
                {quote.deposit.toLocaleString("fr-CA", { maximumFractionDigits: 0 })}
              </strong>
            </div>
            <small>
              Benchmark concurrentiel: {currencySymbol[quote.currency]}{" "}
              {competitorAverage.toLocaleString("fr-CA", { maximumFractionDigits: 0 })} (écart{" "}
              {Math.round(((competitorAverage - quote.total) / competitorAverage) * 100)}%)
            </small>
          </div>
          {submitted && (
            <div className={styles.exportCard}>
              <h4>Actions automatisées prêtes</h4>
              <ul>
                <li>
                  <span className="status-dot success" />
                  Devis envoyé au portail client
                </li>
                <li>
                  <span className="status-dot success" />
                  Cahier des charges pré-rempli dans le CRM
                </li>
                <li>
                  <span className="status-dot warning" />
                  Signature électronique en attente
                </li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
