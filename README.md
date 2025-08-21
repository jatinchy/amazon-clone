
# 🛒 Amazon Clone (MERN Starter)

A minimal **full-stack Amazon Clone** you can run locally or deploy.  
- **Backend:** Node.js + Express (products API served from local JSON data; DB-ready structure)
- **Frontend:** Vite + React (product grid, cart with localStorage, checkout placeholder)
- **No DB required** to start. You can plug in MongoDB later (hooks included).

---

## ⚙️ Quick Start

```bash
# 1) Backend
cd server
npm install
npm run dev     # http://localhost:5000

# 2) Frontend (in a new terminal)
cd client
npm install
npm run dev     # http://localhost:5173
```

The React app proxies API calls to the backend during development.

---

## 🧰 Scripts

**Server**
- `npm run dev` – start backend with nodemon
- `npm start` – start backend normally

**Client**
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build

---

## 🔐 Environment Variables

Create a `server/.env` (optional for this starter):

```env
PORT=5000
NODE_ENV=development
# Later (if you add DB/Auth):
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=supersecret
```

---

## 🧪 API Endpoints (Starter)

- `GET /api/products` – list all products
- `GET /api/products/:id` – single product by ID

---

## 📝 Notes

- This starter keeps products in `server/data/products.json` for simplicity.
- The frontend uses a simple Context for cart management and persists it in `localStorage`.
- You can replace the mock API with a MongoDB-backed implementation later (structure is ready).

---

## 🧭 Roadmap Ideas

- Real payments (Stripe/Razorpay)
- Auth (JWT) + protected routes
- Orders, delivery status, admin dashboard
- Product search, categories, filters, pagination

---

## 📄 License

MIT
