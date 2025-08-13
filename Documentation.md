# Dog Tracker Case Study

## Project Overview
Dog Tracker is a modern, real-time dashboard for monitoring a fleet of dogs equipped with GPS and activity sensors. The system features a visually appealing frontend, a robust backend, and real-time updates using WebSockets.

## Key Features
- **Live Map:** Real-time location tracking of all dogs on an interactive map.
- **KPI Cards:** At-a-glance metrics for fleet status, activity, and health.
- **Dog List:** Clickable list of all dogs with avatars and status indicators.
- **Alerts & Notifications:** Real-time alerts for low battery, offline status, and other events.
- **Analytics:** Visual charts for activity distribution, distance traveled, and speed analysis.
- **Responsive Design:** Works beautifully on desktop and mobile.
- **E2E Tested:** Playwright tests ensure reliability for all core features.

## Technical Stack
- **Frontend:** Next.js, React, Redux Toolkit, Tailwind CSS, Chart.js, React-Leaflet, Socket.IO-client
- **Backend:** Express.js, Socket.IO, Node.js
- **Testing:** Playwright (E2E)

## Architecture
- **Backend** simulates a fleet of dogs, broadcasting their status and location via Socket.IO.
- **Frontend** subscribes to real-time updates, renders the map, metrics, and analytics, and allows user interaction.
- **Environment Variables** are used for dynamic configuration (CORS, socket URL, etc).

## Implementation Highlights
- **Dynamic CORS and Socket URLs:** Both backend and frontend use environment variables for flexible deployment.
- **Redux State Management:** All dog data, selection, and history are managed in a single Redux store.
- **Custom Avatars & Visual Cues:** Each dog has a colored avatar and status badge for quick recognition.
- **Mobile-First Layout:** The map and all widgets are responsive and always visible on any device.
- **Testability:** All key UI elements have `data-testid` attributes for robust E2E testing.

## E2E Test Coverage
- Page loads without errors
- KPI cards and map render
<!-- - At least one marker shows up on the map
- The dog list is populated
- Clicking a marker or list item shows popup/details -->

## How to Run Locally
1. Clone the repo and install dependencies in both `backend` and `frontend`.
2. Set up `.env` files for both backend and frontend as needed.
3. Start the backend: `yarn start` (or `npm start`)
4. Start the frontend: `yarn dev` (or `npm run dev`)
5. Run E2E tests: `npx playwright test`

## Lessons Learned
- Real-time dashboards require careful state management and UI feedback.
- Environment-based configuration is essential for smooth deployment.
- Automated E2E tests catch regressions and ensure reliability.

---
