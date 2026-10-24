# ⚡ Snapp Text – Smart Snippet Manager with Dynamic Placeholders 📋

<img width="1856" height="1290" alt="Screenshot 2026-02-13 at 14-12-51 Snapp Text" src="https://github.com/user-attachments/assets/26c22c7d-fd5d-4943-b622-f4e4d1e6ce55" />


**A fast and minimal snippet manager for reusable text templates with intelligent variable support!** ✨

Tired of manually customizing the same templates over and over? Snapp Text lets you store text snippets with dynamic placeholders, fill them on the fly, and copy the personalized result instantly. Perfect for cover letters, outreach messages, email templates, and any repetitive text! ⏱️

## ✨ Key Features

- 🚀 **Instant Copy** : One-click copy for any saved snippet
- 🧠 **Dynamic Placeholders** : Add variables like `{{company}}`, `{{name}}`, and fill them via a smart popup before copying
- 🔍 **Search with URL Sync** : Find snippets by title, content or tag; the query is kept in the URL (`?q=…`) so filtered views are shareable
- 🧩 **Interactive Workspaces** : Every snippet has its own editable workspace to view or modify the final text before copying
- 🛍️ **Snippet Store** : A curated catalog of 16 ready-made snippets (email, code, social, writing, productivity). Add any to your library in one click
- 📊 **Admin Dashboard** : Live `localStorage` usage gauge, per-key breakdown, snippet analytics, top placeholders chart, and export / import / clear-all controls
- 📜 **Changelog Page** : A doodle-styled release timeline with auto-detected commit categories (feat / fix / style / refactor / perf / docs / chore / merge)
- 🎨 **Doodle Design System** : Taped cards, wobbly borders, hand-drawn shadows, sketch fonts. Every page (including the custom toasts) shares the same playful language
- 💾 **Local Storage Sync** : All data saved in your browser no account, no backend, complete privacy
- 🌗 **Custom Toast Notifications** : Doodle-styled toasts (built on `react-hot-toast`) with variant badges, progress bar, hover-pause and reduced-motion support

## 📸 Example Use Case

You save a snippet titled **"Cover Letter"** with this content:

```
Dear {{company}}, I'm excited to apply for the position at your company...
```

**When you click the snippet card:**

1. 📋 A popup asks for `{{company}}` value
2. ✏️ You fill in "Google"
3. ⚡ The final text is generated instantly
4. 📋 It's copied to your clipboard
5. 👁️ You can also review/edit the generated result in the workspace area

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| `/` | Library  your snippets, search, and workspace |
| `/store` | Snippet Store  ready-made templates, one-click add |
| `/changelog` | Release timeline, newest first |
| `/admin` | Storage analytics, library management, import/export |
| `/about` | Origin story, features, tech stack, quick links |

## 🛠️ Built With

- ⚛️ **React 18** : UI library
- ⚡ **Vite** : Lightning-fast build tool
- 🧑‍💻 **TypeScript** : Type safety
- 🎨 **Tailwind CSS v4** : Utility-first styling with `@theme` tokens
- 🧭 **React Router** : Client-side routing
- 🎯 **React Hook Form + Zod** : Form validation
- 🔔 **React Hot Toast** : Themed notifications
- 🧑‍🏫 **React Joyride** : Interactive user onboarding
- 🎭 **Lucide Icons** : Consistent icon set
- 💾 **Local Storage API** : Data persistence
- ✏️ **Custom Doodle Design System** : Playful, consistent UI components

## 🎯 Perfect For

- 📧 Email templates & outreach sequences
- 💼 Cover letters & job applications
- 💬 Customer support responses
- 📝 Code snippets with variables
- 🔁 Git commit templates, README badges, and other markdown boilerplate
- 📄 Any text you use regularly with slight variations!

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/homayounmmdy/SnappText

# Navigate to project
cd SnappText

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs entirely in your browser  no environment variables, no database, no auth.

## 🎮 How It Works

1. **Create** a new snippet with placeholders like `{{variable}}`
2. **Browse** your snippets with instant search (the query lives in the URL , copy it to share a filtered view)
3. **Click** any snippet , if it has placeholders, a form pops up
4. **Fill** the values and get the personalized text
5. **Copy** with one click or edit in the workspace
6. **Explore** the [Snippet Store](/store) for pre-built templates
7. **Check** the [Admin dashboard](/admin) for storage usage and analytics
8. **All data** stays in your browser , zero setup, zero tracking


## 🔒 Privacy

Snapp Text never sends data anywhere. Everything lives in `localStorage`, scoped to the site origin. Clear it any time from `/admin` → **Clear all snippets**, or export a JSON backup first via **Export JSON**.

## 🙌 Support & Feedback

If you find this helpful, please ⭐ **star the repo** and share your feedback! Contributions and ideas are always welcome , bug reports, feature requests and pull requests all get read.

---

<div align="center">Built with ❤️ for people who write repetitive text</div>
