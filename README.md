# Agency Monorepo

A Turborepo monorepo for quickly generating client NextJS applications with a consistent tech stack and shared configurations.

## Tech Stack

Each client app includes:

- **NextJS 15** with App Router and TypeScript
- **Tailwind CSS v4** for styling
- **Next Intl** for internationalization (en, es, fr)
- **Payload CMS** for content management
- **Shared ESLint and TypeScript configurations**

## How to use

### Step 1: Create Draft

- Create a copy of `ai/draft-project-template.md` -> `ai/<project-name>.md`
- Project Name naming convention = `<client-name>-<web/app>`
- Fill out fields. Add examples to `ai/examples/`

### Step 2: Generate Round of Designs

- In Claude Code, ensure you're running the latest Opus model. Run `/gen-round <project-name>`

### Step 3: Choose Base Design

- In the newly created project folder, create a copy of the design you like the most from `apps/<project-name>`.
- If you don't like any of the designs, go back to Step 2. Be clear about what you didn't like from the existing designs, and what you want to see differently
- Choose to iterate over 1 landing section at a time, if possible. This makes it easier and designs will be generated faster.

### Step 4: Iterate on Base Design

- Keep iterating on Base Design. Directly or generate multiple if working on it section by section.

### Step 5: Create Project

- Once happy with designs, create a new NextJS project in the apps folder.
- To do so, open Claude Code and run `/create-project <project-name>`

## Quick Start

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Create a new client app**:

   ```bash
   pnpm create-client my-project-name
   ```

3. **Start development**:
   ```bash
   pnpm dev
   # or for specific app:
   pnpm dev --filter=my-project-name
   ```

## Project Structure

```
/
├── apps/
│   ├── template-app/         # Base template for new client apps
│   └── [project-name]/       # Your client apps
├── packages/
│   ├── @agency/eslint-config    # Shared ESLint rules
│   ├── @agency/typescript-config # Shared TypeScript configs
│   ├── @agency/ui               # Shared UI components
│   └── @agency/shared-utils     # Common utilities
└── scripts/
    └── create-client-app.js     # Client app generation script
```

## Available Commands

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm check-types` - Type check all packages
- `pnpm format` - Format code with Prettier
- `pnpm create-client <name>` - Generate new client app

## Creating Client Apps

The `create-client` script copies the template app and sets up a new project:

```bash
pnpm create-client acme-corp
```

This creates `apps/acme-corp/` with:

- Pre-configured NextJS app
- Shared ESLint and TypeScript configs
- Next Intl setup with sample translations
- Payload CMS configuration
- Environment file template

## Client App Setup

After creating a new client app:

1. **Configure environment**:

   ```bash
   cd apps/your-project-name
   cp .env.example .env
   # Edit .env with your specific settings
   ```

2. **Set up database for Payload CMS**:
   - Configure your database connection in `.env`
   - Update `payload.config.ts` as needed

3. **Customize branding**:
   - Update translations in `messages/`
   - Customize Tailwind styles
   - Add client-specific assets

4. **Start development**:
   ```bash
   # From monorepo root
   pnpm dev --filter=your-project-name
   ```

## Shared Packages

### @agency/eslint-config

Provides consistent linting rules across all apps:

- NextJS and React best practices
- TypeScript support
- Prettier integration

### @agency/typescript-config

Base TypeScript configurations:

- `base.json` - Standard config
- `nextjs.json` - NextJS-specific settings

### @agency/shared-utils

Common utilities (expand as needed):

- Currently minimal, ready for growth
- Add shared functions, constants, types

## Development Tips

- Use `--filter` flag to work on specific apps: `pnpm dev --filter=client-name`
- Shared packages are automatically linked across the monorepo
- Changes to shared packages trigger rebuilds in dependent apps
- Each app maintains its own Tailwind and Payload configurations
