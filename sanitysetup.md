# 🎬 LED's & ABI Studio — Sanity CMS Complete Setup & Architecture Guide (`sanitysetup.md`)

Welcome to the definitive Sanity CMS setup and integration guide for **LED's & ABI Studio**. This document provides an exhaustive, step-by-step walkthrough for configuring, managing, and deploying the headless CMS backend that powers the dynamic content across the studio's web platform.

---

## 📑 Table of Contents

1. [Architecture Overview & Zero-Downtime Guarantee](#1-architecture-overview--zero-downtime-guarantee)
2. [Directory Structure & Key Files](#2-directory-structure--key-files)
3. [Prerequisites](#3-prerequisites)
4. [Step-by-Step Initial Setup](#4-step-by-step-initial-setup)
   - [Step 1: Create a Sanity Project & Dataset](#step-1-create-a-sanity-project--dataset)
   - [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
   - [Step 3: Install Sanity Studio Dependencies](#step-3-install-sanity-studio-dependencies)
   - [Step 4: Authenticate Sanity CLI](#step-4-authenticate-sanity-cli)
   - [Step 5: Configure CORS Origins (Mandatory)](#step-5-configure-cors-origins-mandatory)
   - [Step 6: Run Sanity Studio Locally](#step-6-run-sanity-studio-locally)
   - [Step 7: Launch & Verify the Frontend](#step-7-launch--verify-the-frontend)
5. [Deploying Sanity Studio to Cloud (Free 24/7 Hosting)](#5-deploying-sanity-studio-to-cloud-free-247-hosting)
6. [CMS Schema & Content Reference](#6-cms-schema--content-reference)
   - [1. Site Settings & Contacts (`siteSettings`)](#1-site-settings--contacts-sitesettings)
   - [2. Hero Section (`heroSection`)](#2-hero-section-herosection)
   - [3. Key Stats & Milestones (`statItem`)](#3-key-stats--milestones-statitem)
   - [4. Services (`service`)](#4-services-service)
   - [5. Portfolio & Gallery (`galleryItem`)](#5-portfolio--gallery-galleryitem)
   - [6. About Studio & Founder (`aboutStudio`)](#6-about-studio--founder-aboutstudio)
   - [7. Client Reviews & Testimonials (`testimonial`)](#7-client-reviews--testimonials-testimonial)
   - [8. Frequently Asked Questions (`faqItem`)](#8-frequently-asked-questions-faqitem)
   - [9. Final Call to Action (`finalCta`)](#9-final-call-to-action-finalcta)
7. [GROQ Queries & Vision Tool Inspection](#7-groq-queries--vision-tool-inspection)
8. [Image Optimization & Hotspot Cropping](#8-image-optimization--hotspot-cropping)
9. [Production Deployment Checklist](#9-production-deployment-checklist)
10. [Troubleshooting & Diagnostics](#10-troubleshooting--diagnostics)

---

## 1. Architecture Overview & Zero-Downtime Guarantee

This application uses a **hybrid headless CMS architecture with a permanent static failsafe**.

```
┌─────────────────────────────────────────────────────────────┐
│                    Sanity Studio CMS                        │
│   (Hosted on https://your-studio.sanity.studio or local)   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Edits & Publishes Content
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             Sanity Edge CDN (apicdn.sanity.io)              │
│       - Global low-latency delivery                         │
│       - Asset transformation and image pipeline             │
└──────────────────────────────┬──────────────────────────────┘
                               │ GROQ Query (useCdn: true)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Frontend React 19 Application               │
│                src/sanity/sanityService.ts                  │
├─────────────────────────────────────────────────────────────┤
│  1. Check if VITE_SANITY_PROJECT_ID is provided             │
│  2. Fetch ALL_CONTENT_QUERY with 1 single roundtrip         │
│  3. Defensive merge with static baseline (src/data/*.ts)    │
│  4. Safe URL builder for Sanity images + local assets       │
│  5. Zero-crash failsafe: network drops fallback to static   │
└─────────────────────────────────────────────────────────────┘
```

### Key Pillars of the Design:

1. **Zero-Configuration Out-of-the-Box**:
   Even without a Sanity account or `.env` file, the website runs at 100% fidelity using local TypeScript datasets (`src/data/`).
2. **Permanent Failsafe**:
   If Sanity's API experiences downtime, network interruption occurs, or a content editor deletes a field by mistake, the frontend automatically falls back to default static content without crashing or showing blank blocks.
3. **Instant Initial Paint**:
   The `SiteContentProvider` initializes state immediately with the static baseline so there is no layout shift or white loading screen. Once Sanity data resolves over the edge CDN, the UI re-renders with live CMS data.
4. **Isolated Dependency Workspaces**:
   Sanity Studio runs in its own sub-folder (`studio/`) with React 18, ensuring zero package version conflicts with the primary frontend (which runs on Vite + React 19).

---

## 2. Directory Structure & Key Files

```
ABI Studio/
├── .env.example                # Template for environment credentials
├── package.json                # Root frontend scripts & dependencies
├── src/
│   ├── App.tsx                 # Root component wrapped in SiteContentProvider
│   ├── components/             # UI components reading dynamic content
│   │   ├── Navbar.tsx          # Uses siteSettings
│   │   ├── Hero.tsx            # Uses hero
│   │   ├── Stats.tsx           # Uses stats
│   │   ├── Services.tsx        # Uses services
│   │   ├── FeaturedWork.tsx    # Uses featuredWorks
│   │   ├── AboutStudio.tsx     # Uses about
│   │   ├── ReviewsAndFAQ.tsx   # Uses testimonials & faqs
│   │   ├── FinalCTA.tsx        # Uses finalCta
│   │   └── Footer.tsx          # Uses siteSettings
│   ├── pages/
│   │   └── GalleryPage.tsx     # Uses galleryPageItems
│   ├── data/                   # Static fallback repository data
│   └── sanity/
│       ├── client.ts           # @sanity/client and urlForImage helper
│       ├── sanityService.ts    # Single unified GROQ query & fallback merge logic
│       ├── types.ts            # TypeScript interfaces for CMS schemas
│       └── useSiteContent.tsx  # React Context Provider & Hook
└── studio/                     # Standalone Sanity Studio v3 Project
    ├── package.json            # Studio scripts (sanity dev, sanity deploy)
    ├── sanity.cli.ts           # CLI configuration (projectId, dataset)
    ├── sanity.config.ts        # Studio configuration, title, plugins
    ├── tsconfig.json           # TypeScript configuration for Studio
    └── schemas/                # Sanity schema definitions (9 modules)
        ├── index.ts            # Export list for all schema types
        ├── siteSettings.ts     # Brand, contact, WhatsApp, social links
        ├── hero.ts             # Hero banner, typography, video showreel
        ├── statItem.ts         # Numeric milestones & metrics
        ├── service.ts          # Studio services, coverage, deliverables
        ├── galleryItem.ts      # Portfolio items (photo & film)
        ├── aboutStudio.ts      # Founder bio, experience cards, skills
        ├── testimonial.ts      # Client reviews & star ratings
        ├── faqItem.ts          # Frequently Asked Questions
        └── finalCta.ts         # Bottom conversion CTA banner
```

---

## 3. Prerequisites

Before setting up Sanity CMS, ensure you have:
- **Node.js**: `v18.0.0` or higher (Node 20+ LTS recommended).
- **npm**: `v9.0.0` or higher.
- **Sanity Account**: Free account at [sanity.io](https://www.sanity.io/) (Google, GitHub, or Email login).
- **Web Browser**: Modern Chrome, Edge, Safari, or Firefox.

---

## 4. Step-by-Step Initial Setup

### Step 1: Create a Sanity Project & Dataset

1. Visit [sanity.io/manage](https://www.sanity.io/manage) and sign in.
2. Click **Create Project** (or **+ New**).
3. Name your project: `ABI Studio` (or your preferred name).
4. Choose the **Free Plan** (includes generous free bandwidth, CDN requests, and assets).
5. Once created, locate your **Project ID** on the project dashboard (e.g. `a1b2c3d4`).
6. Verify your default dataset is named `production` under the **Datasets** tab.

---

### Step 2: Configure Environment Variables

Create a `.env` file in the root of the project:

```bash
# In the project root (j:\ABI Studio)
copy .env.example .env
```

Edit `.env` and fill in your Sanity Project ID:

```env
# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01
```

> **Note**: In `studio/sanity.cli.ts` and `studio/sanity.config.ts`, the studio will read either `SANITY_STUDIO_PROJECT_ID` or `VITE_SANITY_PROJECT_ID`. Setting it in root `.env` or creating a `studio/.env` ensures both the frontend and Studio point to the same project.

Optionally, create a `studio/.env` file inside the `studio/` directory:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

---

### Step 3: Install Sanity Studio Dependencies

The Studio has an isolated `package.json` to keep Sanity v3 and React 18 separate from the frontend's React 19.

Open your terminal and run:

```bash
cd studio
npm install
cd ..
```

---

### Step 4: Authenticate Sanity CLI

Log into your Sanity account through the terminal:

```bash
cd studio
npx sanity login
```

Choose your authentication provider (GitHub, Google, or Email) in the browser window that opens. Once verified, return to the terminal.

---

### Step 5: Configure CORS Origins (Mandatory)

Sanity's API blocks browser requests from unauthorized domains by default. You **must** whitelist your development and production URLs.

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and click on your project.
2. Click the **API** tab in the top navigation.
3. Scroll to **CORS Origins** and click **Add CORS Origin**.
4. Add the following entries one by one:

| Origin URL | Purpose | Allow Credentials? |
| :--- | :--- | :--- |
| `http://localhost:5173` | Local Vite Frontend | **Checked (Yes)** |
| `http://localhost:3333` | Local Sanity Studio | **Checked (Yes)** |
| `https://*.vercel.app` | Vercel Previews & Production | **Checked (Yes)** |
| `https://your-custom-domain.com` | Custom Domain (if applicable) | **Checked (Yes)** |

> ⚠️ **CRITICAL**: If you skip this step, the browser will block requests with a CORS error and the frontend will stay on static failsafe data.

---

### Step 6: Run Sanity Studio Locally

You can launch the Studio either from the root project or from the `studio/` folder:

#### From Root:
```bash
npm run studio
```

#### Or Directly in `studio/`:
```bash
cd studio
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) in your browser. You will see the **LED's & ABI Studio CMS** dashboard with all 9 modules ready for content entry.

---

### Step 7: Launch & Verify the Frontend

In a separate terminal window, launch the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

#### How to Verify Connection:
1. Open the browser Developer Tools (`F12` or `Ctrl+Shift+I`) and view the **Console** tab.
2. In Sanity Studio (`http://localhost:3333`), edit a field (e.g. change **Tagline** in **Site Settings & Contacts** or change **Hero Eyebrow**).
3. Click the green **Publish** button in the bottom right of the Studio.
4. Refresh `http://localhost:5173`. The newly published text should appear immediately.
5. If the connection fails, a helpful warning `[Sanity CMS] Using static failsafe data:` will log in the console with the exact error.

---

## 5. Deploying Sanity Studio to Cloud (Free 24/7 Hosting)

You can deploy the Studio so that the studio owner or content managers can access it anywhere without running a local server:

```bash
cd studio
npx sanity deploy
```

1. The CLI will prompt: `Studio hostname (<name>.sanity.studio):`
2. Enter a unique subdomain (e.g. `abi-studio-cms` or `leds-abi-studio`).
3. Sanity will build and deploy the Studio to `https://<your-name>.sanity.studio`.

### Adding Team Members / Content Editors:
1. Go to [sanity.io/manage](https://www.sanity.io/manage) > Select your project.
2. Navigate to **Members** > **Invite Member**.
3. Enter the client's email address and assign them the **Editor** role.
4. They will receive an invitation email and can log in at `https://<your-name>.sanity.studio`.

---

## 6. CMS Schema & Content Reference

The Studio defines 9 schemas in `studio/schemas/`. Below is the complete field specification for each document type:

---

### 1. Site Settings & Contacts (`siteSettings`)
- **Document Type**: Single document (create one document).
- **Where Displayed**: Navbar, Footer, and Contact Modals.
- **Fields**:
  - `studioName` (`string`): Studio brand name (Default: `LED's & ABI Studio`).
  - `tagline` (`text`): Brand summary used in footer & SEO.
  - `phone` (`string`): Display phone number (e.g. `+91 94404 27791`).
  - `whatsapp` (`string`): Digits-only WhatsApp number for direct click-to-chat (`919440427791`).
  - `email` (`string`): Primary contact email (`contact@abistudio.com`).
  - `address` (`string`): Physical studio location.
  - `instagramUrl` (`url`): Instagram profile link.
  - `youtubeUrl` (`url`): YouTube channel link.
  - `facebookUrl` (`url`): Facebook page link.
  - `linkedinUrl` (`url`): LinkedIn profile link.

---

### 2. Hero Section (`heroSection`)
- **Document Type**: Single document (create one document).
- **Where Displayed**: Homepage primary hero banner.
- **Fields**:
  - `eyebrow` (`string`): Top badge (e.g. `- CAPTURING YOUR PRECIOUS MOMENTS -`).
  - `titlePrefix` (`string`): White text before gradient brand (e.g. `LED's & `).
  - `titleHighlight` (`string`): Gradient highlighted brand name (e.g. `ABI Studio`).
  - `subtitle` (`string`): Tagline row under headline.
  - `viewWorkLabel` (`string`): Primary CTA button label (`View Our Work`).
  - `showreelLabel` (`string`): Secondary button label (`Watch Showreel`).
  - `showreelVideoUrl` (`url`): YouTube/Vimeo/MP4 video URL opened in the showreel modal.
  - `backgroundImage` (`image`): High-resolution hero background with focal point hotspot cropping.

---

### 3. Key Stats & Milestones (`statItem`)
- **Document Type**: Multiple documents.
- **Where Displayed**: "Trust & Milestones" section below the Hero.
- **Fields**:
  - `value` (`string`, *required*): Metric figure (e.g. `500+`, `30+`, `100%`, `4.9/5`).
  - `label` (`string`, *required*): Label description (e.g. `Weddings Captured`).
  - `iconName` (`string`): Dropdown with options `Heart`, `Users`, `Clock`, `Star`.
  - `description` (`string`): Optional subtitle explanation.
  - `order` (`number`): Ordering position (0, 1, 2, 3).

---

### 4. Services (`service`)
- **Document Type**: Multiple documents.
- **Where Displayed**: "What We Offer" interactive service cards & detail modals.
- **Fields**:
  - `number` (`string`): Two-digit service code (`01`, `02`, `03`, etc.).
  - `title` (`string`, *required*): Service name (e.g. `LED Stage Walls & Displays`).
  - `category` (`string`): Category pill (e.g. `LED Displays`, `Photography`).
  - `tagline` (`string`): Catchy highlight sentence on card.
  - `description` (`text`): Comprehensive service description.
  - `coverImage` (`image`): Service cover card graphic.
  - `iconName` (`string`): Lucide icon selector (`Tv`, `Camera`, `Video`, `BookOpen`, `Heart`, `PartyPopper`).
  - `features` (`array of strings`): Quick tags shown on the card face.
  - `whatIsCovered` (`array of objects`): Modal breakdown items (`title`, `description`).
  - `deliverables` (`array of strings`): Deliverables list in the detail modal.
  - `durationOrScope` (`string`): E.g. `Full Day & Multi-Day Event Coverage`.
  - `teamSize` (`string`): E.g. `2 Senior Photographers + 1 Drone Pilot`.
  - `order` (`number`): Display order.

---

### 5. Portfolio & Gallery (`galleryItem`)
- **Document Type**: Multiple documents.
- **Where Displayed**: Homepage "Our Work Speaks" carousel and full `/gallery` page.
- **Fields**:
  - `title` (`string`, *required*): Project or event title.
  - `subtitle` (`string`): Subtitle or family event details.
  - `category` (`string`, *required*): Filter category (`Weddings`, `Pre-Wedding`, `Events`, `LED Setups`, `Albums`, `Films`).
  - `type` (`string`): Media classification (`photo` or `film`).
  - `image` (`image`, *required*): High-resolution photo or video thumbnail.
  - `videoUrl` (`url`): Video stream URL for wedding films.
  - `client` (`string`): Client or family name.
  - `year` (`string`): Event year (`2026`).
  - `resolution` (`string`): Quality badge (`4K UHD Cinema`, `Full HD Photography`).
  - `description` (`text`): Story of the shoot.
  - `specs` (`array of strings`): Bullets (e.g. `Full Day Coverage`, `Drone Aerial Shots`).
  - `showOnHomepage` (`boolean`): Toggle ON to feature this item on the homepage carousel.
  - `order` (`number`): Display order.

---

### 6. About Studio & Founder (`aboutStudio`)
- **Document Type**: Single document (create one document).
- **Where Displayed**: "Behind the Lens" About Studio section.
- **Fields**:
  - `founderName` (`string`, *required*): E.g. `A. Satish Chand`.
  - `founderTitle` (`string`): E.g. `Master Photographer & Founder`.
  - `yearsExperience` (`string`): E.g. `30+ Years Experience`.
  - `weddingsCount` (`string`): E.g. `500+ Weddings`.
  - `founderBio` (`text`): Narrative bio and philosophy.
  - `founderPhoto` (`image`): Portrait photo of the founder.
  - `experienceCards` (`array of objects`): 4 pillar highlight cards:
    - `icon`: Selector (`Award`, `Heart`, `Tv`, `Camera`).
    - `highlight`: Badge/Number.
    - `title`: Card title.
    - `desc`: Short explanation.
  - `skillPills` (`array of strings`): Specialty pills (e.g. `Candid Photography`, `LED Stage Coordination`).

---

### 7. Client Reviews & Testimonials (`testimonial`)
- **Document Type**: Multiple documents.
- **Where Displayed**: Homepage client stories review cards.
- **Fields**:
  - `name` (`string`, *required*): Client / couple name.
  - `role` (`string`): E.g. `Wedding Couple`, `Event Organizer`.
  - `event` (`string`): E.g. `Traditional Telugu Wedding & LED Stage`.
  - `quote` (`text`, *required*): Full testimonial text.
  - `rating` (`number`): Star rating between `1` and `5` (Default: `5`).
  - `order` (`number`): Display order.

---

### 8. Frequently Asked Questions (`faqItem`)
- **Document Type**: Multiple documents.
- **Where Displayed**: FAQ accordion section on the homepage.
- **Fields**:
  - `question` (`string`, *required*): FAQ question title.
  - `answer` (`text`, *required*): Accordion answer content.
  - `category` (`string`, *required*): Filter pill (`photography`, `led`, `albums`, `booking`).
  - `order` (`number`): Display order.

---

### 9. Final Call to Action (`finalCta`)
- **Document Type**: Single document (create one document).
- **Where Displayed**: Bottom banner before the footer.
- **Fields**:
  - `eyebrow` (`string`): Top badge (e.g. `LET'S CREATE TOGETHER`).
  - `headline` (`string`): Headline first half (e.g. `Ready to Capture Your `).
  - `headlineHighlight` (`string`): Gradient word (e.g. `Special Day?`).
  - `description` (`text`): Supporting invitation paragraph.
  - `primaryButtonLabel` (`string`): Button text (`Get a Quote`).
  - `phone` (`string`): Direct contact phone number.
  - `bulletPoints` (`array of strings`): Assurance bullets (e.g. `Flexible Packages`, `Same-Day Teasers`).

---

## 7. GROQ Queries & Vision Tool Inspection

The frontend fetches all data in a single performant network request via GROQ in [src/sanity/sanityService.ts](file:///j:/ABI%20Studio/src/sanity/sanityService.ts).

### The Unified Content Query:
```groq
{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "heroSection"][0],
  "stats": *[_type == "statItem"] | order(order asc, _createdAt asc),
  "services": *[_type == "service"] | order(order asc, _createdAt asc),
  "galleryItems": *[_type == "galleryItem"] | order(order asc, _createdAt asc),
  "about": *[_type == "aboutStudio"][0],
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc),
  "faqs": *[_type == "faqItem"] | order(order asc, _createdAt asc),
  "finalCta": *[_type == "finalCta"][0]
}
```

### Inspecting Data with the Vision Tool:
1. Open Sanity Studio at `http://localhost:3333` (or your deployed `.sanity.studio` URL).
2. Click the **Vision** tab in the top navigation bar.
3. Paste the query above into the Query panel.
4. Click **Fetch** (`Ctrl+Enter` or `Cmd+Enter`).
5. Review the live JSON response returned by Sanity's API.

---

## 8. Image Optimization & Hotspot Cropping

All image fields in the schemas have `options: { hotspot: true }` enabled.

### Why Hotspot Matters:
- When uploading photos in Sanity Studio, click on the uploaded image to open the **Hotspot & Crop** tool.
- Drag the circular target onto the most important subject (e.g. the bride and groom's faces, the founder's eye level, or the center of the LED wall).
- When displayed across responsive screen sizes (mobile portrait vs desktop widescreen), Sanity will dynamically crop around the focal point so key details are never cut off.

### Safe URL Generation in Frontend:
The `urlForImage()` utility in [src/sanity/client.ts](file:///j:/ABI%20Studio/src/sanity/client.ts) ensures:
- Automatic conversion to modern WebP format (`.auto('format')`).
- Maximum bounds fitting (`.fit('max')`).
- Seamless fallback to local static assets (`/assets/...`) if no image is uploaded.

---

## 9. Production Deployment Checklist

When deploying the website to production (e.g. Vercel, Netlify, or AWS):

- [ ] **Environment Variables**: Add the following variables to your hosting dashboard:
  - `VITE_SANITY_PROJECT_ID`: Your Sanity project ID.
  - `VITE_SANITY_DATASET`: `production`.
  - `VITE_SANITY_API_VERSION`: `2024-03-01`.
- [ ] **CORS Configuration**: In [sanity.io/manage](https://www.sanity.io/manage), add your production domain (e.g. `https://abi-studio.com` and `https://*.vercel.app`) to **API > CORS Origins** with **Allow Credentials** checked.
- [ ] **Sanity Studio Deployed**: Deploy the Studio via `cd studio && npx sanity deploy` so editors can access it 24/7.
- [ ] **Frontend Build Verification**: Run `npm run build` locally to ensure zero TypeScript errors or broken imports before pushing to main.

---

## 10. Troubleshooting & Diagnostics

### Issue 1: "CORS origin blocked" or "Failed to fetch" in Browser Console
- **Cause**: The domain requesting data has not been whitelisted in Sanity's CORS origins.
- **Solution**: Go to [sanity.io/manage](https://www.sanity.io/manage) > **API** > **CORS Origins** > **Add CORS Origin**. Add `http://localhost:5173` for local development or your production URL, and ensure **Allow credentials** is checked.

### Issue 2: Website displays static fallback data instead of my Sanity edits
- **Cause**: Either `VITE_SANITY_PROJECT_ID` is missing in `.env`, the document has not been **published** (saved as draft only), or the query returned empty arrays.
- **Solution**:
  1. Check `.env` in the root folder and restart the Vite dev server (`npm run dev`).
  2. In Sanity Studio, ensure you clicked the green **Publish** button (bottom right of the document) and that the document has no validation errors.
  3. Verify via the **Vision** tool in Sanity Studio that your query returns data.

### Issue 3: `npm run studio` fails with module or React conflict
- **Cause**: Running `npm install` inside root instead of `studio/`.
- **Solution**:
  1. Open terminal and run `cd studio && npm install`.
  2. Studio dependencies are completely separate from the root frontend.
  3. Use `npm run studio` from the root or `npm run dev` inside `studio/`.

### Issue 4: Image displays broken or blank
- **Cause**: Image asset was deleted or schema field was saved without an asset.
- **Solution**: The `urlForImage` utility in `src/sanity/client.ts` catches undefined/null images and falls back to default assets without crashing. To show your custom image, upload a valid `.jpg`, `.png`, or `.webp` file in Sanity Studio and click **Publish**.

---

*Documentation prepared for **LED's & ABI Studio**.*
