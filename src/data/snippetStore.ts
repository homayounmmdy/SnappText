export type StoreCategory = "email" | "code" | "social" | "writing" | "productivity";

export type StoreSnippet = {
  id: string;
  title: string;
  description: string;
  category: StoreCategory;
  tags: string[];
};

export const CATEGORIES: {
  id: StoreCategory | "all";
  label: string;
  bg: string;
}[] = [
  { id: "all", label: "All", bg: "bg-white" },
  { id: "email", label: "Email", bg: "bg-blue-200" },
  { id: "code", label: "Code", bg: "bg-emerald-200" },
  { id: "social", label: "Social", bg: "bg-pink-200" },
  { id: "writing", label: "Writing", bg: "bg-purple-200" },
  { id: "productivity", label: "Productivity", bg: "bg-yellow-200" },
];

export const snippetStore: StoreSnippet[] = [
  /* ── Email ─────────────────────────────────────────────── */
  {
    id: "email-followup",
    title: "Follow-up email",
    description:
      "Hi {{name}},\n\nFollowing up on our conversation about {{topic}}. I wanted to share {{insight}} and see if you had any thoughts.\n\nBest,\n{{sender}}",
    category: "email",
    tags: ["follow-up", "sales"],
  },
  {
    id: "email-cold",
    title: "Cold outreach",
    description:
      "Hi {{name}},\n\nI came across {{company}} and noticed {{observation}}. I help teams like yours with {{solution}}.\n\nWorth a quick 15-min chat?\n\nBest,\n{{sender}}",
    category: "email",
    tags: ["outreach", "sales"],
  },
  {
    id: "email-meeting",
    title: "Meeting request",
    description:
      "Hi {{name}},\n\nDo you have 30 minutes this week to discuss {{topic}}? I'm flexible {{availability}}.\n\nThanks,\n{{sender}}",
    category: "email",
    tags: ["scheduling"],
  },
  {
    id: "email-thanks",
    title: "Thank you note",
    description:
      "Hi {{name}},\n\nThank you for {{reason}}. I really appreciated {{detail}}.\n\nWarmly,\n{{sender}}",
    category: "email",
    tags: ["thanks"],
  },

  /* ── Code ──────────────────────────────────────────────── */
  {
    id: "code-react",
    title: "React component",
    description:
      "export function {{ComponentName}}() {\n  return <div>Hello, {{name}}!</div>;\n}",
    category: "code",
    tags: ["react", "tsx"],
  },
  {
    id: "code-interface",
    title: "TypeScript interface",
    description:
      "export interface {{Name}} {\n  {{field}}: {{type}};\n}",
    category: "code",
    tags: ["typescript"],
  },
  {
    id: "code-fetch",
    title: "Fetch with error handling",
    description:
      "try {\n  const res = await fetch(\"{{url}}\");\n  if (!res.ok) throw new Error(\"{{errorMessage}}\");\n  return await res.json();\n} catch (err) {\n  console.error(\"{{context}}\", err);\n}",
    category: "code",
    tags: ["fetch", "async"],
  },
  {
    id: "code-commit",
    title: "Git commit template",
    description:
      "{{type}}({{scope}}): {{subject}}\n\n{{body}}\n\nRefs: {{reference}}",
    category: "code",
    tags: ["git"],
  },

  /* ── Social ────────────────────────────────────────────── */
  {
    id: "social-linkedin",
    title: "LinkedIn intro",
    description:
      "Hi {{name}}, I'm {{myName}} — {{role}} at {{company}}. I'm reaching out because {{reason}}.\n\nWould love to connect.",
    category: "social",
    tags: ["linkedin", "networking"],
  },
  {
    id: "social-twitter",
    title: "X / Twitter thread hook",
    description:
      "Most people think {{commonBelief}}.\n\nThey're wrong.\n\nHere's what actually works for {{topic}} 👇",
    category: "social",
    tags: ["twitter", "thread"],
  },
  {
    id: "social-instagram",
    title: "Instagram caption",
    description:
      "{{hook}} ✨\n\n{{body}}\n\n{{cta}}\n\n#{{hashtag}}",
    category: "social",
    tags: ["instagram", "caption"],
  },

  /* ── Writing ───────────────────────────────────────────── */
  {
    id: "writing-blog",
    title: "Blog post intro",
    description:
      "If you've ever wondered about {{topic}}, you're not alone. In this post I'll walk through {{angle}} and share {{takeaway}}.",
    category: "writing",
    tags: ["blog", "intro"],
  },
  {
    id: "writing-readme",
    title: "README badges row",
    description:
      "[![Build]({{buildUrl}})]({{buildUrl}})\n[![License]({{licenseUrl}})]({{licenseUrl}})\n[![Version]({{versionUrl}})]({{versionUrl}})",
    category: "writing",
    tags: ["markdown", "readme"],
  },
  {
    id: "writing-cover",
    title: "Cover letter paragraph",
    description:
      "Dear {{name}},\n\nI'm excited to apply for {{role}} at {{company}}. In my {{years}} years as {{title}}, I've {{achievement}} — which I believe maps directly to {{requirement}}.",
    category: "writing",
    tags: ["career"],
  },

  /* ── Productivity ──────────────────────────────────────── */
  {
    id: "productivity-standup",
    title: "Daily standup",
    description:
      "Yesterday: {{yesterday}}\nToday: {{today}}\nBlockers: {{blockers}}",
    category: "productivity",
    tags: ["standup", "agile"],
  },
  {
    id: "productivity-review",
    title: "Weekly review",
    description:
      "What went well: {{wins}}\nWhat didn't: {{challenges}}\nNext week: {{next}}",
    category: "productivity",
    tags: ["review", "reflection"],
  },
];