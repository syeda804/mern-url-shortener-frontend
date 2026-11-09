# 🔗 MERN URL Shortener – Frontend

A modern and responsive URL Shortener application built with React.js. This frontend allows users to shorten long URLs, manage their shortened links, and access their accounts through secure authentication.

## 🚀 Features

- **User Registration (Signup):** New users can create an account.
- **User Login (Signin):** Existing users can securely log in.
- **Secure Authentication:** JWT-based authentication integrated with the backend.
- **Protected Routes:** Restrict access to authenticated users where configured.
- **URL Shortening:** Convert long URLs into short and shareable links.
- **URL Management:** Manage shortened URLs.
- **Session Management:** Authentication token handling using Local Storage.
- **React Router Navigation:** Smooth navigation between application pages.
- **API Integration:** Connect with the backend REST API.
- **Responsive UI:** User-friendly interface across different screen sizes.

## 🔐 Authentication Flow

1. Users can create a new account through the Signup page.
2. Registered users can log in through the Signin page.
3. The frontend sends authentication requests to the backend.
4. The backend handles authentication and returns a JWT token.
5. The frontend stores the token in Local Storage.
6. Authenticated requests use the token when required.


