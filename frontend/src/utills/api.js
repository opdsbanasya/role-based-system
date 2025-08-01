import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

export const signupAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/signup`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const loginAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getUsersAPI = async () => {
  const res = await axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const addUserAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/users`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const updateUserAPI = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteUserAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const updateUserRoleAPI = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}/role`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};
