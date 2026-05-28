import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const GA_MEASUREMENT_ID = "G-EKBDNXXR4K";
const CLARITY_ID = "vcu19du9ls";

export default function RootLayout({ children }) {
  useEffect(() => {
    let cancelled = false;
    const injectedScripts = [];

    const appendScript = ({
      src,
      async = true,
      defer = false,
      innerHTML,
      attrs = {},
    }) => {
      if (cancelled) return null;

      const script = document.createElement("script");

      if (src) script.src = src;
      if (async) script.async = true;
      if (defer) script.defer = true;
      if (innerHTML) script.text = innerHTML;

      Object.entries(attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      document.head.appendChild(script);
      injectedScripts.push(script);
      return script;
    };

    const loadAnalytics = () => {
      if (cancelled) return;

      if (document.querySelector('script[data-analytics="ga-loader"]')) {
        return;
      }

      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

      appendScript({
        innerHTML: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
        attrs: { "data-analytics": "clarity" },
      });

      appendScript({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        async: true,
        attrs: { "data-analytics": "ga-loader" },
      });

      appendScript({
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `,
        attrs: { "data-analytics": "ga-init" },
      });

      appendScript({
        src: "https://scripts.simpleanalyticscdn.com/latest.js",
        async: true,
        defer: true,
        attrs: {
          "data-analytics": "simple-analytics",
          "data-collect-dnt": "true",
        },
      });
    };

    const cleanupScripts = () => {
      injectedScripts.forEach((script) => {
        if (script?.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };

    const initAnalytics = async () => {
      try {
        const res = await fetch("/api/geo", {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Geo endpoint failed with status ${res.status}`);
        }

        const data = await res.json();

        if (cancelled) return;

        if (data?.country === "GR" || data?.isGreekVisitor === true) {
          window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
          console.log("[AgentFi.com] Analytics suppressed for Greece visitor.");
          return;
        }

        loadAnalytics();
      } catch (error) {
        if (cancelled) return;

        console.warn(
          "[AgentFi.com] Geo check failed. Analytics allowed as fallback.",
          error
        );

        loadAnalytics();
      }
    };

    initAnalytics();

    return () => {
      cancelled = true;
      cleanupScripts();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}