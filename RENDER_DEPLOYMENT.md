# Render Deployment Guide

This project is configured to deploy on Render as a single web service that serves both the backend API and frontend.

## Prerequisites

1. A MongoDB database (MongoDB Atlas or Render MongoDB)
2. A Render account
3. GitHub repository with this code

## Deployment Steps

### 1. Prepare MongoDB

1. Create a MongoDB database (MongoDB Atlas recommended for free tier)
2. Get your MongoDB connection string (MONGODB_URI)
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

### 2. Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file automatically
5. Configure the service:
   - **Name**: inspirex-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Set Environment Variables

In the Render dashboard, go to your service → Environment and add:

- **MONGODB_URI**: Your MongoDB connection string
- **NODE_ENV**: `production` (already set in render.yaml)
- **FRONTEND_ORIGIN**: Will be automatically set to your service URL (or set manually after deployment)

### 4. Deploy

1. Click "Create Web Service"
2. Wait for the build to complete
3. Your application will be available at `https://your-service-name.onrender.com`

## Important Notes

1. **Build Process**: The build script installs frontend dependencies and builds the React app
2. **File Storage**: Uploads are stored in the `uploads/` directory (ephemeral on free tier)
   - For production, consider using AWS S3 (configure S3 environment variables)
3. **MongoDB**: Required environment variable - the app will not start without it in production
4. **Frontend**: The built frontend is served from the backend at the root URL
5. **API Routes**: All API routes are prefixed and won't conflict with frontend routes

## Environment Variables

- `MONGODB_URI` (required): MongoDB connection string
- `NODE_ENV`: Set to `production` automatically
- `FRONTEND_ORIGIN`: Service URL (auto-set or manual)
- `PORT`: Set automatically by Render
- `S3_BUCKET` (optional): AWS S3 bucket name for file uploads
- `AWS_ACCESS_KEY_ID` (optional): AWS access key
- `AWS_SECRET_ACCESS_KEY` (optional): AWS secret key
- `AWS_REGION` (optional): AWS region (default: us-east-1)

## Troubleshooting

1. **Build fails**: Check that all dependencies are in package.json
2. **MongoDB connection fails**: Verify MONGODB_URI is correct
3. **Frontend not loading**: Check that build completed successfully
4. **Routes not working**: Verify SPA fallback route is at the end of routes

## File Structure

```
.
├── index.js                 # Main server file
├── package.json             # Backend dependencies
├── render.yaml              # Render configuration
├── models/                  # MongoDB models
├── Frontend/                # React frontend
│   ├── package.json         # Frontend dependencies
│   ├── src/                 # React source files
│   └── dist/                # Built frontend (generated)
├── Backend/                 # EJS templates
├── uploads/                 # Uploaded files (ephemeral)
└── Frontend/public/         # Public assets and JSON files
```

## Support

For issues, check:
1. Render logs in the dashboard
2. Build logs for errors
3. MongoDB connection status
4. Environment variables are set correctly

