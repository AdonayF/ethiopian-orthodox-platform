# Ethiopian Orthodox Digital Platform ☦️

A proposed digital platform to help Ethiopian Orthodox Tewahedo church communities share announcements, organize events, and make trusted resources easier to find in English and Amharic.

> **Status:** Planning and initial development. This is an independent project concept, not an official church service or an authorized source of religious teaching.

## Vision

Build a useful, accessible and maintainable community platform, starting with a small MVP and expanding only after discussing real needs with church leadership and members.

### Proposed MVP
- **Announcements:** browse church news and updates.
- **Events:** upcoming church services and community activities.
- **Admin dashboard:** authorized administrators can create and update events and announcements.
- **Responsive and accessible UI:** mobile-first design and a foundation for English/Amharic localization.

### Future ideas
- Ethiopian Orthodox calendar and fasting/feast information **reviewed by church authorities**.
- Multilingual digital library of approved resources, with attention to publishing permissions.
- Source-linked search over approved content (potentially retrieval-augmented search later).

## Proposed stack
| Layer | Technology |
| --- | --- |
| Frontend | Angular, TypeScript |
| Backend API | Python, FastAPI |
| Database | PostgreSQL |
| Local development | Docker Compose (planned) |
| Deployment | Cloud provider to be decided |

The stack is provisional and should be validated against maintainers' needs.

## Architecture

```text
Browser (Angular / TypeScript)
         |
       HTTPS
         |
FastAPI (REST endpoints, validation, authorization)
         |
     PostgreSQL
```

Backend authorization will be enforced on every protected operation; frontend route guards alone do not provide security. Secrets and personal data must not be committed to Git.

## Repository layout

```text
frontend/       # Angular app (to be scaffolded)
backend/        # FastAPI app (to be scaffolded)
database/       # Schema and migrations (planned)
docs/           # Architecture, requirements, and roadmap
```

## Getting started

This repository is currently at the **planning/scaffolding** stage. It does not yet contain a runnable application.

See [the roadmap](docs/ROADMAP.md) and [architecture notes](docs/ARCHITECTURE.md).

## Community and stewardship

This platform should be built **with**, not merely for, church leaders and members. Confirm content ownership, permissions, privacy needs and who will maintain it before deploying anything. Liturgical content must be verified by appropriate church authorities.

## Maintainer

Initiated by Adonay Zeru as a software engineering/community service project.
