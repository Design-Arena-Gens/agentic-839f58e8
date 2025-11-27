import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Atlas IA Marketing | Benchmarks & Auto-Quotes",
  description:
    "Plateforme d'étude de marché ciblée pour les services de marketing digital propulsés par l'IA en Amérique du Nord, avec calculateur de devis automatisé et portail client."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
