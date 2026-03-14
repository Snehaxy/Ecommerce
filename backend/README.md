# E-commerce Backend (scaffold)

Run the API locally:

```powershell
cd backend
npm install
copy .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET

# Seed test users (creates admin@test.com and user@test.com)
node seed.js

# Start the server
npm run dev
```

**Quick test credentials:**
- Admin: `admin@test.com` / `password123` (can create/edit products)
- User: `user@test.com` / `password123` (can only view)

API routes:
- `GET /api/products` - list products (search with `?q=`)
- `POST /api/products` - create product (admin only)
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login
