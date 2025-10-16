Render deployment notes

This project contains a Node/Express backend (root) and a Vite React frontend in `Frontend/`.

What I changed to make it deployment-ready on Render:

- root `package.json` scripts:
  - `start`: runs `node index.js` (used by Render's Web Service)
  - `build`: installs frontend deps and builds the Vite app (`cd Frontend && npm install && npm run build`)
  - `postinstall`: runs `npm run build` so Render will build the frontend during deploy

- `index.js` changes:
  - server listens on `process.env.PORT || 8080` so Render can assign the port
  - serves static frontend from `Frontend/dist` if that folder exists

How Render should be configured

1. Create a new Web Service on Render from this Git repo.
2. For Build Command use: npm install
   - The `postinstall` script will run automatically and build the frontend.
3. For Start Command use: npm start
4. Environment: add the required environment variables on Render:

  - `MONGODB_URI` — your MongoDB connection string (do NOT keep credentials in source control)
  - `FRONTEND_ORIGIN` — the URL where your frontend is served, for example `https://your-frontend-url.render.com`. This is used for server redirects to the frontend.

CI / Auto-deploy via GitHub Actions

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-to-render.yml` that triggers a Render deploy whenever you push to `main`.

Required GitHub repository secrets (Settings -> Secrets -> Actions):
 - `RENDER_API_KEY` — a Render API key with permissions to trigger deploys
 - `RENDER_SERVICE_ID` — the Render service id of your Web Service (findable in the Render dashboard)

How it works:
 - When you push to `main`, the workflow calls the Render API to create a new deploy for the specified service. The build and start commands configured on Render will run.

Set the secrets and push to `main` to automatically trigger a deploy.

Local development using .env

1. Copy `.env.example` to `.env` and fill your local values.
2. Install dependencies and start the app:

```bash
npm install
npm start
```

Render setup (step-by-step)

1. Create a new Web Service on Render and connect this repository.
2. Set Build Command: `npm install` and Start Command: `npm start`.
3. In the Render service settings -> Environment, add these variables:
  - `MONGODB_URI` — your MongoDB connection string
  - `FRONTEND_ORIGIN` — e.g. `https://your-frontend-url.onrender.com` or the correct frontend URL
4. Deploy the service and watch logs for build and runtime messages.

GitHub Actions manual deploy

1. In your GitHub repo, go to Settings -> Secrets -> Actions and add:
  - `RENDER_API_KEY` — API key from Render
  - `RENDER_SERVICE_ID` — your Render service id
2. You can trigger a deploy by pushing to `main` or via GitHub UI: Actions -> Deploy to Render -> Run workflow -> Select branch -> Run workflow.

If you want, I can help generate the correct Render API key and show where to find your service id in the Render dashboard.

Optional improvements (recommended):

- Move the MongoDB connection string to an environment variable and read it with `process.env.MONGODB_URI`.
- Replace any hardcoded localhost redirects (e.g., `http://localhost:3000/...`) with relative paths or absolute URLs based on runtime origin.
- Add a `.render` or `render.yaml` if you want to use Infrastructure as Code.

Example Render settings summary:

- Environment: Node
- Build Command: npm install
- Start Command: npm start
- Region: choose your nearest

Troubleshooting

- If frontend routes return 404 on refresh, ensure the frontend build produced `index.html` in `Frontend/dist` and `index.js` is serving static files from that folder.
- To debug, view deploy logs in Render — the `postinstall` build step will show frontend build output.
