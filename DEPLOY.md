# Deployment Guide for VISUAL AI

This project is configured as a full-stack Node.js + React application. The backend (Express) serves the frontend (Vite React Build).

## 🚀 How to Deploy (Cloud Hosting)

The easiest way to deploy this "not locally" is to use a cloud provider like **Render**, **Railway**, or **Heroku**.

### Option A: Deploy to Render.com (Recommended - Free)

1.  **Push to GitHub**:
    *   Initialize git if you haven't: `git init`, `git add .`, `git commit -m "Initial commit"`
    *   Create a repo on GitHub and push your code there.

2.  **Create Web Service on Render**:
    *   Sign up at [render.com](https://render.com).
    *   Click "New +", select **Web Service**.
    *   Connect your GitHub repository.

3.  **Configure Settings**:
    *   **Runtime**: Node (default)
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   Click **Create Web Service**.

4.  **Done!**: Render will build your site and give you a public `...onrender.com` URL.

---

## 🛠 Project Structure for Deployment

*   **`package.json`**:
    *   `"start"`: Runs the production server (`node server/index.js`).
    *   `"build"`: Compiles the React app to `dist/`.
*   **`server/index.js`**:
    *   Serves the API at `/api/chat`.
    *   Serves the static files from `../dist`.
    *   Catches all other routes and serves `index.html` (for SPA routing).
*   **`src/pages/AICoach.jsx`**:
    *   Uses relative URL `/api/chat` to talk to the backend (works automatically on same domain).

## 🌍 Environment Variables

If you add a real OpenAI API Key later, set it in your cloud provider's "Environment" settings:
*   `OPENAI_API_KEY`: `your-key-here`
