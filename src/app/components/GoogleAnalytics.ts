import { useEffect } from "react";
import { useLocation } from "react-router";

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

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    if (document.getElementById(SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

    const onLoad = () => {
      window.dataLayer = window.dataLayer || [];

      const gtag = (...args: unknown[]) => {
        window.dataLayer.push(args);
      };

      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    };

    script.addEventListener("load", onLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}
