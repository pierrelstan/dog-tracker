# Dog Tracker

A modern, real-time dashboard for monitoring a fleet of GPS-enabled dogs. Built with Next.js, React, Redux, Tailwind CSS, Chart.js, React-Leaflet, and Socket.IO.

## Features
- **Live Map:** Real-time location tracking of all dogs
- **KPI Cards:** Key metrics at a glance
- **Dog List:** Clickable, status-aware list of all dogs
- **Alerts & Notifications:** Real-time event feed
- **Analytics:** Activity, distance, and speed charts
- **Responsive Design:** Works on desktop and mobile
- **E2E Tested:** Playwright tests for reliability

## Quick Start

### 1. Clone the repository
```sh
git clone https://github.com/your-username/dog-tracker.git
cd dog-tracker
```

### 2. Install dependencies
```sh
cd backend && yarn install
cd ../frontend && yarn install
```

### 3. Set up environment variables
- Backend: `backend/.env` (see `Documentation.md` for details)
- Frontend: `frontend/.env` (set `NEXT_PUBLIC_SOCKET_URL` if needed)

### 4. Start the servers
```sh
cd backend && yarn start
cd ../frontend && yarn dev
```

### 5. Run E2E tests
```sh
cd frontend
npx playwright test
```

## Project Structure
```
backend/    # Express.js + Socket.IO server
frontend/   # Next.js app (React, Redux, Tailwind, etc)
```

## Documentation
See [Documentation.md](./Documentation.md) for a full case study, architecture, and implementation details.

## License
MIT
