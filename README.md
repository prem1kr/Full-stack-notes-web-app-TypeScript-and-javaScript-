
# 📝 Notes Web App

A full-stack **MERN (MongoDB, Express.js, React, Node.js)** based web application that allows users to **create, view, edit, and delete notes** securely with **JWT authentication**.

---

## 🚀 Features

- **User Authentication**
  - Signup with Email, OTP, and Date of Birth.
  - Login with JWT-based authentication.
  - Secure protected routes.

- **Notes Management**
  - Create new notes.
  - View saved notes.
  - Edit existing notes.
  - Delete notes.

- **User Profile**
  - View personal details (name, email, DOB).
  - Logout functionality.

- **Modern UI**
  - Responsive React frontend.
  - Clean CSS styling.
  - Dashboard view for notes and profile.

---

## 🛠️ Tech Stack

**Frontend**
- React (TypeScript + Vite)
- Axios (API calls)
- React Router DOM
- React Icons
- CSS (custom styling)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (for password hashing)
- dotenv (environment variables)

---

## 📂 Project Structure

### Backend
```

Backend/
│── config/
│   └── db.js          # MongoDB connection
│── models/
│   └── notesModel.js  # Notes schema
│── routes/
│   ├── authRoutes.js  # Signup/Login routes
│   ├── profileRoutes.js
│   └── notesRoutes.js
│── controllers/
│   ├── authController.js
│   ├── profileController.js
│   └── notesController.js
│── index.js           # Entry point

```

### Frontend
```

Frontend/
│── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── home/
│   │   │   └── Dashboard.tsx
│   │   └── notes/
│   │       └── Notes.tsx
│   ├── styles/
│   │   └── auth, home, notes CSS files
│   └── App.tsx

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/notes-web-app.git
cd notes-web-app
````

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the **Backend** folder:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/auth/signup` → Register user
* `POST /api/auth/login` → Login user

### Profile

* `GET /api/profile/:id` → Get user profile

### Notes

* `POST /api/notes/create` → Create a note
* `GET /api/notes/get` → Get all notes
* `PUT /api/notes/update/:id` → Update a note
* `DELETE /api/notes/delete/:id` → Delete a note

---

## 📸 Screenshots

### Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### Create Note

![Create Note Screenshot](./screenshots/create-note.png)

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

---



## 👨‍💻 Author

**Prem Kumar**
🔗 [GitHub](https://github.com/prem1kr) | [LinkedIn](https://www.linkedin.com/in/prem-kumar-3b38b1290)

