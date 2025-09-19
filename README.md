# 📦 DeliveryPro

A secure, role-based, and user-friendly **DeliveryPro** frontend built with **React, Redux Toolkit, and RTK Query**.  
This project provides parcel operations and management for **Senders, Receivers, and Admins** with a clean, responsive, and modern UI.

🔗 **Live Demo**: [Frontend URL](https://parcel-delivery-pro.vercel.app) | [Backend API](https://your-parcel-delivery.vercel.app)  
📽 **Demo Video**: [Watch here](https://your-demo-video-link.com)

---

## 🚀 Features

### 🌐 Public Landing

- Home page with service intro
- About page with mission & team info
- Contact page with simulated inquiry form

### 🔐 Authentication

- JWT-based secure login & registration
- Role-based access (Sender / Receiver / Admin)
- Persisted login state with refresh
- Logout functionality

### 📮 Sender Dashboard

- Create parcel delivery requests
- Cancel parcels (if not dispatched)
- View all created parcels with status logs

### 📥 Receiver Dashboard

- View incoming parcels
- Confirm parcel delivery
- Delivery history tracking

### 🛠️ Admin Dashboard

- Manage all users (block/unblock)
- Manage all parcels (block/unblock, update delivery status)
- Assign delivery personnel (optional)

### 🔎 Parcel Tracking

- Unique tracking ID for each parcel
- Public search by tracking ID
- Status logs with timestamp & updatedBy

### 📊 General Features

- Role-based navigation
- Form validations & error handling
- Pagination, filtering & search
- Global loading & error states
- Toast notifications
- Charts & analytics dashboard
- Fully responsive design

---

## 🛠️ Tech Stack

**Frontend**

- ⚛️ React + TypeScript
- 🌀 Redux Toolkit + RTK Query
- 🎨 Tailwind CSS
- 🔔 React Toastify (or similar)

**Backend**

- 🟩 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT + bcrypt

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/parcel-delivery-frontend.git
cd parcel-delivery-frontend


npm install


VITE_API_BASE_URL=https://your-backend-url.com/api/v1


npm run dev



| Role     | Email                                         | Password |
| -------- | --------------------------------------------- | -------- |
| Admin    | [heyadmin@admin.com](mailto:heyadmin@admin.com)       | A1234!   |
| Sender   | [heybro22@hey.com](mailto:heybro22@hey.com)     | A1234!   |
| Receiver | [heybrorcv@receiver.com](mailto:heybrorcv@receiver.com) | A1234!   |


📊 Dashboard Overview

Overview Cards: Total parcels, Delivered, In Transit, Pending/Cancelled

Charts: Bar & Pie charts showing trends

Parcel Table: Paginated, searchable, filterable

Status Timeline: Visual history of parcel updates



✅ Best Practices Followed

Modular & reusable components

TypeScript for type safety

RTK Query for API state management

Toast notifications for feedback

Responsive UI with Tailwind

Role-based routing & guards

Commit history with meaningful messages

📜 Submission Guidelines

 Clean, modular, documented codebase

 README with overview, setup, stack, live URL

 Separate frontend & backend repos

 Live deployment (Frontend + Backend)

 Demo video (5–10 min walkthrough)

 Provided credentials for testing

📄 License

This project is licensed under the MIT License.

---

Would you like me to also create a **backend `README.md`** in the same style so both repos look consistent?
```

Built with ❤️ using React, TypeScript, and Redux Toolkit.
