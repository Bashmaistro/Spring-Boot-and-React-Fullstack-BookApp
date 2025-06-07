# 📚 Fullstack Book App — Spring Boot & React

A full-stack web application to manage books, built with **Spring Boot** (backend) and **React** (frontend). This project demonstrates CRUD operations, REST API development, frontend-backend integration, and responsive UI design using modern web technologies.

## 🔧 Tech Stack

**Backend:**
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- H2 Database (in-memory)
- Lombok

**Frontend:**
- React
- Axios
- Bootstrap
- React Router DOM

---

## 🚀 Features

- 📖 Add, edit, delete, and list books
- 🔎 View book details
- 💾 Persist data with H2 in-memory database
- 🔗 Full REST API integration
- 📱 Responsive and clean UI

---


## 🛠️ Installation & Running

### 🔙 Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

> The backend will run on: `http://localhost:8080`

### 🌐 Frontend (React)

```bash
cd frontend
npm install
npm start
```

> The frontend will run on: `http://localhost:3000`

---

## 🔗 API Endpoints

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /books             | Get all books      |
| GET    | /books/{id}        | Get book by ID     |
| POST   | /books             | Add new book       |
| PUT    | /books/{id}        | Update book        |
| DELETE | /books/{id}        | Delete book        |

---

## 📁 Project Structure

```
.
├── backend
│   └── src/main/java/...     # Spring Boot Backend
├── frontend
│   └── src/...               # React Frontend
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 🙋‍♂️ Author

Developed by [Bashmaistro](https://github.com/Bashmaistro)
