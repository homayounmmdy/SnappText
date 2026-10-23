type Commit = {
  message: string;
  verb?: "committed" | "authored";
  when: string;
  verified?: boolean;
};

type Release = {
  label: string;
  note?: string;
  updatedAt?: string;
  commits: Commit[];
};

export const changelogData: Release[] = [
  {
    label: "Oct 23, 2026",
    note: "Latest",
    // ← bump this whenever you add a commit to this release
    updatedAt: "2026-10-23T20:00:00",
    commits: [
      { message: "feat: fill changelog page with data", when: "2 minutes ago" },
      { message: "docs: remove archive section from README", when: "6 minutes ago" },
      { message: "feat: create custom toast", when: "14 minutes ago" },
      { message: "fix: disable copy button when workspace is empty", when: "1 hour ago" },
      { message: "fix: show invalid value in title", when: "1 hour ago" },
    ],
  },
  {
    label: "Aug 29, 2026",
    commits: [
      { message: "docs: update README to archive the project", when: "on Aug 29, 2026" },
    ],
  },
  {
    label: "Feb 13, 2026",
    commits: [
      { message: "perf: optimize onboarding on mobile", when: "on Feb 13, 2026" },
      { message: "chore: downgrade React from 19.1.1 to 18.2.0", when: "on Feb 13, 2026" },
      { message: "fix: production bug", when: "on Feb 13, 2026" },
      { message: "docs: fix main image in README", verb: "authored", when: "on Feb 13, 2026", verified: true },
      { message: "merge: pull origin/master", when: "on Feb 13, 2026", verified: true },
      { message: "docs: update README.md", verb: "authored", when: "on Feb 13, 2026", verified: true },
    ],
  },
  {
    label: "Feb 12, 2026",
    commits: [
      { message: "feat: finish user journey", when: "on Feb 12, 2026" },
      { message: "style: update user journey design", when: "on Feb 12, 2026" },
      { message: "feat: implement first step of user journey", when: "on Feb 12, 2026" },
      { message: "refactor: add snippet button", when: "on Feb 12, 2026" },
    ],
  },
  {
    label: "Feb 11, 2026",
    commits: [
      { message: "style: refactor PlaceholderModal styles", when: "on Feb 11, 2026" },
      { message: "style: refactor SnippetForm styles", when: "on Feb 11, 2026" },
      { message: "style: update fonts in some places", when: "on Feb 11, 2026" },
      { message: "style: refactor SnippetCard styles", when: "on Feb 11, 2026" },
      { message: "perf: load fonts locally", when: "on Feb 11, 2026" },
    ],
  },
  {
    label: "Jan 30, 2026",
    commits: [
      { message: "refactor: extract NoSnippet component", when: "on Jan 30, 2026" },
    ],
  },
  {
    label: "Jan 26, 2026",
    commits: [
      { message: "merge: pull origin/master", when: "on Jan 26, 2026" },
    ],
  },
  {
    label: "Jan 23, 2026",
    commits: [
      { message: "feat: add outline variant for button", when: "on Jan 23, 2026" },
      { message: "feat: add more variants to button", when: "on Jan 23, 2026" },
      { message: "refactor: extract Badge component", when: "on Jan 23, 2026" },
      { message: "feat: add general Button component", when: "on Jan 23, 2026" },
      { message: "refactor: extract storage keys", when: "on Jan 23, 2026" },
    ],
  },
  {
    label: "Dec 18, 2025",
    commits: [
      { message: "chore: create LICENSE", verb: "authored", when: "on Dec 18, 2025", verified: true },
      { message: "docs: update README.md", verb: "authored", when: "on Dec 18, 2025", verified: true },
    ],
  },
  {
    label: "Dec 3, 2025",
    commits: [
      { message: "style: refactor badge colors", when: "on Dec 3, 2025" },
      { message: "refactor: extract Input into isolated component", when: "on Dec 3, 2025" },
    ],
  },
  {
    label: "Dec 2, 2025",
    commits: [
      { message: "refactor: extract Badge into isolated component", when: "on Dec 2, 2025" },
      { message: "style: redesign forms with Doodle design", when: "on Dec 2, 2025" },
      { message: "style: improve header and footer design", when: "on Dec 2, 2025" },
      { message: "style: redesign search bar and workspace with Doodle design", when: "on Dec 2, 2025" },
      { message: "style: redesign SnippetCard with Doodle design", when: "on Dec 2, 2025" },
      { message: "style: redesign SnippetForm with Doodle design", when: "on Dec 2, 2025" },
      { message: "style: redesign header and footer with Doodle design", when: "on Dec 2, 2025" },
      { message: "chore: update GitHub URL", when: "on Dec 2, 2025" },
    ],
  },
  {
    label: "Aug 12, 2025",
    commits: [
      { message: "feat: clear workspace on load when text exists", when: "on Aug 12, 2025" },
      { message: "chore: rename project", when: "on Aug 12, 2025" },
      { message: "docs: rename SnapText to Snapp Text", verb: "authored", when: "on Aug 12, 2025", verified: true },
      { message: "docs: update README.md", verb: "authored", when: "on Aug 12, 2025", verified: true },
      { message: "fix: card description and search bar border", when: "on Aug 12, 2025" },
      { message: "feat: add form validation for PlaceholderModal", when: "on Aug 12, 2025" },
      { message: "feat: add validation to create/edit snippet", when: "on Aug 12, 2025" },
      { message: "feat: add search bar", when: "on Aug 12, 2025" },
      { message: "feat: persist data to localStorage", when: "on Aug 12, 2025" },
      { message: "perf: optimize workspace for mobile", when: "on Aug 12, 2025" },
      { message: "feat: add workspace", when: "on Aug 12, 2025" },
      { message: "perf: optimize header on mobile", when: "on Aug 12, 2025" },
      { message: "style: blur form background", when: "on Aug 12, 2025" },
      { message: "feat: add footer", when: "on Aug 12, 2025" },
    ],
  },
  {
    label: "Aug 11, 2025",
    commits: [
      { message: "style: add cursor pointer to buttons", when: "on Aug 11, 2025" },
      { message: "feat: add basic title and favicon", when: "on Aug 11, 2025" },
      { message: "refactor: extract components from App", when: "on Aug 11, 2025" },
      { message: "refactor: extract SnippetCard", when: "on Aug 11, 2025" },
      { message: "refactor: extract Header from App", when: "on Aug 11, 2025" },
      { message: "fix: snippet error", when: "on Aug 11, 2025" },
      { message: "fix: copy to clipboard for text with variables", when: "on Aug 11, 2025" },
      { message: "refactor: extract types from App", when: "on Aug 11, 2025" },
      { message: "feat: handle notifications with react-hot-toast", when: "on Aug 11, 2025" },
      { message: "feat: add MVP with AI", when: "on Aug 11, 2025" },
      { message: "chore: add Tailwind CSS", when: "on Aug 11, 2025" },
      { message: "chore: initial project", when: "on Aug 11, 2025" },
    ],
  },
];