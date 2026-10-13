import { useEffect, useRef, useState } from "react";
import { closeConsentPanel, openConsentPanel, setAnalyticsConsent, useConsent } from "./consent";

const buttonClass =
  "px-5 py-2.5 text-sm rounded border border-gray-900 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-colors";

export function CookieConsent() {
  const { choice, panelOpen } = useConsent();
  const [analytics, setAnalytics] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visible = choice === null || panelOpen;
  const detailed = panelOpen;

  useEffect(() => {
    if (panelOpen) {
      setAnalytics(choice?.analytics === true);
      titleRef.current?.focus();
    }
  }, [panelOpen, choice]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeConsentPanel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4"
    >
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
        <h2 id="cookie-title" ref={titleRef} tabIndex={-1} className="text-base text-gray-900 mb-2 focus:outline-none">
          Votre vie privée
        </h2>
        <p id="cookie-desc" className="text-sm text-gray-600 leading-relaxed">
          Ce site utilise Google Analytics pour mesurer son audience (pages vues, provenance des visites) et
          l'améliorer. Cette mesure dépose des cookies et n'est activée qu'avec votre accord. Vous pouvez changer
          d'avis à tout moment via « Gestion des cookies » en bas de page.
        </p>

        {detailed && (
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4 border-t border-gray-200 pt-3">
              <div>
                <p className="text-gray-900">Cookies nécessaires</p>
                <p className="text-gray-600">Mémorisent votre choix de consentement. Toujours actifs.</p>
              </div>
              <span className="text-gray-500 shrink-0">Toujours actifs</span>
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-gray-200 pt-3">
              <div>
                <label htmlFor="cookie-analytics" className="text-gray-900">
                  Mesure d'audience Google Analytics
                </label>
                <p className="text-gray-600">
                  Service de Google (Google Analytics 4) : statistiques de fréquentation. Les données sont
                  transmises à Google. Désactivée par défaut ; en la désactivant, les cookies de mesure sont
                  supprimés.
                </p>
              </div>
              <input
                id="cookie-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-gray-900"
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button type="button" className={buttonClass} onClick={() => setAnalyticsConsent(true)}>
            Accepter
          </button>
          <button type="button" className={buttonClass} onClick={() => setAnalyticsConsent(false)}>
            Refuser
          </button>
          {detailed ? (
            <button type="button" className={buttonClass} onClick={() => setAnalyticsConsent(analytics)}>
              Enregistrer mon choix
            </button>
          ) : (
            <button type="button" className={buttonClass} onClick={openConsentPanel}>
              Personnaliser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
