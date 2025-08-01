import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const BASE_URL = "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

export const signupAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/signup`, data);
  return res;
};

export const loginAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    withCredentials: true,
  });
  console.log(res);
  return res;
};

export const getUsersAPI = async () => {
  const res = await axios.get(`${BASE_URL}/user/getlist`, {
    withCredentials: true,
  });
  return res.data;
};

export const addUserAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/user/create`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateUserAPI = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, data, {withCredentials: true})
  return res.data;
};

export const deleteUserAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/user/delete`, { userId: id }, {withCredentials: true});
  return res.data;
};

export const updateUserRoleAPI = async (id, data) => {
  const res = await axios.patch(`${BASE_URL}/user/update`, data, {withCredentials: true})
  return res.data;
};
