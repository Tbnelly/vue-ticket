// src/utils/tickets.js
import { v4 as uuidv4 } from "uuid";

// Helper: Get the current logged-in user
const getCurrentUser = () => JSON.parse(localStorage.getItem("current_user"));

// Get tickets belonging to the current user only
export const getTickets = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  return tickets.filter((t) => t.owner === currentUser.email);
};

// Save all tickets to localStorage
export const saveTickets = (tickets) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Create a new ticket for the current user
export const createTicket = (data) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const newTicket = { id: uuidv4(), ...data, owner: currentUser.email };

  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
};

// Update an existing ticket (only for current user's tickets)
export const updateTicket = (id, updatedData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets = tickets.map((t) =>
    t.id === id && t.owner === currentUser.email ? { ...t, ...updatedData } : t
  );
  saveTickets(tickets);
};

// Delete a ticket (only for current user's tickets)
export const deleteTicket = (id) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets = tickets.filter((t) => !(t.id === id && t.owner === currentUser.email));
  saveTickets(tickets);
};
