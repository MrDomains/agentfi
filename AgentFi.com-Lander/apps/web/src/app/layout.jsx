import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Microsoft Clarity
    const clarityScript = document.createElement("script");
    clarityScript.type = "text/javascript";
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
    document.head.appendChild(gtagScript);

    // Google Analytics - initialization
    const gtagInit = document.createElement("script");
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
    simpleAnalytics.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    document.head.appendChild(simpleAnalytics);

  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
