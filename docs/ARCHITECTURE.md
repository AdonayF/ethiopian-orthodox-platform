# Architecture (proposal)

## Objectives
Start small, maintain clear boundaries, remain deployable by a small volunteer team, and protect community information.

## Layers
1. **Angular + TypeScript**: public pages, event/announcement components, admin forms, client-side navigation and localization.
2. **FastAPI**: REST endpoints, request validation, business rules, authentication integration and server-side authorization.
3. **PostgreSQL**: structured records for events, announcements and authorized users.
4. **Infrastructure**: Docker for reproducible local development. Hosting, CI and monitoring to be decided after MVP requirements.

## Preliminary data model
- `users`: identity and account state (avoid collecting unnecessary personal data)
- `roles` and `user_roles`: administrative permissions
- `announcements`: title, body, language, publish status, timestamps
- `events`: title, description, start/end, location, publish status

## Initial API surface (proposed)
- `GET /health`
- `GET /api/v1/announcements`
- `GET /api/v1/events`
- `POST /api/v1/admin/announcements` (authorized)
- `POST /api/v1/admin/events` (authorized)

No endpoint is implemented yet.

## Engineering decisions
- Keep it a modular monolith until requirements demand otherwise.
- Separate presentation from API communication in Angular; organize code by feature.
- Use migrations and automated tests before handling real member records.
- Enforce permissions server-side, use HTTPS, protect credentials with environment/secret management, log without exposing sensitive data.
- Review Amharic typography, accessibility and mobile usability with church members.
- Validate ecclesiastical dates and teachings with designated reviewers rather than generating unsourced claims.

## Open decisions
- Who owns the platform and has editorial authority?
- Who can create or approve religious material?
- Does the MVP need accounts for anyone besides administrators?
- Where will the application be hosted, funded and maintained?
