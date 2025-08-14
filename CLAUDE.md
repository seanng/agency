# Claude Development Guidelines

This file contains important instructions and context for Claude when working on this monorepo.

## Project Structure
This is a monorepo managed with pnpm workspaces containing multiple applications and packages.

## Development Commands

### Running Development Servers
When testing changes in a specific project, always use the filter flag to run only that project:

```bash
# Correct way to run dev server for a specific project
pnpm dev --filter=<project-name>

# Examples:
pnpm dev --filter=ging-mockup-store
pnpm dev --filter=wanyi-web
```

**Important:** Do NOT use `pnpm dev` without the filter flag in the project directory, as this may attempt to run all projects in the monorepo simultaneously.

### Building Projects
Similarly, when building a specific project:

```bash
pnpm build --filter=<project-name>
```

### Installing Dependencies
When adding dependencies to a specific project:

```bash
# Add to a specific workspace
pnpm add <package-name> --filter=<project-name>

# Add as dev dependency
pnpm add -D <package-name> --filter=<project-name>
```

## Testing and Linting

### Type Checking
```bash
pnpm check-types --filter=<project-name>
```

### Linting
```bash
pnpm lint --filter=<project-name>
```

## Notes
- Always ensure you're working in the correct workspace
- Use the `--filter` flag to target specific projects
- The monorepo uses shared configurations from the `packages/` directory