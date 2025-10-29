# 🎟️ TicketWave (Vue 3)

A ticket management system built using **Vue 3**, **Vite**, and **TailwindCSS**.  
This single-page app (SPA) enables users to sign up, log in, and manage their tickets — all stored in `localStorage`.

---

## 📂 Folder Structure

vue/
│
├── src/
│ ├── components/
│ │ ├── Toast.vue
│ │ ├── Navbar.vue
│ │ ├── Footer.vue
│ │ └── StatsCard.vue
│ ├── pages/
│ │ ├── Landing.vue
│ │ ├── Login.vue
│ │ ├── Signup.vue
│ │ ├── Dashboard.vue
│ │ └── Tickets.vue
│ ├── composables/
│ │ ├── useAuth.js
│ │ ├── useTickets.js
│ │ └── useToast.js
│ ├── App.vue
│ └── main.js
│
└── package.json

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Start development server
bash
Copy code
npm run dev

Visit:
👉 http://localhost:5173

▶️ Features

🔐 LocalStorage-based authentication

🎫 Create, edit, and delete tickets

📊 Dashboard displays ticket summary and user email

💬 Toast notifications via composable

⚡ Vue 3 + Composition API + TailwindCSS

💡 Notes
No backend required — fully client-side.

Uses composables (useAuth, useTickets, useToast) for modular logic.

Each user’s tickets are isolated.

Dashboard shows who’s logged in via email.


