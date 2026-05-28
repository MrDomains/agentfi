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
      script.async = async;
      if (defer) script.defer = true;
      if (innerHTML) script.innerHTML = innerHTML;

      Object.entries(attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      document.head.appendChild(script);
      injectedScripts.push(script);
      return script;
    };

    const loadAnalytics = () => {
      if (cancelled) return;
      if (document.querySelector('script[data-analytics-block="clarity"]')) return;

      // Microsoft Clarity bootstrap
      appendScript({
        innerHTML: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vcu19du9ls");
        `,
        attrs: {
          "data-analytics-block": "clarity",
        },
      });

      // Google Analytics loader
      appendScript({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        async: true,
        attrs: {
          "data-analytics-block": "ga-loader",
        },
      });

      // Google Analytics init
      appendScript({
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `,
        attrs: {
          "data-analytics-block": "ga-init",
        },
      });

      // Simple Analytics
      appendScript({
        src: "https://scripts.simpleanalyticscdn.com/latest.js",
        async: true,
        defer: true,
        attrs: {
          "data-analytics-block": "simple-analytics",
          "data-collect-dnt": "true",
        },
      });
    };

    const disableGoogleAnalyticsAsSafeguard = () => {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    };

    const detectGreekVisitorFromDocument = () => {
      const htmlCountry =
        document.documentElement.getAttribute("data-country") ||
        document.documentElement.dataset.country;

      return htmlCountry === "GR";
    };

    if (detectGreekVisitorFromDocument()) {
      disableGoogleAnalyticsAsSafeguard();
      console.log("[AgentFi.com] Analytics suppressed for Greece visitor.");
      return () => {
        cancelled = true;
        injectedScripts.forEach((script) => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }

    loadAnalytics();

    return () => {
      cancelled = true;
      injectedScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}