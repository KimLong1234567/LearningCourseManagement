import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL =
  'http://192.168.18.115:8080/api/classrooms' ||
  'https://66ac95e0f009b9d5c732a553.mockapi.io/company';

export const getClasses = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data.content;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getClassesById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createClasses = async (post, token) => {
  try {
    const response = await axios
      .post(API_URL, post, {
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
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateClasses = async (id, post, token) => {
  try {
    const response = await axios
      .put(`${API_URL}/${id}`, post, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // toast.info('Update success', {
        //   position: 'top-center',
        //   autoClose: 2000,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'colored',
        // });
      });
    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteClasses = async (id, token) => {
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
