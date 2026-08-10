# 🍔 TasteHub - Restaurant Ordering System

TasteHub is a full-stack restaurant ordering web application.

The system allows users to create an account, log in, browse food items, add products to the cart, place orders, and view their previous orders.

---

## 🚀 Features

- Responsive restaurant website
- User Sign Up
- User Login
- JWT Authentication
- Logout
- Personalized navigation bar
- Food Menu
- Food Details
- Shopping Cart
- Checkout
- Place Order
- Order Success page
- My Orders page
- Order Details page
- Protected order routes
- Orders stored in PostgreSQL
- Backend deployed on Render
- GitHub version control

---

## 🛠 Technologies Used

### Frontend

- React.js
- Vite
- React Router
- Bootstrap
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- REST API

### Database

- PostgreSQL

### Deployment

- Render
- GitHub

---

## 📄 Pages

The application contains the following pages:

- Home
- Menu
- Food Details
- About
- Contact
- Sign Up
- Login
- Cart
- Checkout
- Order Success
- My Orders
- Order Details

---

## 🔐 Authentication

TasteHub uses JSON Web Token (JWT) authentication.

After a successful login, the authentication token is stored in the browser.

The token is used when the user accesses protected features such as:

- Placing an order
- Viewing My Orders
- Viewing Order Details

The navigation bar also displays the logged-in user's name.

---

## 🛒 Ordering Process

1. The user creates an account.
2. The user logs in.
3. The user browses the food menu.
4. The user adds food items to the cart.
5. The user opens the checkout page.
6. The user enters delivery information.
7. The order is sent to the backend.
8. The order is stored in the PostgreSQL database.
9. An "Order Placed Successfully" page is displayed.
10. The user can open My Orders to view previous orders.
11. The user can click View Details to see the items inside an order.

---

## 🗄 Database

The project uses PostgreSQL to store application data.

### Users

Stores registered user information.

Main information includes:

- User ID
- Name
- Email
- Password

### Orders

Stores orders created by users.

Main information includes:

- Order ID
- User ID
- Total
- Status
- Creation Date

### Order Items

Stores the food items associated with each order.

Main information includes:

- Item ID
- Order ID
- Food Name
- Quantity
- Price

---

## 📁 Project Structure

```text
tastehub/
│
├── server/
│   ├── authMiddleware.js
│   ├── authRoutes.js
│   ├── db.js
│   ├── orderRoutes.js
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   └── burger-orders.jpg
│   │
│   ├── components/
│   │   ├── FoodCard.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   ├── data/
│   │   └── food.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── FoodDetails.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── MyOrders.jsx
│   │   └── OrderDetails.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## 🌐 Backend API

The backend provides REST API endpoints for:

- User registration
- User login
- Creating orders
- Retrieving user orders
- Retrieving individual order details

Protected endpoints require a valid JWT authentication token.

---

## ☁️ Deployment

The backend is deployed on Render.

The PostgreSQL database is hosted online and connected to the backend.

GitHub is used for source code management and deployment.

---

## 🎯 Project Objective

The objective of TasteHub is to create a modern restaurant ordering system and demonstrate full-stack web development concepts including:

- React frontend development
- Node.js backend development
- REST API development
- User authentication
- Database integration
- Cloud deployment
- Git and GitHub

---

## 👨‍💻 TasteHub

Restaurant Ordering System

2026