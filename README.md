# Personal Resource Organizer

A full-stack web app to save and organize mixed-media resources into custom sections.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **File Storage:** Local uploads (S3-ready architecture)

## Resource Types

1. Web Links
2. Uploaded Documents (PDF, DOC, DOCX)
3. GitHub Repositories
4. Video Reels (YouTube, Instagram Reels, TikTok)

---

## Project Structure

```bash
organize/
├── client/
├── server/
└── package.json
```

---

## Prerequisites

- Node.js 18+
- MongoDB local instance or cloud URI

---

## Setup

### 1) Configure environment

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update `server/.env` as needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resource_organizer
```

For production frontend, set API URL in `client/.env`:

```env
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

### 2) Install dependencies (both apps)

```bash
npm install
npm run install:all
```

### 3) Seed default sections

```bash
npm run seed
```

This adds (idempotently):
- Work Docs
- Learning Repos
- Entertainment

### 4) Run both backend + frontend

```bash
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## Deploy Frontend to GitHub Pages

GitHub Pages hosts only the `client/` frontend.
Backend must be deployed separately (Render/Railway/Fly/etc.).

1. Ensure Vite base is set to repo path (`/organize/`) ✅
2. Set production API URL:

```bash
cp client/.env.example client/.env
# edit client/.env and set VITE_API_BASE_URL
```

3. Deploy from `client/`:

```bash
cd client
npm install
npm run deploy
```

4. In GitHub repo settings:
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / root

Site URL (after publish):
- `https://mtarvecha660-lgtm.github.io/organize/`

---

## Useful Scripts

From root:

- `npm run dev` → run client + server together
- `npm run dev:server` → run backend only
- `npm run dev:client` → run frontend only
- `npm run install:all` → install server/client deps
- `npm run seed` → seed default sections

From `client/`:

- `npm run deploy` → deploy frontend to `gh-pages`

---

## API Quick Reference

- `GET /health`
- `GET /api/sections`
- `POST /api/sections`
- `GET /api/resources`
- `POST /api/resources` (multipart/form-data; optional `file`)
- `GET /api/resources/:id`
- `PUT /api/resources/:id` (multipart/form-data; optional `file`)
- `DELETE /api/resources/:id`

---

## Notes

- Resource type parsing is automatic on backend (`github.com` → repository, reel/video domains → video_reel, uploaded file → document).
- Local uploads are served via `/uploads`.
- Storage layer is designed for easy AWS S3 migration later.
