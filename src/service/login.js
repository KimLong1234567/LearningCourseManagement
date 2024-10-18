import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/auth/login';
const API_URL_reset = 'http://192.168.1.24:8080/api';

export const login = async (account) => {
  try {
    const response = await axios.post(API_URL, account);
    const data = response.data; // Giả sử đối tượng dữ liệu trả về chứa cả tên và token

    localStorage.setItem('authToken', JSON.stringify(data));

    toast.success('Login success', {
      position: 'top-center',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    return data;
  } catch (error) {
    console.error('Error login:', error);
    toast.error('Login failed', {
      position: 'top-center',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    throw error;
  }
};

export const resetPassword = async (token) => {
  try {
    // console.log(token);
    const response = await axios
      .post(`${API_URL_reset}/password-reset/request`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success('Check-in your email', {
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
    return response;
  } catch (error) {
    console.error('Error reset:', error);
    toast.error('reset failed', {
      position: 'top-center',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    throw error;
  }
};
