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
    // Set page title and metadata
    document.title = "AgentFi.com | The Infrastructure of Autonomous Finance";

    // Remove existing meta description if it exists
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.remove();
    }

    // Add meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "The definitive category domain for the Agentic Economy. Secure the digital asset that defines the future of AI driven capital. Strategic acquisition inquiries only.";
    document.head.appendChild(metaDescription);

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

    // Remove any existing favicons
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach((link) => link.remove());

    // Add primary favicon (PNG)
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href =
      "https://raw.createusercontent.com/bb2c19a1-029e-45e0-a87d-2c5aef50f81c/";
    document.head.appendChild(favicon);

    // Add shortcut icon for better compatibility
    const shortcutIcon = document.createElement("link");
    shortcutIcon.rel = "shortcut icon";
    shortcutIcon.type = "image/png";
    shortcutIcon.href =
      "https://raw.createusercontent.com/bb2c19a1-029e-45e0-a87d-2c5aef50f81c/";
    document.head.appendChild(shortcutIcon);

    const appleTouchIcon = document.createElement("link");
    appleTouchIcon.rel = "apple-touch-icon";
    appleTouchIcon.href =
      "https://raw.createusercontent.com/bb2c19a1-029e-45e0-a87d-2c5aef50f81c/";
    document.head.appendChild(appleTouchIcon);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
