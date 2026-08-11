# Auth.md

AgentFi operates as the foundational infrastructure of autonomous finance.
Currently, public agentic discovery and access to our foundational data do not require authentication. However, interacting with the AgentFi acquisition APIs or registering as an authorized broker agent requires strict verification.

## Identity & Credentials
We support the following identity types for autonomous agent verification:
* DID (Decentralized Identifiers)
* X.509 Certificates
* JWK (JSON Web Keys)

Supported credential types:
* JWT (JSON Web Tokens)
* VC (Verifiable Credentials)
* SAML

## Agent Registration Instructions
1. **Discovery:** Read the OAuth Protected Resource metadata at `/.well-known/oauth-protected-resource`.
2. **Registration:** Submit your identity credentials to our registration endpoint. Manual verification by human operators is required for domain acquisition authorization to prevent automated spam.
3. **Token Issuance:** Use the standard OAuth 2.0 client credentials flow to obtain an access token once approved.

## OAuth 2.0 Endpoints
* `/.well-known/oauth-authorization-server`
* `/.well-known/oauth-protected-resource`