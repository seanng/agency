---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*)
description: Create logical git commits by grouping related changes
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

1. **Understand $ARGUMENTS**: Skip if there are no $ARGUMENTS

   - $ARGUMENTS represent user comments. For example, if $ARGUMENTS is "except \_gen-prp.md", adhere to NOT committing that file.
   - If $ARGUMENTS is "ai-docs", only commit AI/documentation related changes.
   - If unclear, get user clarification before proceeding.

2. **Analyze all changes** and group them into logical, atomic commits based on:

   - The understanding of $ARGUMENTS
   - Related functionality (e.g., all auth-related changes together)
   - File proximity (e.g., component + its tests)
   - Type of change (e.g., refactoring separate from new features)
   - Dependencies (changes that depend on each other should be together)

3. **For each logical group**:

   - Use `git add` to stage ONLY the files for that specific commit
   - Create a commit with an appropriate message
   - Repeat for the next group

4. **Important guidelines**:

   - NEVER use `git add .` - always specify individual files
   - Create multiple smaller commits rather than one large commit
   - Each commit should be independently functional when possible
   - If changes to a single file belong in different commits, explain why you're grouping them together

## Commit grouping examples

Example of good commit grouping for mixed changes:

```
# First analyze what changed
git status

# Commit 1: Core feature implementation
git add src/auth/login.js src/auth/logout.js
git commit -m "feat: implement user authentication

Added login and logout functionality with JWT token management..."

# Commit 2: Tests for the feature
git add tests/auth/login.test.js tests/auth/logout.test.js
git commit -m "test: add authentication tests

Added comprehensive test coverage for login/logout functionality..."

# Commit 3: Documentation updates
git add README.md docs/authentication.md
git commit -m "docs: update authentication documentation

Added documentation for new authentication endpoints..."
```

## Formatting guidelines

- Format commit titles as `type: brief description` where type is one of:
  - feat: new feature
  - fix: bug fix
  - docs: documentation changes
  - style: formatting, missing semi colons, etc
  - refactor: code restructuring
  - test: adding tests
  - chore: maintenance tasks
- Keep commit title brief and descriptive (max 72 chars)
- Add two line breaks after commit title
- Include a detailed body paragraph explaining:
  - What changes were made
  - Why the changes were necessary
  - Any important implementation details

## Process

1. First run `git status` to see all changes
2. Run `git diff HEAD` to understand what each change does
3. Plan your commits by grouping related changes
4. Execute commits one by one, staging only relevant files for each
