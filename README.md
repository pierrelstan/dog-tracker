
# Dog Tracker

A blazing-fast, real-time dashboard for monitoring a fleet of GPS-enabled dogs. Built with Next.js, React, Redux Toolkit, Tailwind CSS, Chart.js, React-Leaflet, and Socket.IO.

---

## 🚀 Features

- **Live Map:** Real-time location tracking of all dogs
- **KPI Cards:** Key metrics at a glance
- **Dog List:** Clickable, status-aware list of all dogs
- **Alerts & Notifications:** Real-time event feed
- **Analytics:** Activity, distance, and speed charts
- **Responsive:** Mobile-first, works everywhere
- **E2E Tested:** Playwright for robust reliability

---

## ⚡️ Quickstart

```sh
git clone https://github.com/your-username/dog-tracker.git
cd dog-tracker/frontend
yarn install
cp env.example .env   # Set NEXT_PUBLIC_SOCKET_URL as needed
yarn dev              # Start the app locally
```

- Run tests: `npx playwright test`

---

## 🗂️ Project Structure

```
app/         # Next.js app directory (routing, layout)
components/  # Reusable React components
lib/         # Utilities (fake data, geo helpers, selectors, socket)
store/       # Redux slices and store setup
public/      # Static assets (SVGs, icons)
e2e/         # Playwright end-to-end tests
```

---

## 🛠️ Tech Stack

- Next.js 15
- React 19
- Redux Toolkit
- Tailwind CSS 4
- Chart.js & react-chartjs-2
- React-Leaflet & Leaflet
- Socket.IO-client
- Playwright (E2E)

---

## 🧑‍💻 Contributing

- Fork & branch from `main`
- Follow code style (ESLint, Prettier)
- Keep PRs focused and well-described
- All core UI has `data-testid` for robust E2E tests

---

## 📄 License

MIT

---

**Pro tip:** For a full-stack or production deployment, connect your own Socket.IO backend and configure `NEXT_PUBLIC_SOCKET_URL` in `.env`.

