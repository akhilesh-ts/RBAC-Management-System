
# **RBAC System**

## **Project Overview**

This project implements a **Role-Based Access Control (RBAC)** system built with **React.js**, designed to manage users, roles, and permissions efficiently. The system empowers administrators to easily:

- Create and manage users.
- Define and assign roles.
- Control access based on dynamic permissions.

The RBAC system features an **intuitive and responsive interface**, ensuring a seamless experience for users managing roles and permissions. Leveraging **React's component-based architecture**, the system supports efficient updates and enhances the overall user experience.

---

## **Technologies Used**

### **Frontend:**

- **React.js**: Used for building the user interface with components and managing the application state.
- **Tailwind CSS**: A utility-first CSS framework used for styling the UI and ensuring responsiveness across devices.
- **React Router**: Handles routing and navigation between different pages within the application.
- **Redux Toolkit**: Used for managing state globally and efficiently. It simplifies state management using `createSlice` and handles asynchronous actions with `createAsyncThunk`.
- **Formik**: Used for building and managing forms, simplifying form handling, and submission.
- **Yup**: Used as a schema builder in combination with Formik for form validation and ensuring correct input data.
- **Chart.js**: Used for visualizing role and user statistics.

### **Database:**

- **JSON File / Mock Database**: Simulates CRUD operations for users and roles, acting as a temporary storage solution for development.

### **Version Control:**

- **Git & GitHub**: Used for version control and collaboration, enabling easy code management, sharing, and tracking changes.

---

## **Core Features**

### **1. User Management**
- **View and Manage Users**: Admin users can view the list of all users and manage their details.
- **CRUD Operations for Users**:
  - Add new users.
  - Edit user details such as name, email, and assigned role.
  - Delete users from the system.
- **Assign Roles**: Admins can assign roles to users, allowing them to inherit permissions based on their roles.
- **User Status**: Mark users as **Active** or **Inactive**, controlling their access to the system.

### **2. Role Management**
- **Define and Edit Roles**: Admins can create new roles or edit existing ones, defining the scope and permissions associated with each role.
- **Permissions Assignment**: Roles can be assigned permissions such as **Read**, **Write**, and **Delete**.
- **Role Management Access**: Role management features are **restricted** to users or admins who have the `roleManagement` field set to **true** during their user or admin creation. This ensures that only authorized personnel have access to manage roles and permissions.

### **3. Dynamic Permissions**
- **Assign or Modify Permissions**: Admin users can assign permissions to roles dynamically, modifying roles' access rights at any time.
- **Clear Display of Permissions**: Permissions for each role are displayed clearly to help admins modify roles and permissions easily.

### **4. Login System**
- **User Authentication**: Implements a login system that validates user credentials.
- **Form Handling**: Uses **Formik** for managing the login form and **Yup** for input validation.
- **Inactive User Status**: If the user's status is set to **Inactive** (false), login is not allowed, ensuring that only active users can access the system.

### **5. Custom API Simulation**
- **Mock API Calls**: Simulates CRUD operations on users and roles.
- **Simulated Server Responses**: Helps validate functionality without needing a live backend, ideal for development and testing.

---

## **Setup Instructions**

To get started with the project, follow these steps:

### 1. Clone the Repository:

```bash
git clone <repository-url>
