# Taskify - Server

This is the backend API for the Task Management System. It handles user authentication, task management, and real-time updates using MongoDB.  

## 🚀 Live API  
[API Live Link](https://task-management-server-eight-sigma.vercel.app/)  

## 📌 Features  
- **User Authentication** (JWT-based)  
- **CRUD Operations** for tasks  
- **User-specific tasks** (Each user sees only their tasks)  
- **Task Ordering & Drag-and-Drop Support**  
- **Due Date & Overdue Task Indicators**  
- **Real-time updates** using MongoDB Change Streams  

## 🛠 Technologies Used  
- **Node.js**  
- **Express.js**  
- **MongoDB** with Mongoose  
- **JWT Authentication**  
- **Cors & Dotenv for Environment Configuration**  

## 📦 Dependencies  
- `express` - Web framework  
- `mongoose` - MongoDB ODM  
- `cors` - Cross-Origin Resource Sharing  
- `dotenv` - Environment variable management  
- `jsonwebtoken` - User authentication  
- `bcryptjs` - Password hashing  

## ⚡ Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/khushiiakter/server-taskify
cd task-management-server
