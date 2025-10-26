// src/utils/auth.js

// Save new user to localStorage
export const signup = (email, password) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return { success: false, message: "User already exists. Please log in." };
  }

  // Add new user
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Signup successful. You can now log in." };
};

// Log in existing user
export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { success: false, message: "User does not exist. Please sign up." };
  }

  // Check password
  if (user.password !== password) {
    return { success: false, message: "Incorrect password. Try again." };
  }

  // Login successful
  localStorage.setItem("ticketapp_session", "valid_session_token");
  localStorage.setItem("current_user", JSON.stringify(user));

  return { success: true, message: "Login successful!" };
};

// Log out current user
export const logout = () => {
  localStorage.removeItem("ticketapp_session");
  localStorage.removeItem("current_user");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("ticketapp_session");
};
