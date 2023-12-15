// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../Utils";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    // console.log(state)
    const redux = LocalStorage.get("redux-root");
    const auth = JSON.parse(redux.auth);
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${auth.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for different actions
const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/user/login", data);
};

const registerUser = (data: {
  email: string;
  password: string;
  username: string;
}) => {
  return apiClient.post("/user", data);
};

const logoutUser = () => {
  return apiClient.post("/user/logout");
};


const getAllUsers = (query: string) => {
  return apiClient.get(`api/user?search=${query}`);
};

const getUserById = (id: string) => {
  return apiClient.get(`/user/${id}`);
};

const accesChat = (userId?: any) => {
  return apiClient.post("/chat", { userId });
};

const editProfile = (id:any,data: any) => {
  return apiClient.post(`/user/${id}/update`, data);
};

const getChatMessages = (chatId: string) => {
  return apiClient.get(`/message/${chatId}`);
};

const getChatorGroupDetail = (chatId: string) => {
  return apiClient.get(`/chat/${chatId}`);
};

const sendMessage = (content: string) => {
  // const formData = new FormData();
  // if (content) {
  //   formData.append("content", content);
  // }
  // attachments?.map((file) => {
  //   formData.append("attachments", file);
  // });
  return apiClient.post(`/message`, content);
};

// Export all the API functions
export {
  getChatorGroupDetail,
  registerUser,
  getChatMessages,
  loginUser,
  sendMessage,
  editProfile,
  accesChat,
  getUserById,
  logoutUser,
  getAllUsers
};
