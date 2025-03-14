# Money Lending Manager Backend

This is the backend for the Money Lending Manager application, built using Node.js, Express, and MongoDB. This application allows users to manage loans, including creating, retrieving, updating, and deleting loan records.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd money-lending-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your MongoDB database. You can use a local MongoDB instance or a cloud service like MongoDB Atlas.

5. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Loans

- **GET** `/api/loans` - Retrieve all loans
- **POST** `/api/loans` - Create a new loan
- **PUT** `/api/loans/:id` - Update an existing loan
- **DELETE** `/api/loans/:id` - Delete a loan

## License

This project is licensed under the MIT License.