# Generate Round

Generate a new round of draft landing page designs based on $ARGUMENTS file.

## Arguments

- `$ARGUMENTS` - Path to the input file

### Project Name Determination

- Extract project name from the input file.
- If no project name exists in the input file, base it on the file name.
  - For example, `umipalace-web.md` → `umipalace-web`

## Process

### Phase 0: Detect Project State

- Check if project folder exists in @apps/drafts/projects/<project-name>/
- Find highest existing round-N/ folder
- Check if base.html has actual content (not just placeholder comment)

#### If project doesn't exist:

- Start from Phase 1

#### If round-N/ exists:

- **ACTIVATE PLAN MODE**
- Inform user: "I see round-N exists. Preparing round-(N+1)."
- If base.html has content:
  - Ask: "Continue refining from base.html, or start fresh with new designs?"
  - If refining: Generate round-(N+1) variations building on base.html
  - If fresh: Ask what should be different, then generate new designs
- If base.html is empty/placeholder:
  - Ask: "No design was selected from round-N. What didn't work?"
  - Update specs based on feedback
  - Generate completely new round-(N+1) variations

### Phase 1: Clarify Specifications

- Cross check $ARGUMENTS file with @ai/draft-project-template.md to ensure each question is addressed
- If not addressed, check with user and suggest options for each unanswered question
- For "Sections" field, suggest industry-appropriate sections based on the specified industry
- Validate project name is kebab-case. If update needed, ensure $ARGUMENTS file is updated

### Phase 2: Confirm Section Order

- Based on Sections specification, confirm the order of each section from top to bottom
- If user is unsure, provide suggestions based on industry best practices
- Confirm both section order and all specifications before proceeding

### Phase 3: Create/Update Project Structure

- If new project: Create folder in @apps/drafts/projects/<project-name>/ following template structure
- Save/update specifications to `specs.md`
- If continuing from previous round, append round history:

  ```markdown
  ### Round History

  - Round N: [Summary of attempt and feedback]
  ```

### Phase 4: Generate Design Alternatives

- **Spawn 4 parallel subagents** to generate HTML wireframe prototypes
- Each agent creates 3 variations (12 total designs)
- Agent styles based on client's brand personality specifications:
  - Each agent interprets the same brief with different emphasis
  - Example: If "Professional, Trustworthy" → corporate, modern, friendly, premium interpretations
- Each design should be fully self-contained HTML with inline CSS
- Store each variant in @apps/drafts/projects/<project-name>/round-N/
- Naming convention: `variation-[1-12]-[descriptive-name].html`

### Phase 5: Generate Index

- Auto-generate/update index.html in project folder
- Display grid of all variations from current round
- If base.html exists, show it prominently at top
- Each variation card should show an image preview.
- Each variation links to full page (opens in new tab)
