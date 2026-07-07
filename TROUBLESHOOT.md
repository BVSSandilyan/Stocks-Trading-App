# 🔧 Troubleshooting — Login Not Working

## Step 1: Verify backend is running

Open this URL in your browser:
```
http://localhost:5000/api/ping
```

You should see:
```json
{ "ok": true, "message": "Stocks Trading App backend is alive" }
```

If you see an error → the backend is not running. Go to Step 2.

---

## Step 2: Start the backend correctly

Open a terminal, go to the backend folder:
```bash
cd sb-stocks/backend
npm install
npm run dev
```

Watch for these lines:
```
🚀 Stocks Trading App server running on port 5000
✅ MongoDB Atlas connected successfully
📦 Database: sbstocks
```

If you see ❌ MongoDB connection error → your IP is not whitelisted in Atlas (see Step 4).

---

## Step 3: Start the frontend

Open a **second terminal**:
```bash
cd sb-stocks/frontend
npm install
npm start
```

Browser opens at http://localhost:3000 automatically.

---

## Step 4: MongoDB Atlas — Whitelist your IP

1. Go to https://cloud.mongodb.com
2. Click your cluster → **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** → `0.0.0.0/0`
5. Click **Confirm**
6. Wait 30 seconds, then restart the backend

---

## Step 5: Already registered? Reset your account

If you registered before but can't login, the old password hash may be mismatched.
Go to MongoDB Atlas → Browse Collections → sbstocks → users → delete your user document.
Then register again with the same email.

---

## Step 6: Check the .env file

Open `sb-stocks/backend/.env` and make sure it looks exactly like this:
```
PORT=5000
MONGO_URI=mongodb+srv://shanmukhasandilyan_db_user:Sandilyan%402006@cluster0.lkyzbz9.mongodb.net/sbstocks?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sbstocks_jwt_super_secret_2024
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Note: The `@` in the password must be written as `%40`

---

## Common Errors

| Error shown | Cause | Fix |
|-------------|-------|-----|
| "Cannot connect to server" | Backend not running | Run `npm run dev` in backend folder |
| "Invalid email or password" | Wrong credentials or account not created | Register a new account |
| "Email already registered" | Account exists | Use login tab instead |
| "Something went wrong" | Network/CORS issue | Check backend is running on port 5000 |
