# AdForge AI

`AI SaaS Product`

Create & share short-form video ads and images in bulk using Artificial Intelligence.

![Landing page hero showing a clean, minimal interface with the text Create premium advertisements with AI. and action buttons Start Creating and Explore Community, set on a light gray background with a small badge above the headline and a subtle product-focused layout.](./public/preview.png "AdForge-AI Homepage")

## Primary Users

- Digital marketers
- Small businesses
- Ecommerce stores
- Agencies
- Freelancers
- Content creators

## Core Features (v1)

### Authentication

- Sign up
- Login
- Social login
- User profile
- Protected routes

### Credits

- 20 free credits
- Monthly subscriptions
- Credit deduction
- Credit history
- Prevent generation on zero credits

### AI Generation

#### Input

- Product image
- Model image
- Product name
- Project name
- Description
- Optional prompt
- Orientation
- Output type

#### Output

- Generated video
- Generated thumbnail
- Metadata
- Prompt used
- Download

### Collections

- Search
- Filter
- Pagination
- Delete
- Download
- Copy URL
- Public/private toggle
- Regenerate

### Community

- Public generations
- Bookmark
- Search
- Filters
- Creator profile
- Downloads count

### Pricing

`Plans`

| Plans    | Credits | Duration |
| -------- | ------- | -------- |
| Free     | 20      | Starter  |
| Pro      | 200     | 1 Month  |
| Premium  | 2000    | 1 Month  |
| Ultimate | 5000    | 6 Month  |

### User Profile

- Clerk profile
- Credits
- Active plan
- Billing
- Settings

### About

- Docs
- Legal
- Privacy
- Terms
- FAQ

## High-Level Architecture

```tree
                    Browser

                       │
                       ▼

               Next.js 16 App Router

        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼

     Server        Route Handlers   Server Actions

        │
        ▼

     Service Layer
        │
        ├─────────────┐
        │             │
        ▼             ▼

 AI Providers      Business Logic

        │
        ▼

 Repository Layer

        │
        ▼

 MongoDB + Cloudinary
```

## Domain Modules

- auth
- users
- credits
- plans
- billing
- generations
- collections
- community
- bookmarks
- ai
- storage
- notifications
- shared

_Every module owns its:_

- actions/
- components/
- repositories/
- schemas/
- services/
- types/
- validators/

## AI Provider Layer

```tree
Gemini
      \
       \
Groq -----> AI Gateway ----> Generation Service
       /
OpenRouter
     /
GitHub Models
```

## Database Collections

- users
- plans
- subscriptions
- credit_transactions
- projects
- generations
- bookmarks
- downloads
- sessions (auth provider)
- webhooks

## Content Generation Flow

```tree
User

↓

Upload Images

↓

Validation

↓

Cloudinary Upload

↓

Deduct Credits

↓

AI Provider

↓

Generated Assets

↓

Cloudinary

↓

MongoDB

↓

Return Result
```

## Tech Decisions

| Area          | Decision                   |
| ------------- | -------------------------- |
| Framework     | Next.js 16 App Router      |
| Language      | Typescript                 |
| UI            | Shadcn/ui v4               |
| Forms         | React Hook Form + Zod      |
| Styling       | Tailwind CSS v4            |
| Database      | MongoDB 8                  |
| ODM           | Mongoose 9                 |
| Storage       | Cloudinary                 |
| Auth          | Clerk v7                   |
| Payments      | Stripe                     |
| AI            | Provider abstraction layer |
| Notifications | Sonner v2                  |
| Deployment    | Vercel                     |

## Project Roadmap

- Phase 0 — Product Planning & System Architecture (current)
- Phase 1 — Project Bootstrap & Development Standards
- Phase 2 — Database & Infrastructure
- Phase 3 — Authentication
- Phase 4 — Design System & Layout
- Phase 5 — AI Generation Engine
- Phase 6 — Collections
- Phase 7 — Community
- Phase 8 — Billing & Credits
- Phase 9 — Production Hardening
- Phase 10 — Deployment

### Rules & Regulations

_All rights reserved. Copyrights 2026._

#### Developed & maintained by `Afnan Muhammad`
