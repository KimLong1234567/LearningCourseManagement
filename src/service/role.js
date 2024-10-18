import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/roles';
// Service để gọi các API liên quan đến Post
export const createRole = async (role, token) => {
  console.log('Role Data Sent to Backend:', role);
  try {
    const response = await axios
      .post(API_URL, role, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success('Create success', {
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
    return response?.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const getAllRole = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.content;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateRole = async (id, post, token) => {
  try {
    console.log(id, post);
    const response = await axios
      .put(`${API_URL}/${id}`, post, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.info('Update success', {
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
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteRole = async (id, token) => {
  try {
    await axios
      .delete(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.error('Delete success', {
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
