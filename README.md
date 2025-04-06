
# 🦷 Dental Practice Chatbot - Full Stack Web App

A comprehensive dental practice management system that simplifies appointment scheduling, booking management, and user authentication through an AI-powered chatbot interface.

---

## 🚀 Overview

This project offers a seamless web-based solution for dental clinics, integrating a user-friendly frontend, robust backend APIs, and conversational chatbot interactions powered by Geminia API.

---

## ✨ Features

### 🖥️ Frontend (React + Tailwind CSS)

* **Landing Page**
  * ✅ Start Booking: Initiates chatbot-based appointment scheduling.
  * ✅ Sign In / Sign Up: User authentication system.
* **Authentication**
  * New users can register with basic details (name, email, phone, etc.).
  * Existing users can log in to manage their bookings.
* **Chatbot Interaction**
  * Start booking an appointment post-authentication.
  * Choose appointment type:  *Cleaning, Checkup, Emergency* .
  * View available time slots.
  * Cancel or reschedule appointments.
  * Confirm appointment booking.

---

### 🧰 Backend (Node.js + MongoDB)

#### Authentication Endpoints

* `POST /signup` - Register a new user
* `POST /login` - Authenticate an existing user

#### Booking Endpoints

* `GET /slots` - Get available appointment time slots
* `POST /bookings` - Create a new booking
* `GET /bookings` - Get all bookings for a logged-in user
* `GET /booking/{id}` - Get specific booking details
* `PATCH /booking/{id}` - Update or reschedule an appointment
* `DELETE /booking/{id}` - Cancel an existing appointment

---

### 🤖 Chatbot (Geminia API Integration)

Powered by **Geminia API** for Natural Language Processing and conversational flow management.

**Bot Capabilities:**

* 🎯 Display available slots based on user preferences
* 📄 Handle booking forms and confirmations
* ❌ Initiate cancellation flows
* 🔁 Offer rescheduling interactions

---

## 🗃️ Database Schema

### 1. Users Collection

```json
{
  "_id": "ObjectId",
  "first_name": "String",
  "last_name": "String",
  "email": "String",
  "phone": "String",
  "password_hash": "String",
  "insurance_name": "String",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### 2. Appointments Collection

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "appointment_type": "String",
  "appointment_date": "Date",
  "status": "String",
  "emergency": {
    "allowed": true,
    "description": "String"
  },
  "created_at": "Date",
  "updated_at": "Date",
  "emergency_details": "String"
}
```

### 3. Available Slots Collection

```json
{
  "_id": "ObjectId",
  "slot_date": "Date",
  "status": "String",
  "created_at": "Date",
  "updated_at": "Date"
}
```

---

## 🔁 User Flow

1. **Landing Page**
   * User chooses either `Start Booking` or `Sign In / Sign Up`.
2. **Authentication**
   * New users register with their details.
   * Returning users log in with credentials.
3. **Chatbot Interaction**
   * Request appointment: The bot asks for preferred appointment type and date.
   * Show available slots.
   * Booking form: User confirms booking.
   * Reschedule or cancel appointments as needed.

---

## ⚠️ Error Handling & Feedback

* The chatbot handles unclear input gracefully, prompting the user for clarification.
* Backend operations are  **atomic** :
  * Prevent partial updates or inconsistent data.
  * Ensure reliable booking, rescheduling, and cancellation actions.
* All actions return appropriate success/error messages for improved UX.

---

## ☁️ Deployment Strategy

| Component | Platform         |
| --------- | ---------------- |
| Frontend  | Cloudflare Pages |
| Backend   | Google Cloud Run |
| Database  | MongoDB Atlas    |

---

## 🧪 Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Frontend | React, Tailwind CSS |
| Backend  | Node.js, Express    |
| Database | MongoDB Atlas       |
| Chatbot  | Geminia API         |
| Hosting  | Cloudflare + GCP    |

---

## 🧰 Project Setup

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas account
* Geminia API access

### Folder Structure

```
/dental-chatbot
  ├── frontend/    # React + Tailwind UI
  └── backend/     # Node.js API
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/dental-chatbot.git
cd dental-chatbot
```

### Step 2: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
GEMINIA_API_KEY=your_geminia_api_key
```

### Step 4: Run the App Locally

```bash
# Backend
cd backend
npm run start

# Frontend (in a separate terminal)
cd frontend
npm run dev
```

---

## 👥 Contribution Guide

We welcome all contributions!

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

---

## 📬 Contact

**Khem Raj Meena**

Backend Lead @ Trential

📧 [Email](mailto:khemrajmeena0111@gmail.com)

---

## 📄 License

MIT License © 2025 Khem Raj Meena
