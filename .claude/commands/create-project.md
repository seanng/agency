# Create Project

Generate a new Next.js application from apps/drafts/projects/$ARGUMENTS/base.html.

## Phase 0: Validate Prerequisites

- Check if @apps/drafts/projects/$ARGUMENTS/base.html exists and has content
- If empty or missing, inform user: "No base design found. Please select a design from drafts first."
- Exit if no valid base.html

## Phase 1: Analyze Design & Gather Requirements

### Analyze base.html

- Parse the HTML structure to identify content types
- Detect sections that would benefit from CMS management
- Note any forms, dynamic content areas

### Suggest CMS Collections

Based on base.html analysis, suggest Payload CMS collections:

- **Common suggestions**:
  - Pages (with SEO fields: title, description, og:image, keywords)
  - Navigation/Menu items
  - Hero sections
  - Features/Services
  - Team members (if team section detected)
  - Testimonials (if testimonials detected)
  - Blog/News (if blog section detected)
  - Products (if product cards detected)
  - FAQ (if FAQ section detected)
- Ask: "Based on your design, I suggest these CMS collections: [list]. Confirm or modify?"

### Gather Additional Requirements

1. **Languages**
   - Which languages should be supported? (e.g., en, es, fr, ja)
   - What is the default language?

2. **Theme Features**
   - Include light/dark mode toggle? (Yes/No)
     - If yes, use next-themes package.
   - Additional color themes beyond the design? (Yes/No)

3. **Analytics**
   - PostHog analytics? (Yes/No)
   - Google Analytics? (Yes/No)
   - Vercel Analytics? (Yes/No)

4. **Contact Form**
   - Include functional contact form? (Yes/No)
   - If yes, email service preference? (Resend, SendGrid, Other)

## Phase 2: Create Next.js Application

1. Run create-client-app.js script with $ARGUMENTS
2. Verify successful creation in apps/$ARGUMENTS
3. Update package.json metadata

## Phase 3: Convert HTML to React

Parse base.html and convert to React components:

### Layout Extraction (app/[locale]/layout.tsx)

- Extract <head> metadata for SEO
- Identify persistent elements (header, footer, navigation)
- Convert to layout wrapper components
- Implement CSS variables for theming (always)

### Page Content (app/[locale]/page.tsx)

- Extract main content sections
- Convert to page-specific components
- Replace hardcoded text with translation keys

### Component Generation (components/)

Create typed React components:

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/sections/Hero.tsx`
- `components/ui/ThemeToggle.tsx` (if dark mode enabled)
- Additional section components based on design structure

## Phase 4: Style System Implementation

1. **Extract Design Tokens**
   - Parse all colors, fonts, spacing from base.html
   - Identify animation patterns

2. **CSS Variables Setup** (Always implemented)

   ```css
   :root {
     --primary: extracted_color;
     --secondary: extracted_color;
     --background: extracted_color;
     --foreground: extracted_color;
     /* etc */
   }
   ```

3. **Tailwind Configuration**
   - Map CSS variables to Tailwind theme
   - Configure custom utilities
   - Set up dark mode class strategy

4. **Convert Styles**
   - Transform inline styles to Tailwind classes
   - Create component-specific styles where needed

## Phase 5: Internationalization Setup

Based on language requirements:

1. Update `i18n/routing.ts` with specified locales
2. Create `messages/[locale].json` for each language
3. Extract all text from base.html as translation keys
4. Implement useTranslations in all components

## Phase 6: Payload CMS Configuration

1. **Core Setup**
   - Copy Payload configuration from template-app
   - Update payload.config.ts with project name (which is $ARGUMENTS)

2. **Create Collections** (based on confirmed requirements)
   Each collection includes SEO fields:

   ```typescript
   seoTitle: { type: 'text' },
   seoDescription: { type: 'textarea' },
   seoImage: { type: 'upload', relationTo: 'media' },
   seoKeywords: { type: 'text' }
   ```

3. **Global Settings**
   - Site settings (name, logo, social links)
   - SEO defaults
   - Theme preferences

## Phase 7: Analytics & Integrations

Based on requirements:

1. **PostHog** (if selected)
   - Install @posthog/next
   - Add PostHogProvider to layout
   - Configure tracking events

2. **Google Analytics** (if selected)
   - Add gtag script
   - Configure page view tracking

3. **Contact Form** (if selected)
   - Create API route at app/api/contact/route.ts
   - Integrate with selected email service
   - Add form validation and rate limiting

## Phase 8: Monorepo Integration

1. **Verify Workspace Config**
   - Confirm app is in pnpm-workspace.yaml
   - Update turbo.json if needed

2. **Environment Setup**
   - Create comprehensive .env.example
   - Document all required variables

3. **Scripts & Commands**
   - Add project-specific scripts if needed
   - Ensure `pnpm dev` works from root

## Phase 9: Final Setup & Testing

1. **Generate Documentation**
   - Create detailed README.md
   - Include setup instructions
   - Document CMS structure
   - List available commands

2. **Build Verification**
   - Run `pnpm build --filter=$ARGUMENTS` to check for errors (Turborepo-specific)
   - Test all routes
   - Verify CMS access

3. **Provide Summary**

   ```
   ✅ Project created: apps/$ARGUMENTS

   Next steps:
   1. Configure .env with database and service credentials
   2. Run migrations: cd apps/$ARGUMENTS && pnpm payload migrate
   3. Start development: pnpm dev (from root)
   4. Access site: http://localhost:3000
   5. Access CMS: http://localhost:3000/admin
   ```
