# 🧠 Dental Chatbot Backend (Node.js + TypeScript)

This is the backend service for the Dental Practice Chatbot. It handles user authentication, appointment booking, slot availability, and integrates with the Geminia API for chatbot capabilities.

---

## 🚀 Tech Stack

* **Node.js** + **Express.js**
* **TypeScript**
* **MongoDB** with **Mongoose**
* **Dotenv** for environment configuration

---

## 📁 Project Structure

```
server/
├── src/
│   ├── app.ts               # Express app setup
│   ├── server.ts            # Server startup with graceful shutdown
│   ├── config/              # DB connection and env config
│   ├── routes/              # Route handlers (auth, appointments)
│   ├── controllers/         # Request handling logic
│   ├── models/              # Mongoose schemas
│   ├── services/            # Business logic and DB ops
│   ├── middlewares/         # Error handling, auth, etc.
│   └── types/               # Custom TS types
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧪 Available Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the project
npm run build

# Start the server (after build)
npm start
```

---

## 🌐 API Endpoints

### Auth

* `POST /signup` – Register a new user
* `POST /login` – User login

### Appointments

* `GET /slots` – Fetch available appointment slots
* `POST /bookings` – Book a new appointment
* `GET /bookings` – Get all bookings for a user
* `GET /booking/:id` – Get details of a specific booking
* `PATCH /booking/:id` – Update/reschedule an appointment
* `DELETE /booking/:id` – Cancel an appointment

---

## 🌱 Environment Variables

Create a `.env` file in `server/` with:

```env
PORT=3000
MONGO_URI=mongodb+srv://<your-db-uri>
```

---

## 🧹 Graceful Shutdown

The server listens for `SIGINT` and `SIGTERM` signals and closes the HTTP server cleanly. This ensures proper shutdown during deployments or server restarts.

---

## 📦 Deployment

Can be deployed using:

* **GCP Cloud Run**
* **Docker** (optional)

---

## 🤖 Geminia API Integration

This backend integrates with the **Geminia API** for chatbot-based appointment flows. Ensure API access and tokens are set via environment variables if required.

---

## 📝 License

MIT — feel free to use and modify.
