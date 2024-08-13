import axios from "axios";

const authApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
});

// Combine email and password into a single object for loginApi
const loginCredentials = (email, password) => ({ email, password });

export const registerApi = (user) => authApiClient.post('http://localhost:8080/api/auth/register?role=USER', user);

export const loginApi = (email, password) =>
  authApiClient.post('http://localhost:8080/api/auth/login', loginCredentials(email, password));

export const saveLoggedUser = (userId, email, role) => {
  sessionStorage.setItem('activeUserId', userId);
  sessionStorage.setItem('authenticatedUser', email);
  sessionStorage.setItem('role', role);
};

export const storeBasicAuth = (basicAuth) => localStorage.setItem('auth', basicAuth);
export const getBasicAuth = () => localStorage.getItem('auth');

export const isUserLoggedIn = () => !!sessionStorage.getItem('authenticatedUser'); // Leverage double negation for concise check

export const getLoggedInUserId = () => sessionStorage.getItem('activeUserId');
export const getLoggedInUser = () => sessionStorage.getItem('authenticatedUser');

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => sessionStorage.getItem('role') === 'ROLE_ADMIN'; // Strict comparison for role check
