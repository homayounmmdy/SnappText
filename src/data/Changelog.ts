type Commit = {
  message: string;
  verb?: "committed" | "authored";
  when: string; 
  verified?: boolean;
};

type Release = {
  label: string;  
  note?: string;   
  commits: Commit[];
};

export const changelogData: Release[] = [
  {
    label: "Oct 23, 2026",
    note: "Today",
    commits: [
      { message: "create : custom toast", when: "14 minutes ago" },
      { message: "disable copy button when there is not text in workspace", when: "1 hour ago" },
      { message: "fix : showing invalid value in title", when: "1 hour ago" },
    ],
  },
  {
    label: "Aug 29, 2026",
    commits: [
      { message: "update: Readme for make project archive", when: "on Aug 29, 2026" },
    ],
  },
  {
    label: "Feb 13, 2026",
    commits: [
      { message: "optimize : onboarding on mobile", when: "on Feb 13, 2026" },
      { message: "downgrade react from 19.1.1 to 18.2.0", when: "on Feb 13, 2026" },
      { message: "fix : production bug", when: "on Feb 13, 2026" },
      { message: "fix : main image in readme", verb: "authored", when: "on Feb 13, 2026", verified: true },
      { message: "Merge branch 'master' of https://github.com/homayunmmdy/My-Docs", when: "on Feb 13, 2026", verified: true },
      { message: "Update README.md", verb: "authored", when: "on Feb 13, 2026", verified: true },
    ],
  },
  {
    label: "Feb 12, 2026",
    commits: [
      { message: "Finish : user Journey", when: "on Feb 12, 2026" },
      { message: "update : User Journey design", when: "on Feb 12, 2026" },
      { message: "implement : the first step of the user joinery", when: "on Feb 12, 2026" },
      { message: "refactor : Add Snippet Button", when: "on Feb 12, 2026" },
    ],
  },
  {
    label: "Feb 11, 2026",
    commits: [
      { message: "refactor : PlaceholderModal styles", when: "on Feb 11, 2026" },
      { message: "refactor : SnippetForm styles", when: "on Feb 11, 2026" },
      { message: "update : fonts in some places", when: "on Feb 11, 2026" },
      { message: "refactor : SnippetCard Styles", when: "on Feb 11, 2026" },
      { message: "load fonts locally", when: "on Feb 11, 2026" },
    ],
  },
  {
    label: "Jan 30, 2026",
    commits: [{ message: "refactor : NoSnippet", when: "on Jan 30, 2026" }],
  },
  {
    label: "Jan 26, 2026",
    commits: [
      { message: "Merge branch 'master' of https://github.com/homayunmmdy/My-Docs", when: "on Jan 26, 2026" },
    ],
  },
  {
    label: "Jan 23, 2026",
    commits: [
      { message: "implement : outline for button", when: "on Jan 23, 2026" },
      { message: "add : more variant into button", when: "on Jan 23, 2026" },
      { message: "refactor: badge", when: "on Jan 23, 2026" },
      { message: "implement: general button", when: "on Jan 23, 2026" },
      { message: "refactor: storage keys", when: "on Jan 23, 2026" },
    ],
  },
  {
    label: "Dec 18, 2025",
    commits: [
      { message: "Create LICENSE", verb: "authored", when: "on Dec 18, 2025", verified: true },
      { message: "Update README.md", verb: "authored", when: "on Dec 18, 2025", verified: true },
    ],
  },
  {
    label: "Dec 3, 2025",
    commits: [
      { message: "refactor : Badge Colors", when: "on Dec 3, 2025" },
      { message: "refactor : input and separate into isolate component", when: "on Dec 3, 2025" },
    ],
  },
  {
    label: "Dec 2, 2025",
    commits: [
      { message: "refactor : badge and separate into isolate component", when: "on Dec 2, 2025" },
      { message: "redesign : forms into Doodle design", when: "on Dec 2, 2025" },
      { message: "improve : the header adn footer design", when: "on Dec 2, 2025" },
      { message: "redesign : search bar and workspace into Doodle design", when: "on Dec 2, 2025" },
      { message: "redesign : Snipped Card into Doodle design", when: "on Dec 2, 2025" },
      { message: "redesign: Snippet Form with Doodle design", when: "on Dec 2, 2025" },
      { message: "redesign : header and footer with Doodle design", when: "on Dec 2, 2025" },
      { message: "update : my github url", when: "on Dec 2, 2025" },
    ],
  },
  {
    label: "Aug 12, 2025",
    commits: [
      { message: "load : clear if there is a text in workspace", when: "on Aug 12, 2025" },
      { message: "rename project", when: "on Aug 12, 2025" },
      { message: "Update SnapText to Snapp Text", verb: "authored", when: "on Aug 12, 2025", verified: true },
      { message: "Update README.md", verb: "authored", when: "on Aug 12, 2025", verified: true },
      { message: "fix : card description and searchBar border", when: "on Aug 12, 2025" },
      { message: "add : form validation for placeholderModel", when: "on Aug 12, 2025" },
      { message: "add : validation to Create or edit snippet", when: "on Aug 12, 2025" },
      { message: "add : searchBar", when: "on Aug 12, 2025" },
      { message: "save and load the data from localstorage", when: "on Aug 12, 2025" },
      { message: "optimize workspace for mobile", when: "on Aug 12, 2025" },
      { message: "add : workspace", when: "on Aug 12, 2025" },
      { message: "optimize header in the mobile", when: "on Aug 12, 2025" },
      { message: "change background of form to blur", when: "on Aug 12, 2025" },
      { message: "Add : Footer", when: "on Aug 12, 2025" },
    ],
  },
  {
    label: "Aug 11, 2025",
    commits: [
      { message: "add : cursor pointer to buttons", when: "on Aug 11, 2025" },
      { message: "add : basic title and favicon", when: "on Aug 11, 2025" },
      { message: "separate : all components from app", when: "on Aug 11, 2025" },
      { message: "separate : SnippedCard", when: "on Aug 11, 2025" },
      { message: "septate : Header From App", when: "on Aug 11, 2025" },
      { message: "fix : Snippet error", when: "on Aug 11, 2025" },
      { message: "fix : copy to clipboard for text with variables", when: "on Aug 11, 2025" },
      { message: "seprate types from App", when: "on Aug 11, 2025" },
      { message: "handle notification with react-toast", when: "on Aug 11, 2025" },
      { message: "add : add MVP with AI", when: "on Aug 11, 2025" },
      { message: "add : tailwind css", when: "on Aug 11, 2025" },
      { message: "inital project", when: "on Aug 11, 2025" },
    ],
  },
];