##ALX Portfoli project (MVP)

This is the backend for a Budgeting app

###To test, clone to local

###Install dependencies: node, express, mysql, dotenv, sequelize

`$ npm install express sequelize mysql2 dotenv`

###Set Up Database:

- Create a MySQL database on your local machine.

###Database Configuration File:

- Create a configuration (.env) file to connect to the MySQL database.
In .env add your, add your credentials

`DB_NAME=your_database_name`
`DB_USER=your_database_user`
`DB_PASS=your_database_password`
`DB_HOST=localhost`
`PORT=5000`

###Start the server

`$ node server.js`

Use Postman or a similar tool to test the API endpoints for users and budgets.
