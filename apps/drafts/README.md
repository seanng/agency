# Drafts - Static Design Previews

Static HTML design variations for client preview, deployed via Deno Deploy.

## Structure

```
drafts/
├── projects/           # Client projects
│   └── {name}/        # Project folder
│       ├── specs.md   # Design specifications
│       ├── base.html  # Selected design (if any)
│       ├── index.html # Project variation grid
│       └── round-N/   # Design iterations
├── template-project/  # Template structure
└── serve.ts          # Deno static server
```

## Local Preview

```bash
pnpm drafts  # Opens projects folder in Finder
```

## Deployment

Push to GitHub → Auto-deploys to Deno Deploy

## Usage

Generate designs using Claude Code command:
```
/draft-project specs-file.md
```