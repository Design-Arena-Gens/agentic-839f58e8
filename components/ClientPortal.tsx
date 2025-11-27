"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { serviceOptions } from "../lib/pricing";
import styles from "./ClientPortal.module.css";

type Account = {
  id: string;
  company: string;
  contact: string;
  email: string;
  services: string[];
  objectives: string;
  budget: number;
  startDate: string;
  status: "Prospect" | "Actif" | "Négociation";
  lastUpdated: string;
};

const defaultAccount: Account = {
  id: "",
  company: "",
  contact: "",
  email: "",
  services: [],
  objectives: "",
  budget: 25000,
  startDate: format(new Date(), "yyyy-MM-dd"),
  status: "Prospect",
  lastUpdated: new Date().toISOString()
};

export default function ClientPortal() {
  const [form, setForm] = useState<Account>(defaultAccount);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("atlas-client-accounts");
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("atlas-client-accounts", JSON.stringify(accounts));
  }, [accounts]);

  const resetForm = () => setForm(defaultAccount);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newAccount: Account = {
      ...form,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString()
    };
    setAccounts((prev) => [newAccount, ...prev]);
    resetForm();
  };

  const toggleService = (serviceId: string) => {
    setForm((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  };

  return (
    <section className="container">
      <div className="card">
        <h2 className="section-title">Portail client & cahier des charges</h2>
        <p className="section-subtitle">
          Chaque client dispose d&apos;un espace sécurisé pour suivre le cahier des charges, signer
          électroniquement et paramétrer les paiements. Le formulaire alimente automatiquement le
          CRM et génère un SOW.
        </p>
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Société
              <input
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                required
              />
            </label>
            <label>
              Contact principal
              <input
                value={form.contact}
                onChange={(event) => setForm((prev) => ({ ...prev, contact: event.target.value }))}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Budget média mensuel (CAD)
              <input
                type="number"
                min={5000}
                step={1000}
                value={form.budget}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, budget: Number(event.target.value) }))
                }
              />
            </label>
            <label>
              Date de déploiement cible
              <input
                type="date"
                value={form.startDate}
                onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
              />
            </label>
            <label>
              Objectifs business
              <textarea
                rows={4}
                value={form.objectives}
                placeholder="Ex: doubler les ventes Shopify au Québec, ouvrir marché Ontario..."
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, objectives: event.target.value }))
                }
              />
            </label>
            <label>
              Statut du compte
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, status: event.target.value as Account["status"] }))
                }
              >
                <option value="Prospect">Prospect</option>
                <option value="Négociation">Négociation</option>
                <option value="Actif">Actif</option>
              </select>
            </label>
            <fieldset>
              <legend>Services retenus</legend>
              <div className={styles.services}>
                {serviceOptions.map((service) => {
                  const selected = form.services.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={`${styles.serviceBadge} ${selected ? styles.serviceSelected : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleService(service.id)}
                      />
                      {service.name}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <button type="submit" className="button">
              Enregistrer le cahier des charges
            </button>
          </form>

          <aside className={styles.accounts}>
            <header>
              <h3>Comptes ouverts ({accounts.length})</h3>
              <span>Synchronisé avec HubSpot & Notion</span>
            </header>
            <div className={styles.accountList}>
              {accounts.length === 0 && <p className="muted">Aucun compte enregistré pour l&apos;instant.</p>}
              {accounts.map((account) => (
                <article key={account.id} className={styles.accountCard}>
                  <div className={styles.accountHeader}>
                    <div>
                      <strong>{account.company}</strong>
                      <span>{account.contact}</span>
                    </div>
                    <span className={`${styles.status} ${styles[account.status.toLowerCase()]}`}>
                      {account.status}
                    </span>
                  </div>
                  <p className={styles.objectives}>{account.objectives || "Objectifs en cours de définition."}</p>
                  <div className={styles.meta}>
                    <span>
                      Budget: {account.budget.toLocaleString("fr-CA")} CAD • Déploiement{" "}
                      {format(new Date(account.startDate), "dd MMM yyyy")}
                    </span>
                    <span>Services: {account.services.length || 0}</span>
                  </div>
                  <footer>
                    <span className="status-dot success" />
                    SOW généré • Dernière mise à jour {format(new Date(account.lastUpdated), "dd MMM yyyy")}
                  </footer>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
