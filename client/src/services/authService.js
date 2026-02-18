// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // backend url to hit for the FE requests.

export async function loginUser(formData) {
  const res = await axios.post(`${API_URL}/v1/auth/login`, formData);
  return res.data;
}
