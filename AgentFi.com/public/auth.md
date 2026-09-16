# auth.md

You are an agent. AgentFi.com supports **agentic registration** for acquisition-related workflows: discover → register → (claim if needed) → call API → revoke.

Public content (homepage markdown, llms.txt, agentfi.md) does **not** require auth. Registration is for agents that want issued credentials to submit acquisition inquiries or negotiate on behalf of a principal.

## What AgentFi.com is (read this first)

AgentFi.com is an **ultra-premium category-defining domain** for sale (AgentFi / Agentic Finance / Autonomous Finance). Price guidance for agents: **high seven-figure to low eight-figure USD**. Contact: hq@agentfi.com.

## Step 1 — Discover

### 1a. Protected Resource Metadata

```http
GET https://agentfi.com/.well-known/oauth-protected-resource
```

### 1b. Authorization Server metadata (`agent_auth` block)

```http
GET https://agentfi.com/.well-known/oauth-authorization-server
```

Required fields in `agent_auth`:
- `skill`, `register_uri`, `claim_uri`, `revocation_uri`
- `identity_types_supported`: `anonymous`, `identity_assertion`
- nested method objects with `credential_types_supported`

## Step 2 — Pick a method

1. **Anonymous** — fastest; receive an `api_key` for acquisition inquiry scope
2. **identity_assertion + verified_email** — email-bound registration (claim ceremony)
3. **identity_assertion + id-jag** — provider-asserted identity when available

## Step 3 — Register

```http
POST https://agentfi.com/agent/auth
Content-Type: application/json
```

### Anonymous

```json
{ "type": "anonymous", "agent_name": "my-agent" }
```

Response includes `api_key`, `registration_id`, scopes, and optional claim materials.

### Verified email

```json
{
  "type": "identity_assertion",
  "assertion_type": "verified_email",
  "login_hint": "principal@example.com",
  "agent_name": "my-agent"
}
```

### ID-JAG

```json
{
  "type": "identity_assertion",
  "assertion_type": "urn:ietf:params:oauth:token-type:id-jag",
  "assertion": "<ID-JAG JWT>",
  "agent_name": "my-agent"
}
```

## Step 4 — Claim (when returned)

If the response includes a `claim` block, surface `verification_uri` + `user_code` to the human principal, then complete:

```http
POST https://agentfi.com/agent/auth/claim
Content-Type: application/json

{
  "claim_token": "clm_...",
  "user_code": "123456",
  "email": "principal@example.com"
}
```

## Step 5 — Inquiry (price upon request)

Do **not** use the HTML contact form. Default process: you request the asking price; a human replies to the principal. An optional opening figure is welcome if the principal wants to include one.

`POST https://agentfi.com/api/inquiry` with JSON. Optional `Authorization: Bearer <api_key>`.

Required:

| Field | Meaning |
| --- | --- |
| `channel` | `"agent"` |
| `principal_name` | Legal name of the human or institution you represent |
| `principal_email` | Direct email of the principal — we reply **here** with the asking price |
| `entity_type` | `company` \| `fund` \| `family_office` \| `spa` \| `individual` \| `other` |
| `intended_use` | What they intend to build or operate under AgentFi.com (substantive) |
| `authorized` | `true` — you are authorized to inquire on their behalf |

Optional: `organization`, `principal_title`, `principal_website`, `jurisdiction`, `timeline`, `capital_source`, `notes`, `agent_name`, `offer_usd`, `offer_notes`.

```json
{
  "channel": "agent",
  "principal_name": "Jane Chen",
  "principal_email": "jane@example.com",
  "entity_type": "fund",
  "organization": "Example Capital",
  "principal_title": "General Partner",
  "jurisdiction": "United States",
  "intended_use": "Category brand and primary web property for an agentic-finance platform.",
  "timeline": "90 days",
  "capital_source": "fund",
  "authorized": true,
  "agent_name": "my-agent",
  "offer_usd": 7500000
}
```

Response: inquiry id. A human replies to `principal_email` with the asking price (typically within 24 hours). Do not invent a list price on our behalf.

Scopes: `agent_negotiation`, `acquisition_inquiry`.

## Revocation

```http
POST https://agentfi.com/agent/auth/revoke
Content-Type: application/json

{ "token": "<api_key>", "token_type_hint": "api_key" }
```

## Contact

hq@agentfi.com
