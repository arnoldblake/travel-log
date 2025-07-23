# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup

```bash
pnpm install
```

### Development Server

```bash
pnpm dev  # Starts both Nuxt dev server and Turso local db
```

Individual services:

```bash
pnpm dev:db    # Turso local database only
nuxt dev       # Nuxt development server only
```

### Testing & Quality

```bash
pnpm lint       # ESLint check
pnpm lint:fix   # ESLint auto-fix
pnpm typecheck  # TypeScript type checking
```

### Build & Deploy

```bash
pnpm build    # Production build
pnpm preview  # Preview production build locally
```

### Database Operations

The project uses Drizzle ORM with Turso (SQLite). Database migrations are in `lib/db/migrations/`.

## Architecture Overview

### Tech Stack

- **Framework**: Nuxt 3 (Vue.js)
- **Database**: Turso (SQLite) with Drizzle ORM
- **Authentication**: Better Auth with GitHub OAuth
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Pinia stores
- **Maps**: MapLibre with custom map components
- **Validation**: Vee-Validate + Zod schemas

### Key Architecture Patterns

**Database Layer**:

- Schema definitions in `lib/db/schema/` (auth, location, location-log, location-log-image)
- Database queries in `lib/db/queries/`
- Environment config in `lib/env.ts` with Zod validation

**Authentication Flow**:

- Better Auth configuration in `lib/auth.ts`
- GitHub OAuth provider setup
- Custom user type with numeric ID (`UserWithId`)
- Server middleware in `server/middleware/auth.ts`

**State Management**:

- Pinia stores in `stores/` directory
- `locations.ts`: Manages location data and sidebar integration
- `map.ts`: Handles map state, points, and camera controls
- `auth.ts`, `sidebar.ts`: UI state management

**Map Integration**:

- MapLibre GL with Vue wrapper (`@indoorequal/vue-maplibre-gl`)
- Map points system linking locations to map markers
- Dynamic bounds calculation and camera control
- Point selection with flyTo animations

**API Structure**:

- RESTful APIs in `server/api/`
- Authenticated endpoints using `defineAuthenticatedEventHandler`
- Location CRUD operations with slug-based routing
- Search functionality for location discovery

**Page Structure**:

- Dashboard-based navigation
- Dynamic location pages with slug routing
- Form handling with Vee-Validate integration
- Error boundaries and loading states

### Component Organization

- `components/app/`: Core app components (map, nav, forms)
- Form validation uses Zod schemas from `lib/zod-schemas.ts`
- Theme toggle with Nuxt Color Mode
- Responsive design with Tailwind utilities

### Database Schema

- Users (Better Auth managed)
- Locations: Geographic points with metadata
- Location Logs: Time-based entries for locations
- Location Log Images: Associated media files

The app follows a location-centric data model where users can create locations, add time-based logs to those locations, and attach images to those logs.
