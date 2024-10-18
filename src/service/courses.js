import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/courses';
const API_URL_MOC = 'https://66bc665424da2de7ff6a5957.mockapi.io/courses';
// 192.168.18.115
const timeoutPromise = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );

export const getCourses = async () => {
  try {
    const response = await Promise.race([
      axios.get(API_URL),
      timeoutPromise(3000),
    ]);
    // console.log('Fetched data from server BE');
    return response.data.content;
  } catch (error) {
    console.warn(
      'Primary API failed or took too long. Falling back to secondary API...'
    );
    try {
      const fallbackResponse = await axios.get(API_URL_MOC);
      console.log('Fetched data from MOC server');
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error('Both APIs failed:', fallbackError);
      throw new Error('Unable to fetch data from any API.');
    }
  }
};

export const getCoursesByCategory = async (id) => {
  try {
    const response = await Promise.race([
      axios.get(`${API_URL}/filter?categoryId=${id}`),
      timeoutPromise(3000),
    ]);
    return response.data.content;
  } catch (error) {
    console.error('Failed to fetch category courses:', error);
    return undefined;
  }
};

export const getCoursesById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course by id from primary API:', error);
    throw error;
  }
};

export const createCourses = async (course, token) => {
  try {
    const response = await Promise.any([
      axios
        .post(`${API_URL}/post_image`, course, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
        }),
      axios.post(API_URL_MOC, course),
    ]);
    return response.data;
  } catch (error) {
    console.error('Error creating course in primary API:', error);
    // throw error;
  }
};

export const updateCoursesImage = async (id, course, token) => {
  try {
    console.log('Cập nhật hình ảnh cho khóa học với ID:', id);
    console.log('Dữ liệu khóa học:', course);

    const responses = await Promise.allSettled([
      axios.put(`${API_URL}/${id}/update_image`, course, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.put(`${API_URL_MOC}/${id}`, course),
    ]);

    responses.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`API ${index + 1} thành công:`, result.value.data);
        toast.info('Cập nhật thành công', {
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        console.error(`API ${index + 1} thất bại:`, result.reason);
      }
    });
  } catch (error) {
    console.error('Lỗi trong quá trình cập nhật khóa học:', error);
    throw error;
  }
};

export const updateCoursesText = async (id, course, token) => {
  try {
    console.log(course);
    console.log(id);
    const response = await Promise.any([
      axios
        .put(`${API_URL}/${id}`, course, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.info('Cập nhật thành công', {
            position: 'top-center',
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }),
      axios.put(`${API_URL_MOC}/${id}`, course),
    ]);
    return response.data;
  } catch (error) {
    console.error('Error updating course in primary API:', error);
    throw error;
  }
};

export const deleteCourses = async (id, token) => {
  try {
    await Promise.any([
      axios
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
        }),
      axios.delete(`${API_URL_MOC}/${id}`),
    ]);
  } catch (error) {
    console.error('Error deleting course from primary API:', error);
    throw error;
  }
};
