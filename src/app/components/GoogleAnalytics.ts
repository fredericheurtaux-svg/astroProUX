import { useEffect } from "react";
import { useLocation } from "react-router";
import { deleteAnalyticsCookies, useConsent } from "./consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SCRIPT_ID = "ga-gtag-script";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

export function GoogleAnalytics() {
  const location = useLocation();
  const enabled = useConsent().choice?.analytics === true;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !enabled;
    if (!enabled) deleteAnalyticsCookies();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !GA_MEASUREMENT_ID || document.getElementById(SCRIPT_ID)) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js exige l'objet arguments, pas un tableau
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !GA_MEASUREMENT_ID || !window.gtag) {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, location.pathname, location.search]);

  return null;
}
