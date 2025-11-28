# Kerupuk Atom Mentai - Order Management System

## Overview

This is a full-stack web application for managing orders of "Kerupuk Atom Mentai" (Mentai-flavored crackers). The system provides a customer-facing ordering interface and an administrative dashboard for order management. Built as a lightweight, single-server application using vanilla JavaScript for the frontend and Node.js with TypeScript for the backend, it demonstrates a simple yet effective approach to small business e-commerce.

The application allows customers to place orders through a product landing page, specifying delivery or pickup preferences, while administrators can view and manage all incoming orders through a dedicated dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Vanilla HTML, CSS, and JavaScript with no framework dependencies for the customer and admin interfaces.

**Design Decision**: The application uses a traditional multi-page architecture rather than a Single Page Application (SPA) framework. This choice was made to minimize complexity, reduce bundle size, and improve initial page load performance for a simple ordering system. Static HTML files are served directly from the `public/` directory.

**Component Structure**:
- `public/index.html` - Customer-facing landing page with product information and order form
- `public/admin.html` - Administrative dashboard for viewing and managing orders
- `public/css/style.css` - Global styling with CSS custom properties for theming
- `public/css/admin.css` - Admin-specific styling
- `public/js/main.js` - Customer ordering interface logic (quantity management, delivery/pickup selection, form submission)
- `public/js/admin.js` - Admin dashboard logic (order display, filtering, real-time updates)

**Styling Approach**: CSS custom properties (CSS variables) are used for consistent theming across the application. The design system includes predefined colors, spacing, shadows, and border radius values defined in `:root` selectors.

**UI Components**: Extensive use of Radix UI components (as indicated by dependencies) for accessible, unstyled primitives. The application appears to be set up for potential React integration with components like accordions, dialogs, dropdowns, and toast notifications, though the current implementation uses vanilla JavaScript.

### Backend Architecture

**Server Framework**: Custom HTTP server built on Node.js's native `http` module rather than Express.js or other frameworks, despite the package name "rest-express".

**Design Decision**: The application implements a custom, lightweight HTTP server without framework dependencies. This approach provides maximum control over request handling and minimizes overhead, suitable for a simple CRUD application with limited endpoints.

**Request Handling**: Custom routing logic implemented in `server/index.ts` with manual URL parsing and method detection. The server handles:
- Static file serving with MIME type detection
- RESTful API endpoints for order management
- JSON request/response handling with custom body parsing

**Data Storage**: In-memory array-based storage for orders (`const orders: Order[] = []`). 

**Trade-offs**: In-memory storage provides simplicity and fast access but lacks persistence across server restarts. This is acceptable for development or very low-volume scenarios but would require migration to a persistent database for production use.

**TypeScript Integration**: The server uses TypeScript with ES modules (`"type": "module"`) for type safety and modern JavaScript features. The build process (via `tsx` and custom build script) compiles TypeScript to CommonJS for production deployment.

### Data Models

**Order Schema**: Defined as a TypeScript interface with the following structure:
- `id`: Unique identifier (string)
- `namaLengkap`: Customer full name
- `nomorTelepon`: Phone number
- `jumlahPesanan`: Order quantity (number)
- `metodePengambilan`: Delivery method ('delivery' | 'pickup')
- `alamat`: Delivery address
- `catatan`: Order notes
- `waktuPesan`: Order timestamp

**Data Validation**: The application is set up to use Zod for schema validation (`drizzle-zod` dependency), though validation logic is not visible in the provided files.

### Build and Deployment

**Development Mode**: Uses `tsx` to run TypeScript directly without compilation (`NODE_ENV=development tsx server/index.ts`)

**Production Build**: Custom build script (`script/build.ts`) compiles the application to a single CommonJS file (`dist/index.cjs`) for deployment

**Advantages**: Single-file deployment simplifies hosting and reduces dependency management in production. The build process likely bundles all dependencies for standalone execution.

## External Dependencies

### Database Layer

**Drizzle ORM** (`drizzle-orm@^0.39.1`): Type-safe ORM for database interactions. The application is configured with Drizzle but currently uses in-memory storage.

**Neon Database** (`@neondatabase/serverless@^0.10.4`): Serverless Postgres provider integration. The database infrastructure is configured but not actively used in the current implementation.

**Session Storage** (`connect-pg-simple@^10.0.0`): PostgreSQL-backed session store for Express sessions, indicating planned or partial session management functionality.

**Database Migrations**: Drizzle Kit is configured (`db:push` script) for schema migrations, suggesting the infrastructure exists for database integration even though it's not currently active.

### UI Component Library

**Radix UI Primitives**: Comprehensive set of 25+ unstyled, accessible React components including:
- Form controls: checkbox, radio, select, slider, switch
- Overlays: dialog, popover, tooltip, dropdown menu
- Navigation: tabs, accordion, menubar, navigation menu
- Layout: scroll area, separator, collapsible
- Feedback: toast, progress, alert dialog

**Design Decision**: Radix UI provides accessible component primitives without imposing visual styles, allowing for custom design implementation while ensuring WCAG compliance.

### Form Management

**React Hook Form** (`react-hook-form` via `@hookform/resolvers@^3.10.0`): Form state management and validation library

**Zod Integration** (`drizzle-zod@^0.7.0`): Schema-based validation connecting form validation with database schemas

### State Management

**TanStack Query** (`@tanstack/react-query@^5.60.5`): Server state management for data fetching, caching, and synchronization

**Use Case**: Likely used for managing order data fetching in the admin dashboard with automatic refetching and cache invalidation

### Utility Libraries

**Class Variance Authority** (`class-variance-authority@^0.7.1`): Type-safe CSS class composition for variant-based component styling

**clsx** (`clsx@^2.1.1`): Utility for constructing className strings conditionally

**date-fns** (`date-fns@^3.6.0`): Modern date manipulation library for formatting timestamps

**cmdk** (`cmdk@^1.1.1`): Command palette component for keyboard-driven interfaces

**Embla Carousel** (`embla-carousel-react@^8.6.0`): Carousel/slider component library

### Development Tools

**tsx**: TypeScript execution engine for development and build processes

**Source Maps** (`@jridgewell/trace-mapping@^0.3.25`): Source map parsing for debugging compiled code

### Architecture Note

The dependencies suggest a transition or planned migration from the current vanilla JavaScript implementation to a React-based frontend. The extensive Radix UI and React ecosystem dependencies are not reflected in the current HTML/JS implementation, indicating either:

1. A partial migration in progress
2. Prepared infrastructure for future React conversion
3. Unused dependencies from a template or boilerplate

The backend is prepared for database integration with Neon and Drizzle but currently operates with in-memory storage, suggesting early-stage development or intentional simplification for the current deployment.