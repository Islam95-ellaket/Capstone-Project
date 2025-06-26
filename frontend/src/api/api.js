import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Interceptor per aggiungere il token a ogni richiesta
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funzione per ottenere i libri
export const getBooks = async () => {
  const res = await API.get('/books');
  return res.data;
};

// Funzione per ottenere un singolo libro tramite ID
export const getBookById = async (bookId) => {
  const res = await API.get(`/books/${bookId}`);
  return res.data;
};

// Funzione per login
export const loginUser = async (userData) => {
  console.log('Chiamata API login con:', userData); // ✅ Debug API
  const res = await API.post('/auth/login', userData);
  return res.data; // Deve essere { token: '...', name: '...' }
};


// Funzione per registrazione
export const registerUser = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

// Funzione per creare un nuovo carrello
export const createCart = async (cartData) => {
  const res = await API.post('/cart', cartData);
  return res.data;
};

// Funzione per ottenere il carrello di un utente
export const getCart = async (userId) => {
  const res = await API.get(`/cart/${userId}`);
  return res.data;
};

// Funzione per aggiornare il carrello
export const updateCart = async (cartId, cartData) => {
  const res = await API.put(`/cart/${cartId}`, cartData);
  return res.data;
};

// Funzione per rimuovere un libro dal carrello
export const removeFromCart = async (cartId, bookId) => {
  const res = await API.delete(`/cart/${cartId}/items/${bookId}`);
  return res.data;
};

// Funzione per completare l'ordine
export const completeOrder = async (cartId) => {
  const res = await API.post(`/cart/${cartId}/order`);
  return res.data;
};
