# 🎬 LED's & ABI Studio — Sanity CMS Backend & Dynamic Setup Guide

This project features a **hybrid CMS architecture with a zero-downtime, permanent static failsafe**.

---

## 🛡️ How the Permanent Failsafe Works

1. **Zero Configuration Needed to Run**: Even with **no Sanity account** or missing `.env` variables, the website functions 100% out-of-the-box using the high-performance static repository data (`src/data/*.ts`).
2. **No Blank Screens or Crashes**: If Sanity is unreachable, network drops, or the owner creates a section but leaves it empty, the frontend seamlessly falls back to the default content.
3. **Live Upgrades**: Whenever the owner publishes updates in Sanity Studio, the website automatically loads and displays the dynamic content via Sanity's high-speed global CDN (`useCdn: true`).

---

## 🚀 Quick Setup: Connecting Sanity in 4 Steps

### Step 1: Create a Free Sanity Project
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage) and sign in with GitHub, Google, or Email.
2. Click **Create Project** and name it (e.g. `ABI Studio`).
3. Note your **Project ID** (e.g. `a1b2c3d4`) and default dataset name (`production`).

### Step 2: Configure Environment Variables
1. In the project root, create a file named `.env` (you can copy from `.env.example`):
   ```env
   VITE_SANITY_PROJECT_ID=your_actual_project_id_here
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-03-01
   ```

### Step 3: Allow CORS in Sanity Dashboard
1. In your Sanity Project Dashboard at [sanity.io/manage](https://www.sanity.io/manage):
   - Go to **API** > **CORS Origins** > **Add CORS Origin**.
   - Add:
     - `http://localhost:5173` (for local development)
     - `https://your-domain.vercel.app` (your live website domain)
   - Check **Allow credentials: Yes**.

### Step 4: Launch Sanity Studio
You can run the Studio locally or deploy it to the cloud so the owner can edit from any browser.

#### Running Studio Locally:
```bash
# In project root:
cd studio
npm install
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) in your browser.

#### Deploying Studio to Cloud (Free Hosted URL for Owner):
```bash
cd studio
npx sanity deploy
```
Follow the prompt to choose a studio hostname (e.g. `abistudio.sanity.studio`). Once deployed, the studio is live 24/7 at `https://abistudio.sanity.studio` without needing any computer running!

---

## 📝 Sections the Owner Can Edit in Sanity Studio

| Section in Studio | Where It Appears on the Website | Editable Fields |
| :--- | :--- | :--- |
| **Site Settings & Contacts** | Navbar & Footer | Studio Brand Name, Tagline, Phone, WhatsApp Number, Email, Address, Instagram/YouTube/Facebook links |
| **Hero Section** | Homepage Top Banner | Eyebrow Badge, Main Title, Gradient Highlight Text, Subtitle, Button Labels, Showreel Video URL (YouTube/Vimeo), Background Photo |
| **Key Stats & Milestones** | Trust & Why Choose Us | Value (500+, 30+), Label, Icon (Heart, Users, Clock, Star), Subtitle description, Order |
| **Services** | "What We Offer" Carousel | Service Number, Title, Tagline, Description, Cover Image, Category, Icon, Deliverables, Team Size, Modal Details |
| **Portfolio & Gallery** | Homepage Carousel & `/gallery` Page | Title, Subtitle, Category (Weddings, Pre-Wedding, Events, LED Setups, Albums, Films), Media Type (Photo/Film), Image Upload, Video URL, Client Name, Specs, Homepage Feature Toggle |
| **About Studio & Founder** | "Behind the Lens" Section | Founder Name, Title, Bio Story, Founder Portrait Photo, Years Experience Badge, 4 Pillar Cards, Skill Pills |
| **Client Reviews** | Client Stories Marquee | Client Name, Role (Wedding Couple), Event, Testimonial Quote, 1-5 Star Rating |
| **Frequently Asked Questions** | FAQ Accordion | Question, Answer, Category (Photography, LED Screens, Albums, Booking) |
| **Final Call to Action** | Bottom CTA Banner | Eyebrow, Headline, Description, Button Label, Direct Call Phone, Guarantee Badges |

---

## 🛠️ Verification & Build Commands

- **Run Website Locally**:
  ```bash
  npm run dev
  ```
- **Build Website for Production**:
  ```bash
  npm run build
  ```
- **Run Sanity Studio Admin**:
  ```bash
  npm run studio
  ```
