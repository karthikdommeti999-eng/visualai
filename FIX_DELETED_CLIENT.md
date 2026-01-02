# 🛑 CRITICAL ERROR: "Error 401: deleted_client"

**This error means the Client ID you are using has been DELETED.**

You (or someone) created the ID, copied it, and then **deleted it** from Google Cloud Console. Or you are using an old ID.

## ⚡ SOLUTION: Create a "Permanent" ID

1.  **Go to [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials)**.
    *   (Delete any old "red" or invalid IDs to avoid confusion).
2.  Click **+ CREATE CREDENTIALS** -> **OAuth Client ID**.
3.  Application Type: **Web Application**.
4.  Name: **"Visual AI Permanent"** (Name it this so you know not to delete it!).
5.  **Authorized JavaScript origins** (ADD THIS NOW):
    *   `https://visualai.vercel.app`
    *   `http://localhost:5173`
6.  Click **CREATE**.

## 📝 NEXT STEPS
1.  **COPY the NEW Client ID** (It will be long and end in `.apps.googleusercontent.com`).
2.  **Looking at the screen?** DO NOT CLICK DELETE.
3.  **Paste the NEW ID** into the chat here so I can update your code.
