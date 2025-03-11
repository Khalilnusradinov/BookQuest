BookQuest

📚 Project Overview

BookQuest is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to search for books using the Google Books API, save books to their profile, and manage their saved collection. The project is refactored to use GraphQL with Apollo Server instead of a RESTful API.

🚀 Features

Search for Books using the Google Books API.

User Authentication (Signup/Login) with JWT authentication.

Save Books to a user's personal collection.

GraphQL API with queries and mutations.

**MongoDB Atlas **

🛠️ Technologies Used

Frontend: React, Apollo Client, React Bootstrap

Backend: Node.js, Express.js, MongoDB, Apollo Server (GraphQL)

Authentication: JSON Web Token (JWT)

Database: MongoDB Atlas

📌 Installation Guide

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/BookQuest.git
cd BookQuest

2️⃣ Install Dependencies

Backend

cd server
npm install

Frontend

cd ../client
npm install

3️⃣ Set Up Environment Variables

Create a .env file inside the server/ folder and add:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/BookQuest?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key

4️⃣ Run the Development Server

Start the Backend

cd server
npm run dev

Start the Frontend

cd ../client
npm start

🔗 GraphQL API Usage

This project uses Apollo Server for GraphQL.

GraphQL Queries & Mutations

📌 Queries:

query getUserData {
  me {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}

📌 Mutations:

mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}

🚀 Enjoy using BookQuest! Feel free to contribute and report issues.