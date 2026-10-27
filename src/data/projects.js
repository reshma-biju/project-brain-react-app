export const projects = [
  {
    id: "p1",
    name: "React Portfolio",
    description: "Personal portfolio with modern design",
    category: "Web App",
    pinned: true,
    createdAt: "2026-10-01",
    updatedAt: "2026-10-12",
    items: [
      {
        id: "i1",
        title: "Add dark mode",
        type: "idea",
        status: "captured",
        details: "Theme switcher for light and dark mode",
        createdAt: "2026-10-12",
        updatedAt: "2026-10-12",
      },
      {
        id: "i2",
        title: "Create project cards",
        type: "feature",
        status: "in-progress",
        details: "",
        createdAt: "2026-10-10",
        updatedAt: "2026-10-11",
      },
      {
        id: "i3",
        title: "Set up routing",
        type: "feature",
        status: "captured",
        details: "",
        createdAt: "2026-10-08",
        updatedAt: "2026-10-09",
      },
    ],
   notes: [
  {
    id: "n1",
    title: "React Router setup",
    body: `Learn React Router first. Use the Vite setup for the project.

- Understand nested routes
- Set up basic routing structure
- Create separate pages for Home, Projects and About
- Use protected routes later

Useful links:
React Router docs: https://reactrouter.com
Tutorial video: https://youtube.com`,
    createdAt: "2026-10-08T09:30:00.000Z",
    updatedAt: "2026-10-08T09:30:00.000Z",
  },
  {
    id: "n2",
    title: "Design inspiration",
    body: `Collect UI references for the hero section.

Look at dark themes with a warm accent color. Glass cards with a soft glow look good, and thin neural-style wires add some personality without being busy.`,
    createdAt: "2026-10-05T14:10:00.000Z",
    updatedAt: "2026-10-05T14:10:00.000Z",
  },
  {
    id: "n3",
    title: "Deployment notes",
    body: `Steps to deploy on Vercel:

1. Push the project to GitHub
2. Import the repo in Vercel
3. Build command: npm run build
4. Output directory: dist

Remember to add a rewrite so that refreshing /projects doesn't give a 404.`,
    createdAt: "2026-10-01T18:45:00.000Z",
    updatedAt: "2026-10-01T18:45:00.000Z",
  },
],
  },
  {
    id: "p2",
    name: "AI Study Planner",
    description: "Weekly learning roadmap with task tracking",
    category: "AI / Chatbot",
    pinned: false,
    createdAt: "2026-10-05",
    updatedAt: "2026-10-13",
    items: [
      {
        id: "i4",
        title: "Build weekly view",
        type: "feature",
        status: "in-progress",
        details: "Calendar-style schedule for daily goals",
        createdAt: "2026-10-12",
        updatedAt: "2026-10-13",
      },
      {
        id: "i5",
        title: "Add reminders",
        type: "idea",
        status: "backlog",
        details: "Send email reminders before study sessions",
        createdAt: "2026-10-11",
        updatedAt: "2026-10-11",
      },
      {
        id: "i6",
        title: "Create dashboard widgets",
        type: "feature",
        status: "done",
        details: "Progress cards and streak counters",
        createdAt: "2026-10-08",
        updatedAt: "2026-10-10",
      },
    ],
    notes: [
      {
        id: "n2",
        text: "Focus on mobile-first layout",
        createdAt: "2026-10-09",
      },
      {
        id: "n3",
        text: "Use lightweight animations for progress updates",
        createdAt: "2026-10-12",
      },
    ],
  },
];