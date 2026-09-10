# Resource Organizer Frontend (Step 2)

Vite + React + Tailwind dashboard for the backend API.

## Setup

```bash
cd client
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

Backend expected URL: `http://localhost:5000`

## Features

- Create sections
- Add mixed resources (URL or file upload)
- Auto type support (backend-driven)
- Grouped dashboard columns by section
- Delete resources

## Notes

- API helpers are in `src/api/resourceApi.js`
- Main dashboard page is `src/pages/Dashboard.jsx`
- Componentized UI in `src/components/*`
