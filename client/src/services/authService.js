// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // backend url to hit for the FE requests.

function pickErrorMessage(err) {
  const d = err.response?.data;
  if (!d) return err.message || "Something went wrong";
  if (d.errors?.length) {
    return d.errors.map((e) => e.message).join(", ");
  }
  return d.error || d.message || err.message;
}

export async function loginUser(body) {
  const { phone, password } = body;
  const res = await axios.post(`${API_URL}/v1/auth/login`, { phone, password });
  return res.data;
}

export async function registerUser(body) {
  const res = await axios.post(`${API_URL}/v1/auth/register`, body);
  return res.data;
}

export { pickErrorMessage };
