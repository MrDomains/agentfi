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

    const loadAnalytics = () => {
      if (cancelled) return;

      // Microsoft Clarity
      const clarityScript = document.createElement("script");
      clarityScript.type = "text/javascript";
      clarityScript.setAttribute("data-analytics", "clarity");
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "vcu19du9ls");
      `;
      document.head.appendChild(clarityScript);

      // Google Analytics - gtag script
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-EKBDNXXR4K";
      gtagScript.setAttribute("data-analytics", "ga-script");
      document.head.appendChild(gtagScript);

      // Google Analytics - initialization
      const gtagInit = document.createElement("script");
      gtagInit.setAttribute("data-analytics", "ga-init");
      gtagInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EKBDNXXR4K');
      `;
      document.head.appendChild(gtagInit);

      // Simple Analytics
      const simpleAnalytics = document.createElement("script");
      simpleAnalytics.async = true;
      simpleAnalytics.defer = true;
      simpleAnalytics.src = "https://scripts.simpleanalyticscdn.com/latest.js";
      simpleAnalytics.setAttribute("data-analytics", "simple-analytics");
      simpleAnalytics.setAttribute("data-collect-dnt", "true");
      document.head.appendChild(simpleAnalytics);
    };

    const initAnalytics = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (cancelled) return;

        if (data?.country_code === "GR") {
          console.log("[AgentFi.com] Analytics suppressed for Greece visitor.");
          return;
        }

        loadAnalytics();
      } catch (error) {
        if (cancelled) return;

        // Safe fallback: if geo lookup fails, load analytics normally
        loadAnalytics();
      }
    };

    initAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}