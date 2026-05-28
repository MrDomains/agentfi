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

      // Microsoft Clarity
      appendScript({
        innerHTML: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vcu19du9ls");
        `,
        attrs: { "data-analytics": "clarity" },
      });

      // Google Analytics loader
      appendScript({
        src: "https://www.googletagmanager.com/gtag/js?id=G-EKBDNXXR4K",
        async: true,
        attrs: { "data-analytics": "ga-loader" },
      });

      // Google Analytics init
      appendScript({
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EKBDNXXR4K');
        `,
        attrs: { "data-analytics": "ga-init" },
      });

      // Simple Analytics
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

    const initAnalytics = async () => {
      try {
        const res = await fetch("/api/geo", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Geo endpoint failed with status ${res.status}`);
        }

        const data = await res.json();

        if (cancelled) return;

        if (data?.isGreekVisitor === true || data?.country === "GR") {
          console.log("[AgentFi.com] Analytics suppressed for Greece visitor.");
          return;
        }

        loadAnalytics();
      } catch (error) {
        if (cancelled) return;

        console.warn("[AgentFi.com] Geo check failed, loading analytics fallback.", error);
        loadAnalytics();
      }
    };

    initAnalytics();

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