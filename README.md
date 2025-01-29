1. Prerequisites

Make sure you have the following tools installed on your machine:

Node.js: If not already installed, you can download and install it from here.
MongoDB: You can either run a local MongoDB instance or use a cloud MongoDB service like MongoDB Atlas.
To check if Node.js is installed, run:

node -v
To check if MongoDB is installed, run:

mongod --version
2. Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/kegoba/dufil-backend.git
cd dufil-bankend
3. Install Dependencies

Inside the project directory, install the necessary dependencies:

npm install
This will install:

express: A minimal and flexible Node.js web application framework.
mongoose: MongoDB ODM (Object Data Modeling) library for MongoDB and Node.js.
dotenv: A zero-dependency module for managing environment variables.
4. Setup MongoDB

You can either set up MongoDB locally or use a cloud service like MongoDB Atlas.

Option 1: Local MongoDB Setup
Install MongoDB from here.
Start MongoDB locally by running the following command:
mongod
The default MongoDB URI for a local instance is: mongodb://localhost:27017/mydatabase.
Option 2: MongoDB Atlas Setup
Create a free account on MongoDB Atlas.
Create a new cluster, and get the connection string for your cluster.
Replace the MONGODB_URI in your .env file (we'll configure this next) with the MongoDB Atlas connection string.
5. Configuration

Create a .env file in the root of your project directory with the following content:

DATABASE_URL= your db_url
PORT=5001
JWT_SECRET = appkey
NODE_ENV ='test'

TEST_DB_URI = test db_url


6. Run the Application

To start the application, run the following command:

npm start
This will start the server at http://localhost:5001 (or the port specified in the .env file).




postman documentation 

https://documenter.getpostman.com/view/29626607/2sAYQdkVxz


render base url : 
https://dufil-backend.onrender.com/api/v1


NOTE : YOU WILL NEED TO CREATE ACCOUNT AND LOGIN BEFORE YOU CAN ACCESS THE APP.