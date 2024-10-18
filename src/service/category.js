import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/categories';

const API_URL_MOC = 'https://66c2ee55d057009ee9be61b9.mockapi.io/category';

const timeoutPromise = (ms) => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
};
export const getCategory = async () => {
  try {
    const response = await Promise.race([
      axios.get(API_URL, {}),
      timeoutPromise(3000),
    ]);
    // console.log('Fetch API form sever BE');
    return response.data.content;
  } catch (error) {
    console.warn(
      'Primary API failed or took too long. Falling back to secondary API...'
    );
    try {
      const fallbackResponse = await axios.get(API_URL_MOC);
      console.log('Fetch API form sever MOC');
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error('Both APIs failed:', fallbackError);
      throw fallbackError;
    }
  }
};

export const getCategoryId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filter:', error);
    throw error;
  }
};

export const createCategory = async (post, token) => {
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

export const updateCategory = async (id, post, token) => {
  try {
    // /update_info
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

export const deleteCategory = async (id, token) => {
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
