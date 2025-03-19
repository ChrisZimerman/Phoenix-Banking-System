# Phoenix Investment House - Banking System

## Project Overview
This project is a **banking system** that allows users to perform **deposits and withdrawals**, interact with an external banking provider, and manage transaction history. The system consists of a **frontend (React)** and a **backend (.NET Core)** that communicates with a simulated external banking provider.

## Folder Structure
```
Phoenix Investment House/
│── BankingApi/         # Backend .NET Core API
│── banking-client/     # Frontend React application
│── README.md           # Documentation
```

---
## 1. Backend Setup (BankingApi)

### Prerequisites
- **.NET 8 SDK**
- **SQL Server** (or any other relational database supported by Entity Framework Core)
- **Postman** (for API testing, optional)

### Installation & Run
1. Navigate to the backend folder:
   ```sh
   cd "C:\Users\Chrisz\Projects\Phoenix Investment House\BankingApi"
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Apply database migrations:
   ```sh
   dotnet ef database update
   ```
4. Run the backend:
   ```sh
   dotnet run
   ```
   The API should now be running at `http://localhost:5184/api/Transactions`.

### API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/api/Transactions` | Retrieve all transactions |
| **GET** | `/api/Transactions/{id}` | Retrieve a specific transaction by ID |
| **POST** | `/api/Transactions` | Create a new deposit or withdrawal |
| **PUT** | `/api/Transactions/{id}` | Update a transaction's amount |
| **DELETE** | `/api/Transactions/{id}` | Delete a transaction |

### Example API Call (Deposit)
```json
{
    "fullNameHebrew": "דני כהן",
    "fullNameEnglish": "Danny Cohen",
    "birthDate": "1990-05-20",
    "userId": "123456789",
    "accountNumber": "9876543210",
    "amount": 1500,
    "actionType": "Deposit"
}
```

### Error Handling
| Scenario | Error Message |
|----------|--------------|
| User not found (Withdrawal) | `Cannot withdraw. No previous transactions found for this user.` |
| Invalid Token | `Failed to authenticate with the banking provider.` |
| Bank Declined | `Transaction was declined by the banking provider.` |

---
## 2. Frontend Setup (banking-client)

### Prerequisites
- **Node.js (LTS version)**
- **npm or yarn**

### Installation & Run
1. Navigate to the frontend folder:
   ```sh
   cd "C:\Users\Chrisz\Projects\Phoenix Investment House\banking-client"
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm start
   ```
   The frontend should now be running at `http://localhost:3000`.

---
## 3. Manual Testing Guide

### **Perform a Deposit**
1. Open `http://localhost:3000`
2. Fill in the required fields:
   - Full Name (Hebrew & English)
   - Birth Date
   - User ID (9 digits)
   - Account Number (up to 10 digits)
   - Amount (positive number)
3. Click **Submit**.
4. Verify that the transaction appears in the history table.

### **Perform a Withdrawal**
1. Choose "Withdrawal" from the action type dropdown.
2. Use a user ID that has a previous deposit.
3. Click **Submit**.
4. Verify that the transaction is updated in the table.

### **Error Scenarios (UI Feedback)**
| Scenario | Expected Behavior |
|----------|------------------|
| User ID does not exist for withdrawal | An error notification should appear. |
| Amount is negative or zero | The form should display a validation error. |
| Bank provider declines the transaction | An error notification should appear. |

---
