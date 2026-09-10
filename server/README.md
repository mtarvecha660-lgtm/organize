# Resource Organizer Backend (Step 1)

Express + MongoDB backend for:
- Web links
- Uploaded documents (PDF, DOC, DOCX)
- GitHub repositories
- Video reels (YouTube, Instagram Reels, TikTok)

## Setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## API Endpoints

- `GET /health`
- `POST /api/sections`
- `GET /api/sections`
- `POST /api/resources` (multipart/form-data, optional `file`)
- `GET /api/resources`
- `GET /api/resources/:id`
- `PUT /api/resources/:id` (multipart/form-data, optional `file`)
- `DELETE /api/resources/:id`

## Notes

- Resource type auto-parsing is in `src/services/resourceParser.service.js`.
- File uploads are stored locally in `server/uploads`.
- Storage is structured so you can swap to S3 later.
