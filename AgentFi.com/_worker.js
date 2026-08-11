const STATIC_EXT_RE = /\.(?:css|js|mjs|map|json|xml|txt|ico|svg|png|jpe?g|gif|webp|avif|bmp|tiff?|woff2?|ttf|otf|eot|mp3|mp4|webm|ogg|wav|pdf|zip|gz|br)$/i;

const rateLimitMap = new Map();

function getCountry(request) {
  return request.cf?.country || request.headers.get("cf-ipcountry") || "Unknown";
}

function json(data, status = 200, corsOrigin = "*") {
  return new Response(JSON.stringify(data, null, 0), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function generateInquiryId() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AF-${yyyy}${mm}${dd}-${randomStr}`;
}

function wantsMarkdown(acceptHeader) {
  if (!acceptHeader) return false;
  const parts = acceptHeader.toLowerCase().split(",").map((p) => p.trim());
  
  // Βρίσκουμε το υψηλότερο q για text/markdown και text/html
  let mdQ = -1;
  let htmlQ = -1;

  for (const part of parts) {
    const [type, ...params] = part.split(";").map((s) => s.trim());
    let q = 1;
    for (const param of params) {
      if (param.startsWith("q=")) {
        q = parseFloat(param.slice(2)) || 0;
      }
    }
    if (type === "text/markdown" || type === "text/*") {
      if (q > mdQ) mdQ = q;
    }
    if (type === "text/html" || type === "text/*" || type === "*/*") {
      if (type === "text/html" && q > htmlQ) htmlQ = q;
      if ((type === "text/*" || type === "*/*") && htmlQ < 0) htmlQ = q * 0.5; // χαμηλότερη προτίμηση
    }
  }

  // Αν υπάρχει text/markdown και έχει ίσο ή μεγαλύτερο q από html → markdown
  return mdQ >= 0 && mdQ >= htmlQ;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cleanPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    const acceptHeader = request.headers.get("Accept") || "";
    const origin = request.headers.get("Origin") || "*";

    const allowedOrigin =
      origin === "https://www.agentfi.com" || origin === "https://agentfi.com"
        ? origin
        : "https://agentfi.com";

    // ====================== CORS Preflight ======================
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // ====================== 1. MARKDOWN NEGOTIATION (πολύ νωρίς) ======================
    if (wantsMarkdown(acceptHeader) && !STATIC_EXT_RE.test(cleanPath)) {
      // Μόνο για την αρχική σελίδα + βασικές σελίδες. Μπορείς να επεκτείνεις.
      if (cleanPath === "/" || cleanPath === "") {
        const markdown = `# AgentFi.com — The Infrastructure of Autonomous Finance

## Executive Summary
AgentFi is the foundational digital real estate for the autonomous finance sector. This domain represents the category-defining asset for the emerging Agentic Economy, where trillion-dollar transactions are executed autonomously by AI agents.

## Acquisition Details
- **Status:** Premium Domain for Sale (Confidential)
- **Sector:** Autonomous Finance • AI Agents • AgentFi • Smart Contracts • Algorithmic Trading
- **Positioning:** Category-defining infrastructure domain

## Next Steps
Institutional and strategic acquirers only.  
All inquiries are handled with the utmost discretion.

**Contact:** [hq@agentfi.com](mailto:hq@agentfi.com)
`;

        return new Response(markdown, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "X-Markdown-Tokens": "110",
            "Vary": "Accept",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    // ====================== 2. GEO API ======================
    if (cleanPath === "/api/geo") {
      const country = getCountry(request);
      return json(
        { country: country || null, isGreekVisitor: country === "GR" },
        200,
        allowedOrigin
      );
    }

    // ====================== 3. INQUIRY API ======================
    if (cleanPath === "/api/inquiry" && request.method === "POST") {
      try {
        if (
          origin !== "*" &&
          origin !== "https://agentfi.com" &&
          origin !== "https://www.agentfi.com"
        ) {
          return json({ error: "Unauthorized request origin." }, 403, allowedOrigin);
        }

        const clientIP = request.headers.get("cf-connecting-ip") || "unknown-ip";
        const now = Date.now();
        const limitData = rateLimitMap.get(clientIP) || {
          count: 0,
          resetTime: now + 3600000,
        };

        if (now > limitData.resetTime) {
          limitData.count = 0;
          limitData.resetTime = now + 3600000;
        }
        if (limitData.count >= 5) {
          return json(
            { error: "Too many requests. Please try again later." },
            429,
            allowedOrigin
          );
        }
        limitData.count++;
        rateLimitMap.set(clientIP, limitData);

        const body = await request.json();
        const { firstName, lastName, email, message, website } = body;

        // Honeypot
        if (website) {
          return json({ success: true, message: "Inquiry received." }, 200, allowedOrigin);
        }

        if (!firstName || !lastName || !email || !message) {
          return json(
            { error: "All required fields must be filled." },
            400,
            allowedOrigin
          );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json(
            { error: "Please provide a valid email address." },
            400,
            allowedOrigin
          );
        }

        const country = getCountry(request);
        const inquiryId = generateInquiryId();
        const greekTime = new Date().toLocaleString("en-US", {
          timeZone: "Europe/Athens",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        });

        const htmlEmail = `
          <div style="font-family: -apple-system, sans-serif; padding: 25px;">
            <h2>New Confidential Acquisition Inquiry</h2>
            <p><strong>Inquiry ID:</strong> ${inquiryId}</p>
            <p><strong>Submitted:</strong> ${greekTime}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p style="font-size: 12px; color: gray;">Country: ${country} | IP: ${clientIP}</p>
          </div>
        `;

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AgentFi <hq@agentfi.com>",
            to: "hq@agentfi.com",
            reply_to: email,
            subject: `Acquisition Inquiry: ${firstName} ${lastName} (${inquiryId})`,
            html: htmlEmail,
          }),
        });

        if (!resendResponse.ok) {
          const errorText = await resendResponse.text();
          return json({ error: `Resend API Error: ${errorText}` }, 500, allowedOrigin);
        }

        return json({ success: true, inquiryId }, 200, allowedOrigin);
      } catch (error) {
        return json({ error: `Internal error: ${error.message}` }, 500, allowedOrigin);
      }
    }

    // ====================== 4. WELL-KNOWN ENDPOINTS ======================

    // api-catalog
    if (cleanPath === "/.well-known/api-catalog") {
      return json({
        linkset: [
          {
            anchor: "https://agentfi.com",
            "service-desc": [
              {
                href: "https://agentfi.com/openapi.json",
                type: "application/vnd.oai.openapi+json",
              },
            ],
            "service-doc": [
              { href: "https://agentfi.com/auth.md", type: "text/markdown" },
            ],
            status: [{ href: "https://agentfi.com/api/health" }],
          },
        ],
      });
    }

    // OAuth Authorization Server (ΚΡΙΣΙΜΟ για agent_auth)
    if (cleanPath === "/.well-known/oauth-authorization-server") {
      return json({
        issuer: "https://agentfi.com",
        authorization_endpoint: "https://agentfi.com/auth",
        token_endpoint: "https://agentfi.com/token",
        jwks_uri: "https://agentfi.com/jwks",
        scopes_supported: [
          "read",
          "write",
          "agent_negotiation",
          "acquisition_inquiry",
        ],
        response_types_supported: ["code"],
        grant_types_supported: ["authorization_code", "client_credentials"],
        agent_auth: {
          skill: "https://agentfi.com/auth.md",
          register_uri: "https://agentfi.com/auth.md",
          identity_types_supported: ["did", "x509", "jwk", "anonymous"],
          credential_types_supported: ["jwt", "vc", "saml"],
          claim_uri: "https://agentfi.com/claims",
          revocation_uri: "https://agentfi.com/revoke",
        },
      });
    }

    // OAuth Protected Resource
    if (cleanPath === "/.well-known/oauth-protected-resource") {
      return json({
        resource: "https://agentfi.com",
        authorization_servers: ["https://agentfi.com"],
        scopes_supported: ["agent_negotiation", "acquisition_inquiry"],
        bearer_methods_supported: ["header"],
      });
    }

    // MCP Server Card
    if (cleanPath === "/.well-known/mcp/server-card.json") {
      return json({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        serverInfo: {
          name: "AgentFi-Sale-Gateway",
          version: "1.0.0",
          description:
            "Gateway for AI Agents evaluating the AgentFi.com domain acquisition.",
        },
        transport: { type: "sse", endpoint: "https://agentfi.com/api/mcp" },
        capabilities: { prompts: true, resources: true, tools: true },
      });
    }

    // HTTP Message Signatures Directory
    if (cleanPath === "/.well-known/http-message-signatures-directory") {
      return json({
        keys: [
          {
            kty: "RSA",
            use: "sig",
            kid: "agentfi-bot-key-1",
            alg: "RS256",
            n: "dummy-rsa-modulus-for-bot-auth",
            e: "AQAB",
          },
        ],
      });
    }

    // ====================== 5. AUTH.MD (δυναμικό – κερδίζει το static) ======================
    if (cleanPath === "/auth.md") {
      const authContent = `---
agent_auth:
  skill: "https://agentfi.com/auth.md"
  register_uri: "https://agentfi.com/auth.md"
  identity_types_supported:
    - did
    - x509
    - jwk
    - anonymous
  credential_types_supported:
    - jwt
    - vc
    - saml
---
# auth.md

AgentFi operates as the foundational infrastructure of autonomous finance.

Currently, public agentic discovery and access to our foundational data do not require authentication. However, interacting with the AgentFi acquisition APIs or registering as an authorized broker agent requires strict verification.

## Identity & Credentials

We support the following identity types for autonomous agent verification:

- DID (Decentralized Identifiers)
- X.509 Certificates
- JWK (JSON Web Keys)
- Anonymous (for initial discovery)

Supported credential types:

- JWT (JSON Web Tokens)
- VC (Verifiable Credentials)
- SAML

## Agent Registration Instructions

1. **Discovery:** Read the OAuth Protected Resource metadata at \`/.well-known/oauth-protected-resource\`.
2. **Authorization Server:** Fetch \`/.well-known/oauth-authorization-server\` and read the \`agent_auth\` block.
3. **Registration:** Submit your identity credentials. Manual verification by human operators is required for domain acquisition authorization to prevent automated spam.
4. **Token Issuance:** Use the standard OAuth 2.0 client credentials flow to obtain an access token once approved.

## OAuth 2.0 Endpoints

- \`/.well-known/oauth-authorization-server\`
- \`/.well-known/oauth-protected-resource\`

## Contact

For acquisition-related agent registration and human verification:  
**hq@agentfi.com**
`;

      return new Response(authContent, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Vary": "Accept",
        },
      });
    }

    // ====================== 6. FALLBACK → Static Assets ======================
    let response;
    try {
      response = await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response("Not found", { status: 404 });
    }

    // Πάντα προσθέτουμε Vary: Accept στο fallback
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Vary", "Accept");
    newResponse.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    return newResponse;
  },
};