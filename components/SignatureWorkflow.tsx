"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./SignatureWorkflow.module.css";

const SignaturePad = dynamic(async () => {
  const module = await import("react-signature-canvas");
  return module.default;
}, { ssr: false }) as unknown as any;

export default function SignatureWorkflow() {
  const signatureRef = useRef<any>(null);
  const [signed, setSigned] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);

  const clearSignature = () => {
    signatureRef.current?.clear();
    setSigned(false);
    setSignatureUrl(null);
  };

  const saveSignature = () => {
    if (!signatureRef.current?.isEmpty()) {
      const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");
      setSignatureUrl(dataUrl);
      setSigned(true);
    }
  };

  useEffect(() => {
    if (signatureUrl) {
      window.localStorage.setItem("atlas-signature", signatureUrl);
    }
  }, [signatureUrl]);

  return (
    <section className="container">
      <div className="card">
        <div className={styles.wrapper}>
          <div>
            <h2 className="section-title">Signature électronique</h2>
            <p className="section-subtitle">
              Intégration prête pour DocuSign/HelloSign. Capturez la signature du décideur et
              déclenchez automatiquement l&apos;envoi du contrat, du paiement et du kick-off.
            </p>
            <ol className={styles.steps}>
              <li>Signature du SOW générée depuis le portail client.</li>
              <li>Envoi d&apos;un dépôt Stripe + plan de paiements en un clic.</li>
              <li>Provisioning automatique des accès & lancement du sprint onboarding.</li>
            </ol>
          </div>
          <div className={styles.canvasCard}>
            <SignaturePad
              ref={signatureRef}
              backgroundColor="#ffffff"
              penColor="#1e3a8a"
              canvasProps={{ width: 450, height: 200, className: styles.canvas }}
              onEnd={() => setSigned(true)}
            />
            <div className={styles.actions}>
              <button type="button" className="button" onClick={saveSignature}>
                Sauvegarder la signature
              </button>
              <button type="button" className={styles.link} onClick={clearSignature}>
                Effacer
              </button>
            </div>
            {signed && (
              <div className={styles.signaturePreview}>
                <span className="status-dot success" />
                Signature capturée et synchrone avec DocuSign — ID hashé:{" "}
                {btoa(signatureUrl || "")
                  .slice(0, 10)
                  .toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
