"use client";

import { useMemo, useState } from "react";
import styles from "./PaymentConfigurator.module.css";
import { paymentModels } from "../lib/pricing";

const feeProviders = [
  { name: "Stripe (CA)", fee: 0.028, note: "Inclut cartes Interac & international" },
  { name: "Square", fee: 0.029, note: "Remboursements instantanés, plus simple" },
  { name: "GoCardless", fee: 0.015, note: "Prélèvements ACH / PAD" }
];

export default function PaymentConfigurator() {
  const [selectedModel, setSelectedModel] = useState(paymentModels[0]);
  const [provider, setProvider] = useState(feeProviders[0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(45000);

  const estimatedFees = useMemo(() => {
    const base = monthlyRevenue * provider.fee;
    const deposit = monthlyRevenue * selectedModel.depositPct;
    return { base, deposit };
  }, [monthlyRevenue, provider, selectedModel]);

  return (
    <section className="container">
      <div className="card">
        <h2 className="section-title">Paramétrage des paiements</h2>
        <p className="section-subtitle">
          Définissez des modèles de paiement compétitifs alignés avec les standards nord-américains.
          Chaque configuration est synchronisée avec Stripe Billing, QuickBooks et le portail client.
        </p>
        <div className={styles.layout}>
          <div className={styles.selector}>
            <label>
              Revenus mensuels projetés (CAD)
              <input
                type="number"
                min={10000}
                step={5000}
                value={monthlyRevenue}
                onChange={(event) => setMonthlyRevenue(Number(event.target.value))}
              />
            </label>
            <label>
              Modèle de paiement
              <select
                value={selectedModel.id}
                onChange={(event) =>
                  setSelectedModel(
                    paymentModels.find((model) => model.id === event.target.value) || paymentModels[0]
                  )
                }
              >
                {paymentModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fournisseur de paiement
              <select
                value={provider.name}
                onChange={(event) =>
                  setProvider(feeProviders.find((item) => item.name === event.target.value) || feeProviders[0])
                }
              >
                {feeProviders.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.summary}>
            <h3>Projection automatisée</h3>
            <ul>
              <li>
                <span>Déposit à la signature</span>
                <strong>{Math.round(selectedModel.depositPct * 100)}% • {estimatedFees.deposit.toLocaleString("fr-CA")} $</strong>
              </li>
              <li>
                <span>Frais fournisseur</span>
                <strong>{(provider.fee * 100).toFixed(2)}% • {estimatedFees.base.toLocaleString("fr-CA")} $</strong>
              </li>
              <li>
                <span>Jalons automatisés</span>
                <strong>{selectedModel.description}</strong>
              </li>
            </ul>
            <div className={styles.tags}>
              {selectedModel.recommendedFor.map((service) => (
                <span key={service} className="tag">
                  {service}
                </span>
              ))}
            </div>
            <footer>
              <span className="status-dot success" />
              Paiements, factures et relances plug-and-play (Stripe Billing + QuickBooks)
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
