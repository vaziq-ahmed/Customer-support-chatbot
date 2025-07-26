# Customer-support-chatbot
E-Commerce Customer Support Chatbot
##This project is a Customer Support Chatbot designed for an E-commerce Clothing Site. The chatbot provides automated responses to customer queries about products, order statuses, and inventory using a fictitious dataset. The application is built with a Node.js/Express backend and a React frontend, containerized with Docker.
#Overview
The chatbot leverages a dataset from recruit41/ecommerce-dataset to answer queries such as:

"What are the top 5 most sold products?"
"Show me the status of order ID 12345."
"How many Classic T-Shirts are left in stock?"

##The project includes:

Backend: A Node.js/Express server with SQLite for data storage and API endpoints.
Frontend: A React-based chat interface.
Containerization: Docker setup for easy deployment.

Prerequisites

Node.js (v16 or later)
npm (comes with Node.js)
Docker (for containerization)
Git (for version control)

Setup Instructions
1. Clone the Repository
git clone <your-repository-url>
cd CustomerSupportChatbot

2. Install Dependencies

Navigate to the backend folder and install backend dependencies:cd backend
npm install


Navigate to the frontend folder and install frontend dependencies:cd ../frontend
npm install



3. Download the Dataset

Clone the dataset repository:git clone https://github.com/recruit41/ecommerce-dataset.git


Move the ecommerce-dataset folder to the project root (e.g., D:\CustomerSupportChatbot\ecommerce-dataset).

4. Run the Application Locally

Start the backend server:cd backend
node loadData.js  # Load the dataset into SQLite
node server.js    # Start the server


Start the frontend:cd ../frontend
npm start


Open your browser at http://localhost:3000 to use the chatbot.

5. Run with Docker

Ensure the ecommerce-dataset folder is in the project root.
Build and run the containers:docker-compose up --build


Access the frontend at http://localhost:3000.

Project Structure
CustomerSupportChatbot/
├── backend/           # Node.js/Express backend
│   ├── loadData.js    # Script to load dataset into SQLite
│   ├── server.js      # Express server with API endpoints
│   ├── package.json   # Backend dependencies
│   └── Dockerfile     # Backend Docker configuration
├── frontend/          # React frontend
│   ├── src/           # React components and logic
│   ├── public/        # Static files
│   ├── package.json   # Frontend dependencies
│   └── Dockerfile     # Frontend Docker configuration
├── ecommerce-dataset/ # Dataset files (e.g., products.csv, orders.csv)
├── docker-compose.yml # Docker Compose configuration
└── README.md          # This file

Usage

Enter queries in the chat interface, such as:
"What are the top 5 most sold products?"
"Show me the status of order ID 12345."
"How many Classic T-Shirts are left in stock?"


The chatbot will respond based on the loaded dataset.

Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m "Add feature").
Push to the branch (git push origin feature-branch).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details (if applicable).
Acknowledgments

Dataset provided by recruit41/ecommerce-dataset.
Built with love using Node.js, React, and Docker.
