import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/enrollments';

export const getEnrollment = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Remember to change return when BE handle data and sent back
export const postStudentRegister = async (dataStudent) => {
  try {
    const res = await axios.post(API_URL, dataStudent).then((res) => {
      toast.success('Create success', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
    console.log(res.response);
    return true;
  } catch (error) {}
};

// update status of student
export const updateStatus = async (id, status, token) => {
  try {
    await axios
      .put(
        `${API_URL}/${id}`,
        { status },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success('Update success', {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
    return true;
  } catch (error) {
    console.error('Error updating status:', error);
    toast.error('Sorry! Something info not true, please try late');
    throw error;
  }
};
